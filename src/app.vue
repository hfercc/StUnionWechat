<template>
    <div>
        <group>
            <cell title="vue" value="cool"></cell>
        </group>
        <form-e></form-e>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import FormE from './components/forms/example.vue'

    export default {
        components: {
            Group,
            Cell,
            BottomBar,
            FormE
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
