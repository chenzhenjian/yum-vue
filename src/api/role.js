import instance from './index';

const preUrlPath = '';
// Get role list
const getRoles = {
    p: ['get,/sys/roles/'],
    r: params => {
        return instance.get(`${preUrlPath}/sys/roles/`, {params});
    }
};

// Get a role
const getRole = {
    p: ['get,/sys/role/**'],
    r: params => {
        return instance.get(`${preUrlPath}/sys/role/${params.id}`);
    }
};

// Add a role
const addRole = {
    p: ['put,/sys/role/'],
    r: params => {
        return instance.put(`${preUrlPath}/sys/role/`, params);
    }
};

// Edit a role
const editRole = {
    p: ['post,/sys/role/'],
    r: params => {
        return instance.post(`${preUrlPath}/sys/role/`, params);
    }
};

// Remove a role
const remove = {
    p: ['delete,/sys/role/**'],
    r: params => {
        return instance.get(`${preUrlPath}/sys/role/${params.id}`);
    }
};

export {
    getRoles,
    getRole,
    addRole,
    editRole,
    remove
}
