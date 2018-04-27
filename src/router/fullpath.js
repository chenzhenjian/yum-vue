import Abstract from '../views/common/abstract.vue';

/**
 * 前端路由
 */
export default [{
    path: '/',
    name: '首页',
    component: (resolve) => require(['../views/index.vue'], resolve),
    children: [
        {
            path: '/unread',
            name: '消息中心',
            component: (resolve) => require(['../views/common/unread.vue'], resolve)
        }, {
            path: '/sys',
            name: '系统管理',
            meta: {
                icon: 'iconfont icon-xitongguanli',
                disable: true
            },
            component: Abstract,
            children: [{
                path: 'role',
                name: '角色管理',
                meta: {},
                component: (resolve) => require(['../views/sys/role/roles.vue'], resolve),
                children: [{
                    path: 'add',
                    name: '添加角色',
                    meta: {},
                    component: (resolve) => require(['../views/sys/role/add.vue'], resolve),
                }, {
                    path: 'edit/:id',
                    name: '修改角色',
                    meta: {},
                    component: (resolve) => require(['../views/sys/role/add.vue'], resolve),
                }]
            }, {
                path: 'user',
                name: '用户管理',
                meta: {},
                component: (resolve) => require(['../views/sys/user/users.vue'], resolve),
                children: [{
                    path: 'add',
                    name: '添加用户',
                    meta: {},
                    component: (resolve) => require(['../views/sys/user/add.vue'], resolve),
                }, {
                    path: 'edit/:id',
                    name: '修改用户',
                    meta: {},
                    component: (resolve) => require(['../views/sys/user/add.vue'], resolve),
                }]
            }]
        }]
}];
