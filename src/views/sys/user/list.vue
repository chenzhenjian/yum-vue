<style>
    .user-table.el-table th {
        background: #ffd9da;
        color: #c81d1d;
        text-align: center;
    }

    .user-table.el-table td {
        text-align: center;
    }
</style>

<style scoped>

    .search-item {
        margin-bottom: 0;
        margin-right: 0;
    }
</style>

<template>
    <div>
        <el-row class="button-form">
            <el-button type="primary" icon="iconfont icon-tianjia icon-font-custom" size="mini" @click="add"
                       v-has="[user.addUser]">新增
            </el-button>
            <el-button type="danger" icon="iconfont icon-shanchu icon-font-custom" size="mini" @click="deleteUser"
                       v-has="[user.deleteUser]">删除
            </el-button>
            <el-button type="warning" icon="iconfont icon-suoding icon-font-custom" size="mini"
                       @click="lockUser(this, false)" v-has="[user.lockUser]">锁定
            </el-button>
            <el-button type="warning" icon="iconfont icon-lock icon-font-custom" size="mini"
                       @click="lockUser(this, true)" v-has="[user.lockUser]">解锁
            </el-button>
        </el-row>

        <el-row class="search-form">
            <el-form :inline="true" :model="search" class="demo-form-inline" size="mini">
                <el-form-item class="search-item">
                    <el-input v-model="search.name" placeholder="姓名"/>
                </el-form-item>
                <el-form-item class="search-item">
                    <selectlist v-model="search.orgId" placeholder="党组织" @transferId="getdata"
                                size="small"/>
                </el-form-item>
                <el-form-item class="search-item">
                    <el-input v-model="search.username" placeholder="用户名"/>
                </el-form-item>
                <el-form-item class="search-item">
                    <el-input v-model="search.phone" placeholder="联系电话"/>
                </el-form-item>
                <el-form-item class="search-item">
                    <el-select v-model="search.roleId" clearable placeholder="角色" value="">
                        <el-option
                                v-for="role in roles"
                                :key="role.id"
                                :label="role.name"
                                :value="role.id"
                                :loading="roleLoading">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-item">
                    <el-button type="info" @click="searchForm" icon="el-icon-search" size="mini"/>
                </el-form-item>
            </el-form>
        </el-row>


        <el-table class="user-table"
                  v-loading="loading"
                  :data="list"
                  size="mini"
                  style="width: 100%;"
                  highlight-current-row
                  stripe border
                  @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>

            <el-table-column
                    label="状态"
                    width="80"
                    prop="validTxt"
                    fixed>
            </el-table-column>
            <el-table-column
                    label="姓名/登录账号"
                    width="200"
                    prop="allName"
                    fixed>
            </el-table-column>
            <el-table-column
                    label="联系电话"
                    width="150"
                    prop="phone"
                    fixed>
            </el-table-column>
            <el-table-column
                    label="角色"
                    width="100"
                    prop="roleName">
            </el-table-column>
            <el-table-column
                    label="党组织"
                    width="200"
                    prop="orgName">
            </el-table-column>
            <el-table-column
                    label="最近登录时间"
                    width="200"
                    prop="lastLoginTime">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="100">
                <template slot-scope="scope">
                    <el-button
                            size="mini" type="primary" icon="el-icon-edit" class="ele-table-btn"
                            v-has="[user.editUser]"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block customer-pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.index"
                    :page-sizes="[8, 10, 15]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import * as user from '../../../api/user';
    import * as widget from '../../../api/widget';
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
            return {
                list: [],
                page: {
                    size: 8,
                    index: 1,
                    total: 0
                },
                loading: false,
                roleLoading: false,
                multipleSelection: [],
                search: {
                    name: '',
                    username: '',
                    phone: '',
                    roleIds: [],
                    orgId: ''
                },
                formSearch: {
                    name: '',
                    username: '',
                    phone: '',
                    roleIds: [],
                    orgId: ''
                },
                roles: [],
            }
        },

        computed: {
            userIds: function () {
                let data = [];
                for (let index = 0; index < this.multipleSelection.length; index++) {
                    data.push(this.multipleSelection[index].id);
                }
                return data.join(',');
            }
        },

        methods: {
            getdata(data) {
                this.search.orgId = data[0];
            },
            fetchData(params) {
                let vm = this, data = {};
                vm.loading = true;
                if (params) {
                    data = params;
                }
                data.size = vm.page.size;
                data.index = vm.page.index;
                user.getUsers.r(data).then((rse) => {
                    if (rse.data.code === 200) {
                        vm.list = rse.data.data.list;
                        for (let i = 0; i < vm.list.length; i++) {
                            vm.list[i].allName = vm.list[i].name + ' / ' + vm.list[i].username;
                            vm.list[i].validTxt = '失效';
                            if (vm.list[i].valid) {
                                vm.list[i].validTxt = '生效';
                            }
                        }
                        vm.page = rse.data.data.page;
                    }
                    vm.loading = false;
                });
            },

            searchForm() {
                this.page = {
                    size: 8,
                    index: 1,
                    total: 0
                };
                this.formSearch = this.search;
                let vm = this, params = {};
                params.name = vm.formSearch.name;
                params.username = vm.formSearch.username;
                params.phone = vm.formSearch.phone;
                params.orgId = vm.formSearch.orgId;
                params.roleId = vm.formSearch.roleId;
                this.fetchData(params);
            },

            getRoles() {
                let vm = this;
                vm.roleLoading = true;
                widget.getRole.r().then(rse => {
                    vm.roleLoading = false;
                    if (rse.data) {
                        vm.roles = rse.data.data;
                    } else {
                        vm.roles = [];
                    }
                });
            },

            handleEdit(index, row) {
                // console.log(index);
                // console.log(row);
                let id = row.id;
                this.$router.replace({path: `/sys/user/edit/${id}`});
            },
            handleDelete(index, row) {
            },

            handleSizeChange(val) {
                this.page.index = 1;
                this.page.size = val;
                let vm = this, params = {};
                params.name = vm.formSearch.name;
                params.username = vm.formSearch.username;
                params.phone = vm.formSearch.phone;
                params.orgId = vm.formSearch.orgId;
                params.roleId = vm.formSearch.roleId;
                this.fetchData(params);
            },
            handleCurrentChange(val) {
                this.page.index = val;
                let vm = this, params = {};
                params.name = vm.formSearch.name;
                params.username = vm.formSearch.username;
                params.phone = vm.formSearch.phone;
                params.orgId = vm.formSearch.orgId;
                params.roleId = vm.formSearch.roleId;
                this.fetchData(params);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            add() {
                this.$router.replace({path: '/sys/user/add'});
            },
            deleteUser() {
                let vm = this;
                if (vm.multipleSelection.length <= 0) {
                    vm.$message({
                        message: '请先选中用户！',
                        type: 'warning'
                    });
                    return;
                }
                vm.$confirm('确定删除选中的用户吗？').then(_ => {
                    user.deleteUser.r({userIds: vm.userIds}).then(rse => {
                        if (rse.data.code === 200) {
                            vm.$message({
                                message: '删除成功！',
                                type: 'warning'
                            });
                            vm.fetchData();
                        } else {
                            vm.$message({
                                message: rse.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }).catch(_ => {
                });
            },
            lockUser(e, state) {
                let vm = this;
                if (vm.multipleSelection.length <= 0) {
                    vm.$message({
                        message: '请先选中用户！',
                        type: 'warning'
                    });
                    return;
                }
                let data = {
                    state: state,
                    userIds: vm.userIds
                };
                user.lockUser.r(data).then(rse => {
                    if (rse.data) {
                        let message = '解锁成功！';
                        if (!state) {
                            message = '锁定成功';
                        }
                        vm.$message({
                            message: message,
                            type: 'warning'
                        });
                        vm.fetchData();
                    } else {
                        vm.$message({
                            message: rse.data.message,
                            type: 'warning'
                        });
                    }
                })
            }
        },
        created() {
            this.fetchData();
            this.getRoles();
        }
    }
</script>