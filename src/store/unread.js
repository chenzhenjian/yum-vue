import * as unread from "@/api/unread.js";

const state = {
    unreadNum: 0
};

const mutations = {
    updateUnreadNum(state, num) {
        state.unreadNum = num
    }
};

const actions = {
    updateUnreadNum(context) {
        unread.getUnreadNum.r().then((res) => {
            if (res.data.code === 200) {
                context.commit('updateUnreadNum', res.data.data)
            } else {
                this.$message.error(res.data.message);
            }
        })
    }
};

export default {
    state,
    mutations,
    actions
}