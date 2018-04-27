<style scoped>
</style>

<template>
    <div>
        <template v-if="$route.path==='/sys/user'">
            <list></list>
        </template>
        <template v-else>
            <router-view/>
        </template>
    </div>
</template>

<script>

    export default {
        components: {
            list: () => import("./list.vue")
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>