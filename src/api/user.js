import instance from './index';

const preUrlPath = '';

// Get users list
const getUsers = {
    p: ['get,/sys/users/'],
    r: params => {
        return instance.get(`${preUrlPath}/sys/users/`, {params})
    }
};

const getUser = {
    p: ['get,/sys/user/**'],
    r: params => {
        return instance.get(`${preUrlPath}/sys/user/${params.id}`)
    }
};

const addUser = {
    p: ['put,/sys/user/'],
    r: params => {
        return instance.put(`${preUrlPath}/sys/user/`, params)
    }
};

const editUser = {
    p: ['post,/sys/user/'],
    r: params => {
        return instance.post(`${preUrlPath}/sys/user/`, params)
    }
};

const deleteUser = {
    p: ['delete,/sys/users/'],
    r: params => {
        return instance.delete(`${preUrlPath}/sys/users/`, {params})
    }
};

const lockUser = {
    p: ['post,/sys/users/lock/'],
    r: params => {
        return instance.post(`${preUrlPath}/sys/users/lock/`, params)
    }
};

export {
    getUsers,
    getUser,
    deleteUser,
    lockUser,
    addUser,
    editUser
}
