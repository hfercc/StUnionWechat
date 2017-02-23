<template>
    <group>
        <cell :title='name' :value="description"></cell>
        <div v-for="item in units" style="border-top:1px solid #ccc">
            <div v-if="item.type=='text'">
                <x-input :max="item.max" :title="item.title"
                         :value.sync="values[$index].value"></x-input>
            </div>
            <div v-if="item.type=='checkbox'">
                <checklist :options="checkbox" :value.sync="c_r" :required="false"></checklist>
            </div>
            <div v-if="item.type=='radio'">
                <radio :options="item.option" :value.sync="values[$index].value"></radio>
            </div>
            <div v-if="item.type=='select'">
                <selector :title='item.title' :options="item.option" :value.sync="values[$index].value"></selector>
            </div>
            <div v-if="item.type=='date'">
                <datetime :title='item.title' :value.sync="values[$index].value"></datetime>
            </div>
            <div v-if="item.type=='textarea'">
                <x-textarea :placeholder="item.title" :value.sync="values[$index].value"></x-textarea>
            </div>
        </div>
        <x-button :text='button_text' type="primary" @click.prevent="click"></x-button>
        <alert :show.sync="has_error" title="提示" button-text="返回">
            <p style="text-align: center;">{{{error_message}}}</p>
        </alert>
    </group>
    <div></div>
</template>

<script>
    import {GetQueryString,wxconfig} from '../../js/utils.js'
    import axios from 'axios'
    import XButton from 'vsc/x-button'
    import Selector from 'vsc/selector'
    import {Checker,CheckerItem} from 'vsc/checker'
    import Checklist from 'vsc/checklist'
    import Radio from 'vsc/radio'
    import XInput from 'vsc/x-input'
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import XTextarea from 'vsc/x-textarea'
    import Datetime from 'vsc/datetime'
    import InlineCalendar from 'vsc/inline-calendar'
    import Alert from 'vsc/alert'
    import _ from 'lodash'
    console.log('hello')
    export default {
        data() {
            return {
                sid:'',
                actid:0,
                name:'',
                description:'',
                units:[],
                f:"",
                values:[],
                results:{},
                i:0,
                j:0,
                button_text:'提交',
                checkbox:[],
                c_r:[],
                is_checkbox:1,
                has_error:false,
                error_message:''
            }
        },
        created: function() {
            const _this = this
            this.sid = GetQueryString('sid')
            this.actid = GetQueryString('actid')
            axios.post('form.php',{
                sid:_this.sid,
                actid:_this.actid
            }).then((response)=>{
                console.log(response)
                _this.name  = response.data.name
                _this.description = response.data.description
                _this.units = response.data.structure
                _.forEach(response.data.structure,(n)=>{
                    if(n.type=='text') {
                        _this.values.push({name:n.name,value:''})
                    }
                    else if (n.type=='checkbox') {
                        _this.checkbox.push({key:n.name,value:n.value})
                        if(_this.is_checkbox)
                            _this.values.push({name:n.name,value:''})
                        _this.is_checkbox = 0;
                    }
                    else if (n.type=='select') {
                        _this.values.push({name:n.name,value:''})
                    }
                    else if (n.type=='date') {
                        _this.values.push({name:n.name,value:''})
                    }
                    else if (n.type=='textarea') {
                        _this.values.push({name:n.name,value:''})
                    }
                    else if (n.type=='radio') {
                        _this.values.push({name:n.name,value:''})
                    }
                })
            })
        },
        methods:{
            click() {
                const _this = this
                console.log(this.values)
                _.forEach(this.values,(n)=>{
                    console.log(n)
                    _this.results[n.name]=n.value
                })
                _.forEach(this.c_r,(n)=>{
                    _this.results[n] = _.result(_.find(this.checkbox,{'key':n}),'value')
                })
                console.log(this.results)
                axios.post('form.php?submit=yes',{
                    sid:_this.sid,
                    actid:_this.actid,
                    form:_this.results}).then((response)=>{
                        console.log(response)
                        if(response.data.error) {
                            _this.error_message = response.data.msg
                            _this.has_error = true
                        }
                        else {
                            _this.error_message = '您已成功提交'
                            _this.has_error = true
                        }
                })
            },
        }
        ,
        components:{
            Alert,XButton,Selector,Checklist,CheckerItem,Checker,XInput,Group,Cell,Radio,XTextarea,Datetime,
        }
    }
</script>
<style>
    .c1 {
        border:1px solid #cccccc;
        padding:3px 15px 3px 15px;
    }
    .c2 {
        border:1px solid #3cb764;
    }
    .vux-tap-active:active {
        background-color: #FFFFFF!important;
    }
    .c2::after {
        position:absolute;
        top:-3px;
        right:0px;
        content:url('./data/pic/static/s.jpg')
    }
</style>