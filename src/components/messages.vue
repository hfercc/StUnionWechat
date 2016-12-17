<template><div style="height:100%">
    <scroller bounce lock-x scrollbar-y use-pullup style="height: 550px; -webkit-user-select: none;
    -webkit-user-drag: none; position: relative; overflow: hidden;" @pullup:loading="loadMore" :pullup-status.sync="pullupStatus">
        <div class="box2">
            <template v-for="i in contents">
                <!--small>{{i.name}}</small-->
                <p class="bubble">{{i.content}}</p>
            </template>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 40px; bottom: -60px; text-align: center;">
            <span v-show="pullupStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'"
                  :class="{'rotate': pullupStatus === 'up'}">↑</span>
            <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
    </scroller>
    <group style="position:fixed;bottom:-2px;width:100%;left:0px;" >
        <x-textarea :max="140" :show-counter="false" rows="2" style="height:20%;max-height:100px;" :value.sync="itext"></x-textarea>
        <x-button type='primary' style="background-color:#1b2333;border-radius:0px;" @click="submit">发送</x-button>
    </group></div>
</template>

<style>
    .bubble {
        background-color: #3cb764;
        padding-left: 10px;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-left:15px;
        width: 90%;
        min-width: 200px;
        color: #fff;
        position: relative;
        border-radius: 2px;
    }
    .bubble:before {
        content: '';
        position: absolute;
        left: -8px;
        top: 12px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #3cb764;
    }
    .rotate {
        transform: rotate(-180deg);
    }
    .pullup-arrow {
        display: inline-block;
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
    }
</style>

<script>
    import axios from 'axios'
    import {GetQueryString,wxconfig} from '../js/utils.js'
    import Scroller  from 'vsc/scroller'
    import Spinner from 'vsc/spinner'
    import Group from 'vsc/group'
    import XTextarea from 'vsc/x-textarea'
    import XButton from 'vsc/x-button'
    export default {
        data() {
            return {
                o_s:'',
                signature:'',
                sid:' ',
                actid:10,
                action:' ',
                config:[],
                errmsg:' ',
                error:' ',
                pullupStatus:'default',
                contents:[],
                itext:' ',
                n:0,
            }
        },
        methods: {
            loadMore (uuid) {
                console.log('detected')
                axios.post('./live.php',{
                    sid:this.sid,
                    actid:this.actid,
                    action:'getoldmsg',
                    signature:this.o_s
                }).then((response)=> {
                    if(response.data) {
                        try {
                            this.contents = this.contents.concat(response.data.data)
                            this.n += 10
                            this.$broadcast('pullup:reset', uuid)
                            this.pullupStatus = 'default'
                            try {
                                this.o_s = response.data.data[9].signature
                            }
                            catch(e) {
                                this.o_s = response.data.data[response.data.data.length-1].signature
                                console.log(e)
                            }
                        }
                        catch(e) {
                            console.log(e)
                        }
                    }
                })
            },
            submit() {
                if(this.itext.match(/^\s*$/)){
                    return
                }
                axios.post('./live.php',{
                    sid:this.sid,
                    actid:this.actid,
                    content:this.itext
                }).then((response)=>{
                    console.log(response)
                    this.itext = ' '
                }).catch((error)=>{
                    console.log(error)
                })
            }
        },
        ready() {
            this.sid = GetQueryString('sid')
            this.actid = GetQueryString('actid')
            axios.post('./live.php',{
                sid:this.sid,
                actid:this.actid,
                signature:this.signature,
                action:'refresh'
            }).then((response)=>{
                console.log(response.data)
                wxconfig(response.data)
                if(response.data.error) {
                    console.log('error')
                }
                else {
                    this.contents = this.contents.concat(response.data.data)
                    try {
                        this.signature = this.contents[0].signature
                        this.o_s = this.signature
                        console.log(this.contents)
                        console.log(this.signature)
                    }
                    catch(e) {
                        console.log(e)

                    }
                    this.$broadcast('pullup:reset')
                }
            })
            setInterval(()=>{axios.post('./live.php',{
                sid:this.sid,
                actid:this.actid,
                signature:this.signature,
                action:'refresh'
            }).then((response)=>{
                wxconfig(response.data)
                if(response.data.error) {
                    console.log('error')
                }
                else if (response.data.data.length > 0 ){
                    this.contents = this.contents.reverse().concat(response.data.data).reverse()
                    try {
                        this.signature = this.contents[0].signature
                        console.log(this.contents)
                        console.log(this.signature)
                    }
                    catch(e) {
                        console.log(e)

                    }
                    this.$broadcast('pullup:reset')
                }
            })},3000)
        },
        components: {
            Scroller,Spinner,XTextarea,XButton,Group
        }
    }
</script>