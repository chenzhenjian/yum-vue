import instance from './index';

const preUrlPath = '';
// Get all menu and cctions
const getMenuAndAction = {
    p: ['get,/common/fuctions/cache/'],
    r: params => {
        return instance.get(`${preUrlPath}/common/functions/cache/`, {params})
    }
};

const getOrgnization = {
    p: ['get,/common/orgnizations/cache/'],
    r: params => {
        return instance.get(`${preUrlPath}/common/orgnizations/cache/`, {params})
    }
};

// Get all roles
const getRole = {
    p: ['get,/common/roles/cache/'],
    r: params => {
        return instance.get(`${preUrlPath}/common/roles/cache/`, {params})
    }
};

//get dic data
const getDicData = {
    p: ['get,/common/simplecodes/cache/'],
    r: (params) => {
        return instance.get(`${preUrlPath}/common/simplecodes/cache/`, {params})
    }
};

//get zones
const getZones = {
    p: ['get,/common/zones/cache/'],
    r: (params) => {
        return instance.get(`${preUrlPath}/common/zones/cache/`)
    }
};

//get menbers by org id
const getMenbersById = {
    p: ['get,/common/menbers/control/'],
    r: (params) => {
        return instance.get(`${preUrlPath}/common/menbers/control/`, {params})
    }
};

//life properties
const getLifeProps = {
    P: ['get,/common/lifeAttrs/cache/'],
    r: () => {
        return instance.get(`${preUrlPath}/common/lifeAttrs/cache/`)
    }
};

export {
    getMenuAndAction,
    getRole,
    getOrgnization,
    getDicData,
    getZones,
    getMenbersById,
    getLifeProps
}
