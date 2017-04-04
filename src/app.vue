<template>
    <div style="height:100%">
        <Vote></Vote>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import Vote from './components/forms/vote.vue'
    import XForm from './components/forms/form.vue'
    import Messages from './components/messages.vue'
    export default {
        components: {
            Vote
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
