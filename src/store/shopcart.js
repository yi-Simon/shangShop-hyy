import { reqAddOrUpdateShopCart, reqShopCartList, reqUpdateIsChecked, reqDeleteCart } from '@/api'

const state = {
    shopCartList: []
}
const mutations = {
    RECEIVESHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}

const actions = {
    async addorUpdateShopCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            return '添加购物车成功'
        } else {
            // return '添加购物车失败' 返回的还是成功的promise
            //返回的是失败的promise
            return Promise.reject(new Error('添加购物车失败'))
        }
    },
    async getShopCartList({ commit }) {
        const result = await reqShopCartList()
        if (result.code === 200) {
            commit('RECEIVESHOPCARTLIST', result.data)
        }
    },
    async updateIsChecked({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateIsChecked(skuId, isChecked)
        if (result.code === 200) {
            return '修改选中状态'
        } else {
            return Promise.reject(new Error('修改失败'))
        }
    },
    updateAllIsChecked({ commit, state, dispatch }, isChecked) {
        let promises = []
        state.shopCartList.forEach(item => {
            if (item.isChecked === isChecked) return
            let promse = dispatch('updateIsChecked', { skuId: item.skuId, isChecked: isChecked })
            promises.push(promse)
        })
        return Promise.all(promises)
    },
    async reqDeleteCart({ commit }, skuId) {
        const result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return '删除成功'
        } else {
            return Promise.reject(new Error('删除失败'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}