<style scoped>
    .system-module {
        background: #E21019;
        text-align: center;
    }

    .route-link {
        text-decoration: none;
        color: white;
    }
</style>
<style>
    .abstract .abstract-row {
        display: block !important;
    }
</style>

<template>
    <div class="abstract">
        <el-row :gutter="20" v-if="children" class="abstract-row">
            <el-col :span="6" v-for="(route, index) in children" :key="index">
                <el-card class="system-module">
                    <router-link :to="{name: route.name}" class="route-link">{{route.name}}</router-link>
                </el-card>
            </el-col>
        </el-row>
        <router-view/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                children: null
            };
        },
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                let children = vm.$route.meta.children;
                if (children) {
                    vm.children = children;
                } else {
                    vm.children = null;
                }
            });
        },
        watch: {
            '$route': function (to, from) {
                let children = this.$route.meta.children;
                if (children) {
                    this.children = children;
                } else {
                    this.children = null;
                }
            }
        }
    };
</script>