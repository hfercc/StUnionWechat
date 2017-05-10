<template>
    <p v-if='check' style="text-align: center;font-size:1.2em;">{{result.name}}</p>
    <p v-if='check' style="border-top: 1px solid #dddddd;padding: 30px 0px 0px 10px;margin-left: 8px;margin-right: 8px;
text-align: left;font-size: 0.9em;color: #333333;">投票说明:{{{result.info}}}</p>
    <divider style='margin-left:8px;margin-right:8px;' v-if="check"> 最多可选{{result.mutichoice}}人 </divider>
    <checker style="width:100%;text-align: center" :max='result.mutichoice' :value.sync="selected" type="checkbox"
             default-item-class="item-default"
             selected-item-class="item-selected" disabled-item-class="item-disabled">
        <template v-for="i in result.candidate">
            <checker-item :value="i.id" style="position: relative;">
                <img v-bind:src="i.picture" style="float:left;width:80px;">
                <countup v-if="has_voted" :end-val="result.result[i.id-1].result" :duration="3" class="c1"></countup>
                <div style="float:left;" class="inside-checker">
                <p style="text-align: left;margin:5px 10px; padding-top: 14px">姓名:{{i.name}}</p>
                <p style="text-align: left;margin:5px 10px;">{{i.info}} </p></div>
            </checker-item>
        </template>
    </checker>
    <divider v-if="check">中国科大学生会</divider>
    <div style="margin:auto;padding:0;position:fixed;z-index:999;bottom:-2px;left:0px;right:0px;">
        <x-button v-if='check' type="primary" style="opacity:80%;background-color: #3cb764;border-radius: 0px;"
                  :text="btnText" :disabled="isDisabled" @click="click"></x-button>
    </div>
    <alert :show.sync="has_error" title="错误" button-text="返回">
        <p style="text-align: center;">{{errormsg}}</p>
    </alert>
    <div id="open" style="text-align: center"></div>
</template>

<style>

    .item-default {
        width:90%;
        margin-left:auto;
        margin-right:auto;
        padding: 10px 15px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        font-size:0.87em;
    }
    .item-selected {
        background-color: #f7fff7;
        border: 1px solid #3cb764;
    }
    .item-selected .inside-checker::after {
        position:absolute;
        top:0px;
        right:0px;
        content:url('./data/pic/static/s.jpg')
    }
    .item-disabled {
        background-color: #eeeeee;
    }
    .c1 {
        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        display:block;
        float:right;
        font-size:25px;
        margin-top:25px;
        color: #007a53;
        border:0px;
    }
</style>

<script>
    import {GetQueryString,wxconfig} from '../../js/utils.js'
    import axios from 'axios'
    import XButton from 'vsc/x-button'
    import Card from 'vsc/card'
    import {Checker,CheckerItem} from 'vsc/checker'
    import Divider from 'vsc/divider'
    import Countup from 'vsc/countup'
    import Alert from 'vsc/alert'
    import Icon from 'vsc/icon'
    import { Tabbar,TabbarItem } from 'vsc/tabbar'
    Array.prototype.shuffle = function() {
        var input = this;
        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    export default {
        data()  {
          return {
              selected:[],
              isDisabled:false,
              config:null,
              sid: GetQueryString('sid'),
              vid: GetQueryString('vid'),
              from: GetQueryString('from'),
              check:true,
              has_error:false,
              result:[],
              btnText:'投票!',
              errormsg:'',
              has_voted:false,
          }
        },
        components: {
            Divider,
            Card,
            Checker,
            CheckerItem,
            Countup,
            XButton,
            Alert,
            Icon,
            Tabbar,
            TabbarItem
        },
        methods: {
            click: function() {
                const _this=this
                _this.isDisabled = true
                _this.btnText = '提交中'

                console.log(this.selected)
                axios.post('vote.php?submit=yes',{
                    sid:_this.sid,
                    vid:_this.vid,
                    id:_this.selected
                }).then(function(response) {
                    _this.selected = []
                    if(response.data.error) {
                        _this.has_error = true
                        _this.errormsg = response.data.msg
                        _this.isDisabled = false
                        _this.btnText = '投票！'
                    }
                    else if (_this.vote.showresult) {
                        _this.btnText = '已投票'
                        _this.has_voted = true
                        _this.result = response.data
                        console.log(response.data)
                    }})
            }
        },
        ready: function() {
            const _this = this
            axios.get('./get_config.php').then((response)=>{
                try {
                    wxconfig(response.data)
                }
                catch(e) {
                    console.log('get config error!')
                }
            })
            axios.post('vote.php', {
                vid:_this.vid,
                sid:_this.sid,
                from:_this.from
            }).then(function(response) {
                if (response.data.vote) {
                    response.data.vote.candidate.shuffle();
                    if (response.data.vote.result) {
                        _this.isDisabled = true;
                        _this.btnText = '您已投票!';
                        _this.result = response.data.vote;
                        _this.has_voted = true;
                    }
                }
                console.log(_this.result)

                if(response.data.error) {
                    _this.check=false;
                    if(response.data.error != 3) {
                        _this.has_error = true;
                        _this.errormsg = response.data.msg
                    }
                    else {
                        document.getElementById('open').innerHTML = "<h3>扫描二维码，关注中国科大学生会(USTC_stunion)" +
                                "微信公众号进行投票<br></h3><img style='max-width:50%' src='data/pic/static/getqrcode.jpg'><br><br>" +
                                "<p style='font-size:0.75em'>进入公众号回复\"投票\"或者点击\"校园活动\"按钮即可进入投票页面</p>"
                    }
                }
            })
        }
    }
</script>