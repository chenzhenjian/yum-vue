<style scoped>
    .unread .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .unreadTitle {
        text-decoration: none;
        color: #606266;
    }
</style>
<template>
    <div class="unread">
        <el-row class="button-form">
            <el-button type="danger" size="mini" v-if="currentTab === 'unread'" @click="markReads">标为已读</el-button>
            <el-button type="danger" size="mini" v-if="currentTab !== 'unread'" @click="deleteHasRead">删除</el-button>
            <el-button type="danger" size="mini" style="position:absolute; right:83px; top:40px; z-index:99;"
                       v-if="currentTab === 'unread'" @click="readAll">全部已读
            </el-button>
        </el-row>
        <el-tabs @tab-click="handleClick" v-model="currentTab">
            <el-tab-pane name="unread">
                <span slot="label">未读消息<el-badge class="mark" :value="$store.state.unread.unreadNum" :max="99"
                                                 v-if="$store.state.unread.unreadNum !== 0"/></span>
            </el-tab-pane>
            <el-tab-pane label="已读消息" name="hasread">
            </el-tab-pane>
        </el-tabs>
        <div class="unread-msg" style="width: 100%;flex=1;overflow-y: auto; " v-loadmore="loadMore">
            <el-table
                    ref="multipleTable"
                    :data="list"
                    :empty-text="noDataText"
                    @selection-change="handleSelectionChange"
                    class="scroll">
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>

                <el-table-column
                        prop="warnTitle"
                        label="标题"
                        width="520"
                        align="left">
                    <template slot-scope="scope">
                        <a href="#" @mouseover="getList(scope.$index, scope.row)" @click="dialogVisible = true"
                           class="unreadTitle">{{scope.row.warnTitle}}</a>
                        <el-dialog :visible.sync="dialogVisible" width="40%">
                            <div slot="title">{{mes.title}}</div>
                            <p style="margin-top:0;"><i class="el-icon-time"></i>&nbsp;{{mes.time}}</p>
                            <p>{{mes.content}}</p>
                        </el-dialog>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTimeStr"
                        label="时间"
                        width="400"
                        align="center">
                    <template slot-scope="scope">
                        <span @click="getList(scope.$index, scope.row)"><i class="el-icon-time"></i>&nbsp;{{scope.row.createTimeStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size='small' @click="markReads" v-if="currentTab === 'unread'">标记已读
                        </el-button>
                        <el-button type="danger" size='small' @click="deleteHasRead" v-if="currentTab !== 'unread'">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import * as unread from "@/api/unread.js";

    export default {
        data() {
            return {
                currentTab: 'unread',
                multipleSelection: [],
                dialogVisible: false,
                noDataText: '暂无未读消息',
                mes: {
                    title: '',
                    time: '',
                    content: ''
                },
                list: [],
                page: {
                    size: 20,
                    index: 1,
                    total: 0,
                },
                flag: true,
                flags: true,
            }
        },
        computed: {
            ids: function () {
                let data = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    data.push(this.multipleSelection[i].id);
                }
                return data.join(',');
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab) {
                if (tab.name === 'unread') {
                    this.noDataText = '暂无未读消息';
                    this.flag = true;
                    this.list = [];
                    this.page.index = 1;
                    this.getUnreadList({
                        size: this.page.size,
                        index: this.page.index,
                        ifCheck: false
                    });
                } else {
                    this.noDataText = '暂无已读消息';
                    this.flags = true;
                    this.list = [];
                    this.page.index = 1;
                    this.getHasreadList({
                        size: this.page.size,
                        index: this.page.index,
                        ifCheck: true
                    })
                }
            },
            //获取未读页面
            getUnreadList(params) {
                let vm = this;
                params.size = vm.page.size;
                params.index = vm.page.index;
                params.ifCheck = false;
                if (vm.flag) {
                    unread.getUnread.r(params).then((res) => {
                        if (res.data.code === 200) {
                            if (res.data.data.list.length) {
                                vm.list = vm.list.concat(res.data.data.list);
                            } else {
                                vm.flag = false;
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }
            },
            //获取已读页面
            getHasreadList(params) {
                let vm = this;
                params.size = vm.page.size;
                params.index = vm.page.index;
                params.ifCheck = true;
                if (vm.flags) {
                    unread.getUnread.r(params).then((res) => {
                        if (res.data.code === 200) {
                            if (res.data.data.list.length) {
                                vm.list = vm.list.concat(res.data.data.list);
                            } else {
                                vm.flags = false;
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }

            },
            //删除已读消息
            deleteHasRead() {
                let vm = this;
                if (vm.multipleSelection.length <= 0) {
                    vm.$message({
                        message: '请先选中消息！',
                        type: 'warning'
                    });
                    return;
                }
                vm.$confirm('确定删除选中的消息吗？').then(_ => {
                    unread.deleteHasRead.r({ids: vm.ids}).then(res => {
                        if (res.data.code === 200) {
                            vm.$message({
                                message: '删除成功！',
                                type: 'warning'
                            });
                            vm.flags = true;
                            vm.list = [];
                            vm.page.index = 1;
                            vm.getHasreadList({
                                size: this.page.size,
                                index: this.page.index,
                                ifCheck: true
                            });
                        } else {
                            vm.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                    })
                }).catch(_ => {
                });
            },
            //标记为已读
            markReads(param) {
                let vm = this;
                if (vm.multipleSelection.length <= 0) {
                    vm.$message({
                        message: '请先选中消息！',
                        type: 'warning'
                    });
                    return;
                }
                unread.markReads.r({ids: vm.ids}).then(res => {
                    if (res.data.code === 200) {
                        vm.$message({
                            message: '标记成功！',
                            type: 'warning'
                        });
                        vm.$store.dispatch('updateUnreadNum');
                        vm.flag = true;
                        vm.list = [];
                        vm.page.index = 1;
                        vm.getUnreadList({
                            size: this.page.size,
                            index: this.page.index,
                            ifCheck: false
                        });
                    } else {
                        vm.$message({
                            message: res.data.message,
                            type: 'warning'
                        })
                    }
                })
            },
            //全部已读
            readAll() {
                unread.readAll.r().then((res) => {
                    if (res.data.code === 200) {
                        this.list = [];
                        this.$store.dispatch('updateUnreadNum')
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
            },
            // 弹窗内容
            getList(index, row) {
                this.mes.title = row.warnTitle;
                this.mes.time = row.createTimeStr;
                this.mes.content = row.warnContent;
            },
            //下拉加载
            loadMore() {
                let vm = this;
                this.page.index += 1;
                if (this.currentTab === 'unread') {
                    this.getUnreadList({
                        size: this.page.size,
                        index: this.page.index,
                        ifCheck: false
                    });
                } else {
                    this.getHasreadList({
                        size: this.page.size,
                        index: this.page.index,
                        ifCheck: true
                    });
                }
            }
        },
        created() {
            this.getUnreadList({
                size: this.page.size,
                index: this.page.index,
                ifCheck: false
            });
        }
    }
</script>


