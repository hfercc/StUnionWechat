<template>
    <group title="报名信息">
        <x-input title="姓名" placeholder="请输入姓名" :value.sync="name" v-ref:vname :show-clear=true></x-input>
        <x-input title="学号" placeholder="请输入学号" :value.sync="stunum" v-ref:vstunum :show-clear=true></x-input>
        <selector title="所在学院" placeholder="请选择学院" :options="schoollist" :value.sync="school"></selector>
        <x-input title="手机号" placeholder="请输入手机号" :value.sync="pn" is-type="china-mobile" v-ref:vpn :show-clear=true></x-input>
        <x-input title="邮箱" placeholder="请输入邮箱地址" :value.sync="email" is-type="email" v-ref:vemail :show-clear=true></x-input>
    </group>
    <x-button type="primary" :text="btnText" :disabled="isDisabled" @click="click"></x-button>
    <alert :show.sync="has_error" title="错误" button-text="返回检查">
        <p style="text-align: center;">{{error_message}}</p>
    </alert>
</template>

<script>
    import XButton from 'vsc/x-button'
    import XInput from 'vsc/x-input'
    import Group from 'vsc/group'
    import Selector from 'vsc/selector'
    import Alert from 'vsc/alert'
    import axios from 'axios'
    import {GetQueryString} from '../../js/utils.js'
    export default {
        data: function() {
            return{
                btnText: '报名！',
                isDisabled: false,
                schoollist:[{key: '000',value:'000 少年班学院'},{key: '001',value:'201 数学科学学院'},{key:'203',value:'203 物理学院' +
                ''},{key:'204',value:'204 管理学院'},{key:'206',value:'206 化学学院'},{key:'207',value:'207 生命科学学院'}, {
                    key:'208',value:'208 地球和空间科学学院'},{key:'209',value:'209 工程科学学院'},{key:'210',value:'210 信息科学技术学院'},{
                    key:'211',value:'211 人文与社会科学学院'},{key:'214',value:'214 核科学技术学院'},{key:'215',value:'215 计算机科学与技术学院'},
                    {key:'216',value:'216 公共事务学院'},{key:'217',value:'217 环境科学与光电技术学院'}],
                name:'',
                stunum:'',
                school:'',
                pn:'',
                email:'',
                has_error:false,
                error_message:'',
                uid: GetQueryString('uid')
            }
        },
        methods: {
            click: function () {
                const _this = this
                if(!this.$refs.vname.valid) {
                    this.error_message='姓名不能为空!'
                    this.has_error=true
                    return
                }
                if(!this.$refs.vstunum.valid) {
                    this.error_message='学号不能为空!'
                    this.has_error=true
                    return
                }
                if(this.school=='') {
                    this.error_message='学院不能为空!'
                    this.has_error=true
                    return
                }
                if(!this.$refs.vpn.valid) {
                    this.error_message='电话号码错误!'
                    this.has_error=true
                    return
                }
                if(!this.$refs.vemail.valid) {
                    this.error_message='电子邮件错误!'
                    this.has_error=true
                    return
                }
                this.isDisabled = true
                this.btnText = '提交中'
                axios.post(
                    'wechat/sign.php', {
                            name: _this.name,
                            stunum: _this.stunum,
                            school: _this.school,
                            phone: _this.pn,
                            email: _this.email,
                            uid: _this.uid,
                        }).then(function(data) {
                    if(data.data.error == 1) {
                        _this.error_message='姓名格式错误!'
                        _this.has_error=true
                    }
                    if(data.data.error == 2) {
                        _this.error_message='学号格式错误!'
                        _this.has_error=true
                    }
                    if(data.data.error == 3) {
                        _this.error_message='学院格式错误!'
                        _this.has_error=true
                    }
                    if(data.data.error == 4) {
                        _this.error_message='学号格式错误!'
                        _this.has_error=true
                    }
                    if(data.data.error == 5) {
                        _this.error_message='邮箱格式错误!'
                        _this.has_error=true
                    }
                    if(data.data.error == 6) {
                        _this.error_message='您已报名!'
                        _this.has_error=true
                    }
                    if(data.data.error == 0) {
                        _this.error_message='您已成功报名!'
                        _this.has_error=true
                    }
                    _this.isDisabled = false

            })
        }},
        components: {
            XButton,
            XInput,
            Group,
            Selector,
            Alert
        }
    }
</script>
<style scope>
    .error {
        border: 1px solid #AA0000;
        color:#AA0000;
    }
</style>