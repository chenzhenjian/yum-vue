import {USER_LOGIN, USER_LOGOUT, SET_USER_INFO} from './types';
import * as util from '../assets/util.js';
import instance from '../api/index';

const state = {
    user: {
        id: '',
        name: '',
        username: ''
    }
};

const mutations = {
    [USER_LOGIN](state, data) {
        util.session('token', data.token.token);
        if (data.auto) {
            util.setCookie('token', data.cookie.value, data.expire);
        }
        util.session('userId', data.token.userId);
        state.user.id = data.token.userId;
    },

    [USER_LOGOUT](state) {
        sessionStorage.clear();
        util.session('token', '');
        util.session('userId', '');
        util.delCookie();
    },

    [SET_USER_INFO](state, data) {
        state.user = data;
    }
};

export default {
    state,
    mutations
}
