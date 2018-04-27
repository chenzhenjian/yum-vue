<style scoped>
    #app {
        display: table;
        width: 100%;
    }

    .main-title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
        color: #E21019;
    }

    .des {
        text-align: center;
        color: #999;
        margin-bottom: 2em;
    }

    .login-form {
        width: 400px;
        margin: 13% auto 0;
    }

    .login-page {
        background: #fff;
    }

    .check-code {
        width: 58%;
    }

    .el-form-item__error {
        left: 15%;
    }

    .login-button {
        font-size: 18px;
        font-weight: bold;
    }

    .check-code-img {
        float: right;
        width: 40%;
        height: 38px;
        box-shadow: 0px 1px 20px;
    }

</style>

<template>
    <div>
        <div class="g-center login-page" @keyup.enter="login">
            <el-form class="login-form" :rules="rules" :model="loginFormData" ref="loginForm">
                <h1 class="main-title">用户登陆</h1>
                <!-- <p class="des">党建</p> -->
                <el-form-item prop="username">
                    <el-input
                            :autofocus="true"
                            placeholder="账号"
                            v-model="loginFormData.username">
                        <template slot="prepend"><i class="iconfont icon-person"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            placeholder="密码"
                            type="password"
                            v-model="loginFormData.password">
                        <template slot="prepend"><i class="iconfont icon-password"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="inputCode">
                    <el-input class="check-code"
                              placeholder="请输入验证码"
                              v-model="loginFormData.inputCode"
                              @keyup.enter="login('loginForm')"
                    >
                        <template slot="prepend"><i class="iconfont icon-zhucedengluyanzhengma"></i></template>
                    </el-input>
                    <img v-bind:src="loginFormData.code" alt="" class="check-code-img" @click="createCode">
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="loginFormData.auto" class="auto-login" @keyup.enter="login('loginForm')">
                        自动登陆
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-button" style="width:100%" @click="login('loginForm')" type="primary"
                               :loading="isBtnLoading">{{btnText}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import instance from '../api/login.js';
    import CryptoJS from "crypto-js";
    import * as util from '../assets/util.js';
    import {mapMutations} from 'vuex';

    export default {
        data() {
            var checkCode = (rule, value, callback) => {
                if (this.isChecked) {
                    return;
                }
                if (!value) {
                    return callback(new Error('请输入验证码'));
                } else if (value.length != 5) {
                    return callback(new Error('验证码不正确'));
                } else {
                    instance.defaults.headers.post['Content-Type'] = 'application/json';
                    let vm = this;
                    vm.isChecked = false;
                    instance.post(`/checkCaptcha`, {ctoken: this.loginFormData.ctoken, captcha: value}).then(rse => {
                        if (rse.data) {
                            if (rse.data.code != '200') {
                                return callback(new Error('验证码不正确'));
                            } else {
                                vm.isChecked = true;
                            }
                        } else {
                            callback();
                        }
                    })
                }
            };

            return {
                loginFormData: {
                    username: '',
                    password: '',
                    code: '',
                    inputCode: '',
                    auto: false,
                    ctoken: 'PARTY-'
                },
                isChecked: false,
                isBtnLoading: false,

                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    inputCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {validator: checkCode, trigger: 'blur'}
                    ],
                }
            };
        },
        computed: {
            btnText() {
                if (this.isBtnLoading) return '登录中...';
                return '登 录';
            }
        },
        methods: {
            ...mapMutations([
                'USER_LOGIN'
            ]),
            login(formName) {
                var vm = this;
                if (!vm.loginFormData.username) {
                    vm.$message.error('请填写用户名！！！');
                    return;
                }
                if (!vm.loginFormData.password) {
                    vm.$message.error('请填写密码');
                    return;
                }

                if (!vm.isChecked) {
                    instance.post(`/checkCaptcha`, {
                        ctoken: this.loginFormData.ctoken,
                        captcha: this.loginFormData.inputCode
                    }).then(rse => {
                        if (rse.data.code === 200) {
                            vm.isChecked = true;
                            vm.sendLogin();
                        } else {
                            vm.$message.error(rse.data.message);
                        }
                    })
                } else {
                    vm.sendLogin();
                }
            },

            sendLogin() {
                let vm = this,
                    words = CryptoJS.enc.Utf8.parse(vm.loginFormData.password),
                    base64 = CryptoJS.enc.Base64.stringify(words),
                    loginParams = {
                        username: vm.loginFormData.username,
                        password: base64,
                        auto: vm.loginFormData.auto,
                        ctoken: vm.loginFormData.ctoken
                    };
                vm.isBtnLoading = true;
                instance.post(`/login`, loginParams).then(rse => {
                    vm.isBtnLoading = false;
                    if (rse.data.code === 200) {
                        rse.data.data.auto = vm.loginFormData.auto;
                        vm.USER_LOGIN(rse.data.data);
                        vm.$emit('login', vm.$router.currentRoute.query.from);
                    } else {
                        vm.isBtnLoading = false;
                        vm.$message({
                            message: rse.data.message,
                            type: 'warning'
                        });
                        return Promise.reject({
                            message: '登录异常！'
                        });
                    }
                }).catch(util.catchError);
            },

            createCode() {
                this.isChecked = false;
                // gengerate token code
                let ctokenLength = 22,
                    random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
                this.loginFormData.ctoken = 'PARTY-';
                for (let i = 0; i < ctokenLength; i++) {
                    let index = Math.floor(Math.random() * 36);
                    this.loginFormData.ctoken += random[index];
                }
                instance.get(`/captcha?ctoken=${this.loginFormData.ctoken}`).then((rse) => {
                    if (rse.data) {
                        this.loginFormData.code = rse.data.data;
                    }
                });
                this.loginFormData.inputCode = '';
            }
        },
        created() {
            // sessionStorage.clear();
            let cookieToken = util.getCookie('token'),
                cookieExpire = util.getCookie('expire');
            let token = util.session('token');
            if (cookieToken && Date.parse(new Date()) < cookieExpire) {
                // console.log('该用户没有过期，直接跳转到首页。。。');
                this.$router.replace({path: '/'});
            } else if (token) {
                this.$router.replace({path: '/'});
            } else {
                this.createCode();
            }
        }
    };
</script>
