import { reqRegister, reqLogin, reqLogout } from '@/api'
import { getUserTempId } from '@/utils/userabout'
const state = {
    userTempId: getUserTempId(),
    userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
}
const mutations = {
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    DELETEUSERINFO(state) {
        state.userInfo = {}

    }
}

const actions = {
    async register({ commit }, userInfo) {
        const result = await reqRegister(userInfo)
        if (result.code === 200) {
            alert('注册成功')
        }
    },
    async login({ commit }, userInfo) {
        const result = await reqLogin(userInfo)
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            localStorage.setItem('USERINFO_KEY', JSON.stringify(result.data))
        }
    },
    async getLogout({ commit }) {
        const result = await reqLogout()
        if (result.code === 200) {
            commit('DELETEUSERINFO')
            localStorage.removeItem('USERINFO_KEY')
        }
    },
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}