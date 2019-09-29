<template>
    <div @click="bindClick" class="hello">
        my

    </div>
</template>

<script>
    export default {
        name: 'hello',
        methods: {
            bindClick() {
                window.location.href='home.html'
            }
        }
    }
</script>

<style scoped>
    .hello {
        color: red;
    }
</style>