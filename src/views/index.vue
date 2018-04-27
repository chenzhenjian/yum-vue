<style scoped>
    .g-body {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        padding: 85px 20px 20px 260px;
        background: #f3f3f3;
        height: 100%;
    }

    .g-statues-bar {
        background: #fff;
        border-radius: 10px;
        margin-left: 30px;
        margin-bottom: 5px;
    }

    .g-statues-bar .bread {
        line-height: 40px;
    }

    .g-side {
        position: fixed;
        z-index: 90;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 230px;
        height: 100%;
        padding-top: 60px;
        border-right: 1px solid #dedede;
        overflow-y: auto;

    }

    .g-head {
        position: fixed;
        z-index: 91;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #E21019;
    }

    .logo {
        float: left;
        text-align: center;
        width: 310px;
        font-size: 28px;
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }

    .nav {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .usermenu {
        float: right;
        padding: 0 2em;
        color: #fff;
    }

    .usermenu a {
        text-decoration: none;
        margin: 0 0.2em 0 1em;
        color: inherit;
    }

    #main {
        margin: 0 5px;
        padding: 0 25px;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .custom-iconfont {
        font-size: 45px;
        color: white;
        margin-left: 20px;
        font-weight: bold;
    }

    .common-iconfont {
        font-size: 20px;
        font-weight: bold;
        position: relative;
        top: 1px;
        right: 5px;
    }

    .common-font {
        font-size: 20px;
        font-weight: bold;
    }

    .split-rule {
        border: 2px solid white;
        border-radius: 5px;
        display: inline-block;
        height: 25px;
        margin-bottom: -8px;
        margin-left: 10px;
    }

    .arrow {
        left: 5px;
    }

    .user-setting {
        border: 1px solid #fce7e8;
        min-width: 220px;
    }

    .user-name {
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: #cb0e17;
        background: #fce7e8;
        line-height: 44px;
        width: 100%;
        margin-right: 10px;
    }

    .user-common {
        margin-left: 15px;
    }

    .lable-font {
        font-size: 18px;
        margin-left: 10px;
    }

    .date-font {
        font-size: 15px;
        margin-left: 10px;
    }

    .user-role {
        background: #fce7e8;
        font-size: 14px;
        line-height: 25px;
        color: cadetblue;
    }

    .user-date {
        font-size: 14px;
        color: cadetblue;
        line-height: 30px;
        border-bottom: 1px solid #fce7e8;
    }

    .user-edit-pw {
        width: 100%;
        display: inline-block;
        position: relative;
        font-size: 0px;
    }

    .user-edit-pw span {
        border: 1px solid #fce7e8;
    }

    .user-edit-pw .edit {
        display: inline-block;
        width: 50%;
        text-align: center;
        color: #cb0e17;
        font-size: 14px;
        padding: 5px 0 5px 0;;
    }

    .user-edit-pw .edit:hover {
        background: #fce7e8;
    }

    .common-user-info-icon {
        font-size: 40px;
    }

    .usermenu a {
        padding: 5px 10px;
    }

    .usermenu a:hover {
        background: #cb0e17;
        border-radius: 4px;
    }

    .user-edit-rule {
        position: absolute;
        z-index: 1;
        width: 1px;
        background: #fce7e8;
        height: 100%;
        left: 50%;
        top: 0px;
    }

    .g-content {
        width: 100%;
        background: white;
        border-radius: 10px;
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
<style>
    .indexs .el-badge__content {
        border: 0 !important;
        background-color: #E21019 !important;
    }
</style>
<template>
    <div class="g-body">
        <el-row type="flex" class="g-head indexs">
            <i class="iconfont icon-dangwugongkai custom-iconfont"></i>
            <a href="#" target="_blank" title="苏州智慧党建信息平台" class="logo">苏州智慧党建信息平台</a>
            <div class="nav">
                <!-- <div class="usermenu" v-if="user.id"> -->
                <div class="usermenu">
                    <router-link :to="{path: '/'}"><i class="iconfont icon-shouye common-iconfont"></i>首页</router-link>
                    <div class="split-rule"></div>
                    <el-popover
                            ref="popover"
                            placement="top-start"
                            trigger="click">
                        <div class="user-setting">
                            <div class="user-name"><span class="user-common">用户姓名:</span><span class="lable-font">{{userInfo.username}}</span>
                            </div>
                            <div class="user-role"><span class="user-common">角色名称:</span><span class="date-font">{{userInfo.roleName}}</span>
                            </div>
                            <div class="user-date"><span class="user-common">最近登陆:</span><span class="date-font">{{userInfo.lastLoginTime}}</span>
                            </div>
                            <div class="user-edit-pw">
                                <div class="edit" @click="editPassDialogVisible = true"><i
                                        class="iconfont icon-xiugaimima01 common-user-info-icon"></i>
                                    <div>修改密码</div>
                                </div>
                                <div class="edit" @click="logout"><i
                                        class="iconfont icon-tuichu common-user-info-icon"></i>
                                    <div>退出</div>
                                </div>
                                <div class="user-edit-rule" align="center"></div>
                            </div>
                        </div>
                    </el-popover>
                    <a v-popover:popover><i class="iconfont icon-person common-iconfont"></i>欢迎, {{userInfo.name}}<i
                            class="iconfont icon-xiangxiajiantouxiao common-iconfont arrow"></i></a>
                    <div class="split-rule"></div>
                    <el-tooltip placement="top">
                        <div slot="content">您有{{$store.state.unread.unreadNum}}条未读消息</div>
                        <router-link :to="{path: '/unread'}">
                            <i class="el-icon-bell" style="font-size:20px;">
                                <el-badge class="mark" :value="$store.state.unread.unreadNum" :max="99"
                                          v-if="$store.state.unread.unreadNum !== 0"/>
                            </i>
                        </router-link>
                    </el-tooltip>
                    <div class="split-rule"></div>
                    <a href="javascript:;" @click="logout"><i class="iconfont icon-tuichu common-iconfont"></i>退出</a>
                </div>
            </div>
        </el-row>

        <el-menu :default-active="activeMenu" class="g-side" router background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#E21019"
                 unique-opened>
            <div v-for="(route, index) in menus" :key="index" v-if="route.path !='/unread'">
                <template v-if="route.children">
                    <el-submenu :key="index" :index="route.name">
                        <template slot="title">
                            <i v-bind:class="[route.meta.icon]"></i>
                            {{route.meta.name || route.name}}
                        </template>
                        <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name"
                                      :route="cRoute">
                            <i class="icon menuIcon" v-html="cRoute.meta.icon"></i>
                            {{cRoute.meta.name || cRoute.name}}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :route="route" :index="route.name">{{route.meta.name || route.name}}</el-menu-item>
                </template>
            </div>
        </el-menu>

        <div class="g-content">
            <div class="g-statues-bar p-lr">
                <el-breadcrumb separator="\" class="bread" id="mybread">
                    <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
                        {{ item.meta.name || item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <template v-if="$route.path=='/'">
                <dashboard/>
            </template>
            <template v-else>
                <router-view id="main"></router-view>
            </template>
        </div>

        <el-dialog
                title="修改密码"
                :visible.sync="editPassDialogVisible"
                width="30%"
                :before-close="handleEditDialogClose">

            <el-form :model="editPassForm" status-icon :rules="editPassRules" ref="editPassForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="editPassForm.oldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="editPassForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPass">
                    <el-input type="password" v-model="editPassForm.newPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editPassForm')">确 定</el-button>
                    <el-button @click="editPassDialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    import instance from "../api";
    import {mapGetters} from 'vuex';
    import * as currentUser from '../api/currentUser.js';
    import CryptoJS from "crypto-js";
    import * as unread from '../api/unread.js';

    export default {
        components: {
            dashboard: () => import("../components/dashboard.vue")
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.editPassForm.newPass !== '') {
                        this.$refs.editPassForm.validateField('newPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editPassForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: {},
                menus: [],
                visible2: false,
                editPassDialogVisible: false,
                editPassForm: {
                    oldPass: '',
                    pass: '',
                    newPass: ''
                },
                editPassRules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            activeMenu: function () {
                return this.$route.name
            },
            breadcrumbs: function () {
                return (this.$route && this.$route.matched) || []
            },
            ...mapGetters({
                UserInfo: 'UserInfo'
            }),
            userInfo() {
                return this.UserInfo
            }
        },
        methods: {
            logout: function () {
                this.$confirm("确定退出?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "info"
                }).then(() => {
                    this.$emit("logout");
                }).catch(() => {
                });
            },
            handleEditDialogClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            editCurrentUserInfo() {
            },
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {}, words, base64;
                        words = CryptoJS.enc.Utf8.parse(this.editPassForm.oldPass);
                        base64 = CryptoJS.enc.Base64.stringify(words),
                            data.oldPass = base64;

                        words = CryptoJS.enc.Utf8.parse(this.editPassForm.newPass);
                        base64 = CryptoJS.enc.Base64.stringify(words),
                            data.newPass = base64;

                        currentUser.editPass.r(data).then(rse => {
                            if (rse.data.code === 200) {
                                vm.$message({
                                    message: '修改成功',
                                    type: 'warning'
                                });
                                vm.editPassDialogVisible = false;
                            } else {
                                vm.$message({
                                    message: rse.data.message,
                                    type: 'warning'
                                });
                            }
                        });
                    } else {
                        vm.$message({
                            message: '密码错误',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            }
        },
        created: function () {
            let user = this.$parent.userData;
            if (user) {
                this.user = user;
            } else {
                this.$router.push({path: "/login"});
            }
            let menus = this.$parent.menuData;
            if (menus) {
                this.menus = menus;
            }
            this.$store.dispatch('updateUnreadNum')
        }
    };
</script>
