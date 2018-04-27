import Vue from 'vue';
import Vuex from 'vuex';
import login from './login'
import unread from './unread'
import * as getters from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    getters,
    modules: {
        login,
        unread
    },
    strict: debug
})
