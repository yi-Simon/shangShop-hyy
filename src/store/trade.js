import { reqTrade } from '@/api'

const state = {
    tradeInfo: {}
}

const mutations = {
    RECEIVETRADE(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}

const actions = {}

const getters = {
    async getTradeInfo({ commit }) {
        const result = await reqTrade()
        if (result.code === 200) {
            commit('RECEIVETRADE', result.data)
        } else {
            return Promise.reject(new Error('获取订单失败'))
        }
    }
}



export default {
    state,
    mutations,
    actions,
    getters,
}