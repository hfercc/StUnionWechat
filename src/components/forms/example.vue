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
        data: function() {
            return{
                btnText: '报名！',
                isDisabled: false,
                schoollist:[{key: '203',value:'203 物理学院'},{key: '201',value:'201 数学学院'}],
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
                    'https://service.piggest.com/wechat/sign.php', {
                            name: _this.name,
                            stunum: _this.stunum,
                            school: _this.school,
                            phone: _this.pn,
                            email: _this.email,
                        }).then(function(data) {
                    console.log(data);
                    _this.isDisabled = false

                }).catch(function(error) {
                    console.log(error);
                })
            }
        },
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