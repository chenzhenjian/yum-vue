<style>
    .role-table.el-table th {
        background: #ffd9da;
        color: #c81d1d;
        text-align: center;
    }

    .role-table.el-table td {
        text-align: center;
    }

    .icon-font-custom.iconfont {
        font-size: 12px;
    }
</style>

<template>
    <div>
        <el-row class="button-form">
            <el-button type="primary" size="mini" icon="iconfont icon-tianjia icon-font-custom" @click="addRole"
                       v-has="[role.addRole]">新增
            </el-button>
        </el-row>
        <el-table class="role-table"
                  v-loading="loading"
                  :data="list"
                  size="small"
                  style="width: 100%;"
                  highlight-current-row
                  stripe border>
            <el-table-column
                    fixed
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="角色名称"
                    width="280"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="角色描述"
                    width="480"
                    prop="description">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="200">
                <template slot-scope="scope">
                    <el-button class="ele-table-btn"
                               size="mini" type="primary" icon="el-icon-edit"
                               @click="handleEdit(scope.$index, scope.row)" v-has="[role.editRole]">编辑角色以及权限
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
    import * as role from '../../../api/role';

    let myMixin = {
        data: function () {
            return {role}
        }
    };

    export default {
        mixins: [myMixin],
        data() {
            return {
                list: [],
                page: {
                    size: 8,
                    index: 1,
                    total: 0
                },
                loading: false
            }
        },

        methods: {
            fetchData() {
                this.loading = true;
                role.getRoles.r(this.page).then((rse) => {
                    if (rse.data.code === 200) {
                        this.list = rse.data.data.list;
                        this.page.total = rse.data.data.page.total;
                    }
                    this.loading = false;
                });
            },

            handleEdit(index, row) {
                let id = row.id;
                this.$router.replace({path: `/sys/role/edit/${id}`});
            },
            handleSizeChange(val) {
                this.page.size = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.page.index = val;
                this.fetchData();
            },
            addRole() {
                this.$router.replace({path: '/sys/role/add'});
            }
        },
        created() {
            this.fetchData(true)
        }
    }
</script>