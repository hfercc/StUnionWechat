<template>
    <!--scroller lock-x scrollbar-y use-pulldown height="200px"
              :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"
              @pulldown:loading="loadMore">
        <div class="box">
            <p v-for="i in n">{{i}}</p>
        </div>
        <div slot="pulldown" style="position:absolute; width:100%;height:40px;line-height:60px;
        top:-60px;text-align: center">
            <span v-show="pulldownStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'"
                  :class="{'rotate': pulldownStatus === 'up'}">↓</span>
            <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
    </scroller-->
    <scroller bounce lock-x scrollbar-y use-pulldown height="80%" @pulldown:loading="loadMore"
              :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"
                :pulldown-status.sync="pulldownStatus">
        <div class="box2">
            <p class="bubble" v-for="i in n">placeholder {{n-i}}</p>
        </div>
        <div slot="pulldown" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position:absolute; width:100%;height:40px;line-height:40px;
        top:-50px;text-align: center">
            <span v-show="pulldownStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'"
                  :class="{'rotate': pulldownStatus === 'up'}">↓</span>
            <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
    </scroller>
</template>

<style>
    .bubble {
        background-color: #3cb764;
        padding-left: 10px;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-left: 30px;
        width: 90%;
        min-width: 200px;
        color: #fff;
        position: relative;
        border-radius: 2px;
    }
    .bubble:before {
        content: '';
        position: absolute;
        left: -10px;
        top: 10px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #3cb764;
    }
    .rotate {
        transform: rotate(-180deg);
    }
    .pulldown-arrow {
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
                pulldownStatus:'default',
                n:10,
            }
        },
        methods: {
            loadMore (uuid) {
                setTimeout(() => {
                    console.log(this.n)
                    this.n += 10
                    this.$nextTick(() => {
                        this.$broadcast('pulldown:reset', uuid)
                    })
                }, 10)
            },
        },
        ready() {
            this.sid = GetQueryString('sid')
            this.actid = GetQueryString('actid')

        },
        components: {
            Scroller,Spinner
        }
    }
</script>