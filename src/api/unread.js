import instance from './index';

const preUrlPath = '';

//get unread list
const getUnread = {
    p: ['get,/warns/'],
    r: params => {
        return instance.get(`${preUrlPath}/warns/`, {params})
    }
};
//get unread number
const getUnreadNum = {
    p: ['get,/warn/unread/'],
    r: params => {
        return instance.get(`${preUrlPath}/warn/unread/`, {params})
    }
};
//delete hasRead list
const deleteHasRead = {
    p: ['delete,/warns/'],
    r: params => {
        return instance.delete(`${preUrlPath}/warns/`, {params})
    }
};
//mark hasRead
const markReads = {
    p: ['post,/warns/readSome/'],
    r: params => {
        return instance.post(`${preUrlPath}/warns/readSome/`, params)
    }
};
//readAll
const readAll = {
    p: ['post,/warns/readAll/'],
    r: params => {
        return instance.post(`${preUrlPath}/warns/readAll/`, params)
    }
};

export {
    getUnread,
    getUnreadNum,
    deleteHasRead,
    markReads,
    readAll
};
