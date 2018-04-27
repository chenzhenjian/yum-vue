import instance from './index';

const preUrlPath = '';

// Get role list
const getUserInfo = {
    p: ['get,/common/userInfo'],
    r: params => {
        return instance.get(`${preUrlPath}/common/userInfo`, {params})
    }
};

const getUserPermisson = {
    p: ['get,/common/userPermission'],
    r: params => {
        return instance.get(`${preUrlPath}/common/userPermission`, {params})
    }
};

const logout = {
    p: ['delete,/common/logout'],
    r: params => {
        return instance.delete(`${preUrlPath}/common/logout`);
    }
};

const editPass = {
    p: ['post,/common/updatePass'],
    r: params => {
        return instance.post(`${preUrlPath}/common/updatePass`, params);
    }
};

export {
    getUserInfo,
    getUserPermisson,
    logout,
    editPass
}
