<template>
    <div style="height:100%">
        <messages></messages>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import Messages from './components/messages.vue'
    export default {
        components: {
            Messages
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
