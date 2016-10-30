<template>
    <div>
        <p style="padding:15px">
            <span>距离初赛还有</span>
            <clocker time="2016-11-11"></clocker>
        </p>
        <form-e></form-e>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import FormE from './components/forms/example.vue'
    import Clocker from 'vsc/clocker'
    export default {
        components: {
            BottomBar,
            FormE,
            Clocker
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
