<style>
    @import './assets/style/common.css';
    @import './assets/style/iconfont.css';
</style>

App.vue
<template>
    <router-view id="app" @login="loginDirect" @logout="logoutDirect"/>
</template>

<script>
    import Vue from 'vue';
    import instance from './api';
    import userPath from './router/fullpath';
    import * as util from './assets/util.js';
    import {mapGetters, mapMutations} from 'vuex';
    import * as currentUser from './api/currentUser.js';

    // Request Intercept Handle
    let myInterceptor;

    export default {
        data() {
            return {
                menuData: null,
                userData: null
            }
        },

        computed: {
            ...mapGetters([
                'UserInfo'
            ]),
            userInfo() {
                return this.UserInfo
            }
        },

        methods: {
            ...mapMutations([
                'SET_USER_INFO',
                'USER_LOGOUT'
            ]),
            getPermission: function (permission) {
                let resourcePermission = {};
                if (Array.isArray(permission.action)) {
                    permission.action.forEach(function (e, i) {
                        let key = e.method.toLowerCase() + ',' + e.linkUrl;
                        resourcePermission[key] = true;
                    });
                }
                return resourcePermission;
            },
            setInterceptor: function (resourcePermission) {
                let vm = this;
                myInterceptor = instance.interceptors.request.use(function (config) {
                    // Get request URL
                    let perName = config.url.replace(config.baseURL, '').replace('/GET', '').replace('/POST', '').split('?')[0];

                    let reg = perName.match(/^\/common\/.*/);
                    if (reg) {
                        return config;
                    }
                    let reg1 = perName.match(/^\/[^\/]+\/[^\/]+\/([^\/]+)\/[^\/]+\/$/);
                    if (reg1) {
                        perName = perName.replace(reg1[1], '**');
                    }
                    let reg2 = perName.match(/^(\/[^\/]+){2,3}\/([^\/]+)$/);
                    if (reg2) {
                        perName = perName.replace(reg2[2], "**");
                    }

                    // Check Permission
                    if (!resourcePermission[config.method + ',' + perName]) {
                        vm.$message({
                            message: '无访问权限，请联系企业管理员' + perName,
                            type: 'warning'
                        });
                        return Promise.reject({
                            message: 'No permission'
                        });
                    }
                    return config;
                });
            },
            getRoutes: function (permission) {
                if (!permission.menu) {
                    return console.warn(permission);
                }
                let vm = this;
                let allowedRouter = [];

                // Replace menu data to multi array
                let arrayMenus = util.buildMenu(permission.menu);
                // Replace multi array to object
                let hashMenus = {};
                let setMenu2Hash = function (array, base) {
                    array.map(key => {
                        if (key.linkUrl) {
                            let hashKey = ((base ? base + '/' : '') + key.linkUrl).replace(/^\//, '');
                            hashMenus['/' + hashKey] = true;
                            if (Array.isArray(key.children)) {
                                setMenu2Hash(key.children, hashKey);
                            }
                        }
                    });
                };
                setMenu2Hash(arrayMenus);
                // Mount global Hashmenus for routing guards
                this.$root.hashMenus = hashMenus;
                // Filtering Local routes
                let findLocalRoute = function (array, base) {
                    let replyResult = [];
                    array.forEach(function (route) {
                        let pathKey = (base ? base + '/' : '') + route.path;
                        if (hashMenus[pathKey]) {
                            if (Array.isArray(route.children)) {
                                route.children = findLocalRoute(route.children, pathKey);
                            }
                            replyResult.push(route);
                        }
                    });
                    if (base) {
                        return replyResult;
                    } else {
                        allowedRouter = allowedRouter.concat(replyResult);
                    }
                };
                let originPath = util.deepcopy(userPath[0].children);
                findLocalRoute(originPath);
                return allowedRouter;
            },
            extendRoutes: function (allowedRouter) {
                let vm = this;
                let actualRouter = util.deepcopy(allowedRouter);
                actualRouter.map(e => {
                    // Copy submenu information to meta for navigation-related effects, not required
                    if (e.children) {
                        if (!e.meta) e.meta = {};
                        e.meta.children = e.children;
                    }
                    // Add exclusive guards for dynamic routing
                    return e.beforeEnter = function (to, from, next) {
                        if (vm.$root.hashMenus[to.path]) {
                            next()
                        } else {
                            next('/401')
                        }
                    }
                });
                let originPath = util.deepcopy(userPath);
                originPath[0].children = actualRouter;
                // Injecte route
                vm.$router.addRoutes(originPath.concat([{
                    path: '*',
                    redirect: '/404'
                }]));
            },
            getHome: function (callback) {
                let vm = this;
                // // Check login status
                let token = util.session('token'),
                    userId = util.session('userId');
                if (!token) {
                    vm.$router.push({path: '/login', query: {from: vm.$router.currentRoute.path}});
                    return;
                }
                instance.defaults.headers = {
                    userId: userId,
                    token: token
                };
                // Get user information and permission data
                currentUser.getUserPermisson.r().then((res) => {

                    currentUser.getUserInfo.r().then((rse) => {
                        if (rse.data) {
                            vm.SET_USER_INFO(rse.data.data)
                        }
                    });

                    let permission = res.data.data;
                    // Get Resource Permission Object
                    let resourcePermission = vm.getPermission(permission);
                    // Using Resource permission to set Request interception
                    // vm.setInterceptor(resourcePermission);
                    // Get the actual route
                    let allowedRouter = vm.getRoutes(permission);
                    // If no routing restrictions are available
                    if (!allowedRouter || !allowedRouter.length) {
                        util.session('token', '');
                        return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>');
                    }
                    // Dynamic Injection Routing
                    vm.extendRoutes(allowedRouter);
                    // Save data, not required
                    vm.menuData = allowedRouter;
                    vm.userData = permission;
                    Vue.prototype.$_has = function (rArray) {
                        let resources = [];
                        let permission = true;
                        // Extract permission Array
                        if (Array.isArray(rArray)) {
                            rArray.forEach(function (e) {
                                resources = resources.concat(e.p);
                            });
                        } else {
                            resources = resources.concat(rArray.p);
                        }
                        // Verify Permissions
                        resources.forEach(function (p) {
                            if (!resourcePermission[p]) {
                                return permission = false;
                            }
                        });
                        return permission;
                    };
                    typeof callback === 'function' && callback();
                });
            },
            loginDirect: function (newPath) {
                let cookie = util.getCookie('token');
                this.getHome(() => {
                    this.$router.replace({path: newPath || '/'});
                });
            },
            logoutDirect: function () {
                let vm = this;
                instance.interceptors.request.eject(myInterceptor);
                currentUser.logout.r().then((rse) => {
                    if (rse.data) {
                        vm.USER_LOGOUT();
                        this.$root.hashMenus = {};
                        this.$router.replace({path: '/login'});
                    }
                })
            }
        },
        created: function (newPath) {
            this.getHome();
            Date.prototype.format = function (format) {
                const args = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(format))
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (const i in args) {
                    const n = args[i];
                    if (new RegExp("(" + i + ")").test(format))
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length));
                }
                return format;
            };
        }
    }
</script>