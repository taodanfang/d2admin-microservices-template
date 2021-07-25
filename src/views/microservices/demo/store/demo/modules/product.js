import ProductService from '@/views/microservices/demo/api/demo/product'

// 定义缓存
// ------------------------------
export default {
  namespaced: true,

  // 缓存数据
  state: {
    products: [],
  },

  getters: {
    products: (state) => { return state.products },
  },

  mutations: {
   get_all_products(state, data) {
      //console.log("in store.mutations.get_all_products.")
     state.products = data
    }
  },

  // 缓存 CRUD 异步接口
  actions: {
    async get_all_products ({ commit }) {
      //console.log("in store.actions.get_all_products.")
      let rs = await ProductService.get_all_products()
      if (rs.success === false) {
        return rs
      }

      commit('get_all_products', rs.response.data.products)
      return rs

    },
  },

}
