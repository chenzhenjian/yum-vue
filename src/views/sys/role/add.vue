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
</style>

<template>

    <el-row>
        <el-col :span="12">
            <el-form ref="roleForm" :model="roleForm" label-width="80px" :rules="rules" size="small">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="roleForm.name" placeholder="角色名称"/>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" v-model="roleForm.description" placeholder="角色描述"
                              :autosize="{ minRows: 3}"/>
                </el-form-item>
                <el-form-item label="功能权限">
                    <div class="tree-box">
                        <el-tree
                                :data="roleForm.functions"
                                show-checkbox
                                node-key="id"
                                ref="tree"
                                check-strictly
                                default-expand-all
                                :props="roleForm.defaultProps"
                                @check="checkAllChild"
                        >
                        </el-tree>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="iconfont icon-baocun icon-customer" @click="onSubmit('roleForm')"
                               :loading="saving" size="mini">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import {Loading} from 'element-ui';
    import * as role from '../../../api/role';
    import * as widget from '../../../api/widget';

    let myMixin = {
        data: function () {
            return {role}
        }
    };

    export default {
        mixins: [myMixin],
        data() {
            return {
                saving: false,
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ]
                },
                roleForm: {
                    id: '',
                    name: '',
                    description: '',
                    permission: [],
                    functions: [],
                    functionIds: [],
                    defaultProps: {
                        children: 'children',
                        label: 'name'
                    }
                },
            }
        },

        methods: {
            getCheckedKeys() {
                return this.$refs.tree.getCheckedKeys();
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            setCheckedKeys(keys) {
                this.$refs.tree.setCheckedKeys(keys);
            },
            onSubmit(roleForm) {
                let vm = this;
                this.$refs[roleForm].validate((valid) => {

                    if (valid) {
                        let formData = {};
                        formData.name = vm.roleForm.name;
                        formData.description = vm.roleForm.description;
                        formData.functionIds = vm.$refs.tree.getCheckedKeys().join(',');
                        let message = '添加成功';
                        this.saving = true;
                        if (vm.roleForm.id) {
                            message = '修改成功';
                            formData.id = vm.roleForm.id;
                            role.editRole.r(formData).then(rse => {
                                if (rse.data.code === 200) {
                                    vm.$router.replace({path: '/sys/role'});
                                    vm.$message({
                                        message: message,
                                        type: 'success'
                                    });
                                } else {
                                    vm.saving = false;
                                    vm.$message.error(rse.data.message);
                                }
                            });
                        } else {
                            role.addRole.r(formData).then((rse) => {
                                if (rse.data.code === 200) {
                                    vm.$router.replace({path: '/sys/role'});
                                    vm.$message({
                                        message: message,
                                        type: 'success'
                                    });
                                } else {
                                    vm.saving = false;
                                    vm.$message.error(rse.data.message);
                                }
                            })
                        }
                    } else {
                        vm.$message({
                            message: '请重新输入角色名称',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            checkAllChild(data, checkedData) {
                let checkId = [], parentId = data.id,
                    isChecked = checkedData.checkedKeys.includes(parentId),
                    checkedKeys = this.getCheckedKeys();
                if (data.children) {
                    this.resetChecked();
                    this.calcuCheckedKeys(data, checkedKeys, isChecked);
                    this.setCheckedKeys(checkedKeys);
                }
            },
            calcuCheckedKeys(data, checkedKeys, isChecked) {
                for (let i = 0; i < data.children.length; i++) {
                    let child = data.children[i];
                    if (isChecked) {
                        checkedKeys.push(child.id);
                    } else {
                        let index = checkedKeys.indexOf(child.id);
                        if (index > -1) {
                            checkedKeys.splice(index, 1);
                        }
                    }
                    if (child.children) {
                        this.calcuCheckedKeys(child, checkedKeys, isChecked);
                    }
                }
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
            widget.getMenuAndAction.r().then((rse) => {
                if (rse.data) {
                    vm.roleForm.functions = rse.data.data;
                }
            });
            if (id) {
                vm.roleForm.id = id;
                role.getRole.r({id: id}).then((rse) => {
                    if (rse.data.code === 200) {
                        let info = rse.data.data;
                        vm.roleForm.id = info.id;
                        vm.roleForm.name = info.name;
                        vm.roleForm.description = info.description;
                        if (info.functionIds) {
                            this.$refs.tree.setCheckedKeys(info.functionIds.split(','));
                        }

                    }
                    loadingInstance1.close();
                })
            }

        }
    }
</script>

