<template>
    <div>
        <vote></vote>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import Vote from './components/forms/vote.vue'
    export default {
        components: {
            BottomBar,
            Vote
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
