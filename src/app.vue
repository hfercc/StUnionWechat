<template>
    <div style="height:100%">
        <x-form></x-form>
    </div>
</template>

<script>
    import Group from 'vsc/group'
    import Cell from 'vsc/cell'
    import BottomBar from './components/navbar/BottomBar.vue'
    import XForm from './components/forms/form.vue'
    export default {
        components: {
            XForm
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
