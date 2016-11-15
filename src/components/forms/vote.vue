<template>
    <p v-if='check' style="text-align: center;font-size:1.2em;">{{config.vote.name}}</p>
    <p v-if='check' style="border-top: 1px solid #dddddd;padding: 30px 0px 0px 10px;margin-left: 8px;margin-right: 8px;
text-align: left;font-size: 0.9em;color: #333333;">投票说明:{{config.vote.info}}</p>
    <divider style='margin-left:8px;margin-right:8px;' v-if="check"> 最多可选{{config.vote.mutichoice}}人 </divider>
    <checker style="width:100%;text-align: center" :max='config.vote.mutichoice' :value.sync="selected" type="checkbox"
             default-item-class="item-default"
             selected-item-class="item-selected" disabled-item-class="item-disabled">
        <template v-for="i in config.vote.candidate">
            <checker-item :value="i.id">
                <img v-bind:src="i.picture" style="float:left;width:80px;">
                <countup v-if="has_voted" :end-val="result[i.id-1].result" :duration="3" class="c1"></countup>
                <div style="float:left;">
                <p style="text-align: left;margin:5px 10px; padding-top: 20px">选手姓名:{{i.name}}</p>
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
    .item-disabled {
        background-color: #eeeeee;
    }
    .c1 {
        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        display:block;
        float:right;
        font-size:35px;
        margin-top:30px;
        color: #007a53;
    }
</style>

<script>
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
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    export default {
        data()  {
          return {
              selected:[],
              isDisabled:false,
              config:null,
              uid: GetQueryString('uid'),
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
                    uid:_this.uid,
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
                    else if (_this.config.vote.showresult) {
                        _this.btnText = '已投票'
                        _this.has_voted = true
                        _this.result = response.data
                        console.log(response.data)
                    }})
            }
        },
        ready: function() {
            const _this = this
            console.log(this.uid)
            console.log(this.vid)
            axios.post('vote.php', {
                uid:_this.uid,
                vid:_this.vid,
                from:_this.from
            }).then(function(response) {
                if(response.data.vote) response.data.vote.candidate.shuffle();
                _this.config = response.data
                console.log(_this.config)
                wx.config({
                    debug:false,
                    appId: response.data.config.appId,
                    timestamp: response.data.config.timestamp,
                    nonceStr:response.data.config.nonceStr,
                    signature: response.data.config.signature,
                    jsApiList:["hideMenuItems"]
                });
                wx.ready(function () {
                    wx.hideMenuItems({
                            menuList:["menuItem:share:weiboApp","menuItem:copyUrl","menuItem:share:email"]
                    });
                })
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