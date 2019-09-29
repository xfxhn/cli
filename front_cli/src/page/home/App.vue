<template>
    <div class="aaa">

        <button @click="bindPage">跳转</button>
        <hello-world></hello-world>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        components: {
            HelloWorld
        },
        methods:{
            bindPage(){
                window.location.href='my.html'
            }
        },
        mounted() {


        }
    }
</script>
<style scoped>
    .aaa {
        font-size: 60px;
    }
</style>
