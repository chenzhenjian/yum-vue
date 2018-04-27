<style scoped>
    .tree-box {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        padding: 10px;
    }

    .icon-customer {
        padding-right: 5px;
    }

    .role-select {
        width: 100%;
    }
</style>

<template>
    <el-row>
        <el-col :span="12">
            <el-form ref="userForm" :model="userForm" label-width="90px" :rules="rules" size="small">
                <el-form-item label="党组织" prop="organization">
                    <selectlist v-model="userForm.orgId" v-bind:dataChild="dataChild" popoverwidth="590"
                                @transferId="getData" placeholder="党组织" size="small"/>
                </el-form-item>
                <el-form-item label="登录账号" prop="username">
                    <el-input v-model="userForm.username" placeholder="登录账号"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" placeholder="密码" type="password"/>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="userForm.roleId" clearable placeholder="角色" class="role-select" multiple
                               value="">
                        <el-option
                                v-for="role in roles"
                                :key="role.id"
                                :label="role.name"
                                :value="role.id"
                                :loading="loading">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="userForm.name" placeholder="姓名"/>
                </el-form-item>
                <el-form-item label="身份证" prop="idNo">
                    <el-input v-model="userForm.idNo" placeholder="身份证"/>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="userForm.phone" placeholder="联系电话"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="iconfont icon-baocun icon-customer" @click="onSubmit('userForm')"
                               :loading="saving" size="mini">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
    import {Loading} from 'element-ui';
    import * as user from '../../../api/user';
    import * as widget from '../../../api/widget';
    import CryptoJS from "crypto-js";
    import validator from '@/assets/validator';

    let myMixin = {
        data: function () {
            return {user}
        }
    };

    export default {
        mixins: [myMixin],
        components: {
            selectlist
        },
        data() {
            const isPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('联系电话不能为空'));
                }
                if (!validator.isValidPhone(value)) {
                    return callback(new Error('联系电话输入不合法'));
                }
                callback();
            };
            const isNo = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('身份证不能为空'));
                }
                if (!validator.isValidId(value)) {
                    return callback(new Error('身份证输入不合法'));
                }
                callback();
            };

            const validName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('当前输入为空'));
                }

                if (!validator.isValidName(value)) {
                    return callback(new Error('请输入大小写英文、数字、下划线并且长度为5-15'));
                }
                callback();
            };
            return {
                saving: false,
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'},
                        {required: true, validator: validName, trigger: 'blur'}
                    ],
                    idNo: [
                        {required: true, validator: isNo, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, validator: isPhone, trigger: 'blur'}
                    ]
                },
                userForm: {
                    id: '',
                    name: '',
                    organization: '',
                    orgId: '',
                    password: '',
                    roleId: '',
                    username: '',
                    idNo: '',
                    phone: ''
                },
                roles: [],
                dataChild: ''
            }
        },

        methods: {
            getData(data) {
                this.userForm.orgId = data[0];
            },
            onSubmit: function (userForm) {
                let vm = this;
                let message = '';
                this.$refs[userForm].validate((valid) => {
                    if (valid) {
                        let message = '添加成功';
                        let formData = {};

                        formData.name = vm.userForm.name;
                        formData.orgId = vm.userForm.orgId;

                        let words = CryptoJS.enc.Utf8.parse(vm.userForm.password);
                        formData.password = CryptoJS.enc.Base64.stringify(words);
                        formData.roleIds = vm.userForm.roleId.join(',');
                        formData.username = vm.userForm.username;
                        formData.idNo = vm.userForm.idNo;
                        formData.phone = vm.userForm.phone;

                        vm.saving = true;
                        if (vm.userForm.id) { //修改
                            message = '修改成功';
                            formData.id = vm.userForm.id;
                            user.editUser.r(formData).then((rse) => {
                                if (rse.data.code === 200) {
                                    vm.$message({
                                        message: message,
                                        type: 'success'
                                    });
                                    vm.$router.replace({path: '/sys/user'});
                                } else {
                                    vm.saving = false;
                                    vm.$message.error(rse.data.message);
                                }
                            })
                        } else {  //增加
                            user.addUser.r(formData).then((rse) => {
                                if (rse.data.code === 200) {
                                    vm.$message({
                                        message: message,
                                        type: 'success'
                                    });
                                    vm.$router.replace({path: '/sys/user'});
                                } else {
                                    vm.saving = false;
                                    vm.$message.error(rse.data.message);
                                }
                            })
                        }
                    } else {
                        vm.$message({
                            message: '请正确填写表单',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            getRoles() {
                let vm = this;
                this.loading = true;
                widget.getRole.r().then(rse => {
                    this.loading = false;
                    if (rse.data) {
                        vm.roles = rse.data.data;
                    } else {
                        this.roles = [];
                    }
                });
            }
        },
        created() {
            let vm = this,
                id = this.$route.params.id;
            let loadingInstance1;
            if (id) {
                loadingInstance1 = Loading.service({
                    fullscreen: true,
                    background: 'rgba(0,0,0,0)'
                });
            }
            this.getRoles();
            if (id) {
                vm.userForm.id = id;
                user.getUser.r({id: id}).then((rse) => {
                    if (rse.data) {
                        let info = rse.data.data;
                        vm.userForm.name = info.name;
                        vm.userForm.orgId = info.orgId;
                        vm.userForm.roleId = info.roleIds.split(',');
                        vm.userForm.password = info.password;
                        vm.userForm.username = info.username;
                        vm.userForm.phone = info.phone;
                        vm.userForm.idNo = info.idNo;
                        vm.userForm.id = info.id;

                        organization.getOrg.r({id: vm.userForm.orgId}).then((rse) => {
                            if (rse.data.data) {
                                this.dataChild = rse.data.data.name;
                            } else {
                                this.dataChild = '';
                            }
                            loadingInstance1.close();
                        });
                    }
                })
            }
        }
    }
</script>
