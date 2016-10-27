<template>
    <x-button type="primary" :text="btnText" :disabled="isDisabled" @click="click"></x-button>
</template>

<script>
    import XButton from 'vsc/x-button'
    export default {
        data: function() {
            return{
                btnText: 'click me',
                isDisabled: false
            }
        },
        methods: {
            click: function () {
                const _this = this
                this.isDisabled = true
                this.btnText = 'Processing'
                setTimeout(function () {
                    _this.btnText = 'Done'
                }, 2000)
            }
        },
        components: {
            XButton
        }
    }
</script>