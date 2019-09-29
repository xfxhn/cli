<template>
    <div>
        我的
        {{aaa}}
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'

    export default {
        name: 'App',
        data() {
            return {
                aaa: ''
            }
        },
        components: {
            HelloWorld
        },
        mounted() {

        }
    }
</script>
<style>

</style>
