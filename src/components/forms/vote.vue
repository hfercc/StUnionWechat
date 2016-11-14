<template>
    <checker :value.sync="selected" type="checkbox" default-item-class="item-default"
             selected-item-class="item-selected" disabled-item-class="item-disabled">
        <checker-item :value="1">
            <img src="http://placeholder.qiniudn.com/300x300/000000/ffffff">
            <p style="text-align: center;margin:5px 0px;border-top:1px solid #cccccc; padding-top: 10px">参赛选手1</p>
            <p style="text-align: center;margin:5px 0px;">
                演唱曲目 < 1 > </p>
        </checker-item>
        <checker-item :value="2" disabled>
            <img src="http://placeholder.qiniudn.com/300x300/000000/ffffff">
            <p style="text-align: center;margin:5px 0px;border-top:1px solid #cccccc; padding-top: 10px">参赛选手2</p>
            <p style="text-align: center;margin:5px 0px;">演唱曲目 < 2 > </p>
            <progress :percent="10" :show-cancel="false" style="margin-top:10px "></progress>
            <p style="margin:5px 0px;color: #aaaaaa;">1000 (10%)</p>
        </checker-item>
    </checker>
</template>

<style>
    .item-default {
        border-radius: 3px;
        display: block;
        padding: 10px 15px 10px 15px;
        border: 1px solid #cccccc;
    }
    .item-selected {
        display: block;
        background-color: #4ebe78;
        color: white;
        padding: 10px 15px 10px 15px;
        border: 1px solid #4ebe78;
    }
    .item-disabled {
        border: 1px dashed #000000;
    }
</style>
<script>
    import Card from 'vsc/card'
    import {Checker,CheckerItem} from 'vsc/checker'
    import Divider from 'vsc/divider'
    import Progress from 'vsc/progress'
    export default {
        data()  {
          return {
              selected:[],
          }
        },
        components: {
            Divider,
            Card,
            Checker,
            CheckerItem,
            Progress
        }
    }
</script>