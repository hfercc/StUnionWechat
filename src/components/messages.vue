<template><div style="height:100%">
    <!--scroller lock-x scrollbar-y use-pullup height="200px"
              :pullup-config="{content:'下拉刷新',upContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"
              @pullup:loading="loadMore">
        <div class="box">
            <p v-for="i in n">{{i}}</p>
        </div>
        <div slot="pullup" style="position:absolute; width:100%;height:40px;line-height:60px;
        top:-60px;text-align: center">
            <span v-show="pullupStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="pullupStatus === 'up' || pullupStatus === 'up'"
                  :class="{'rotate': pullupStatus === 'up'}">↓</span>
            <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
    </scroller-->
    <!--scroller lock-x scrollbar-y use-pullup style="position:relative;height:93%;" @pullup:loading="loadMore"
                :pullup-status.sync="pullupStatus">
        <div class="box2">
            <p class="bubble" v-for="i in results">{{i.content}}</p>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 40px; top: 300px; text-align: center;">
            <span v-show="pullupStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'"
                  :class="{'rotate': pullupStatus === 'up'}">↑</span>
            <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
    </scroller-->
    <scroller bounce lock-x scrollbar-y use-pullup style="height: 500px; -webkit-user-select: none;
    -webkit-user-drag: none; position: relative; overflow: hidden;" @pullup:loading="loadMore" :pullup-status.sync="pullupStatus">
        <div class="box2">
            <p class='bubble' v-for="i in results">{{i.content}}</p>
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
    import {GetQueryString} from '../js/utils.js'
    import Scroller  from 'vsc/scroller'
    import Spinner from 'vsc/spinner'
    import Group from 'vsc/group'
    import XTextarea from 'vsc/x-textarea'
    import XButton from 'vsc/x-button'
    export default {
        data() {
            return {
                signature:' ',
                uid:' ',
                sid:' ',
                actid:' ',
                config:' ',
                errmsg:' ',
                error:' ',
                pullupStatus:'default',
                results:[],
                contents:[],
                itext:' ',
            }
        },
        methods: {
            loadMore (uuid) {
                console.log(this.results)
                setTimeout(() => {
                    this.$broadcast('pullup:reset',uuid)
                    this.pullupStatus = 'default'
                }, 1000)
            },
            submit() {
                console.log(this.itext)
                this.contents.push({"uid":1,"actid":1,"content":this.itext,"signature":'sdf'})
                this.results = this.contents.reverse()
                this.contents.reverse()
                this.itext=' '
                this.$broadcast('pullup:reset')
            }
        },
        ready() {
            this.sid = GetQueryString('sid')
            this.actid = GetQueryString('actid')

        },
        components: {
            Scroller,Spinner,XTextarea,XButton,Group
        }
    }
</script>