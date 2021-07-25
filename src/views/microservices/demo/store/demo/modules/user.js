import { Message, MessageBox } from 'element-ui'
import util from '@/base/libs/util.js'
import router from '@/router'
import Results from '@/base/libs/result'

import UserService from '@/views/microservices/demo/api/demo/user'

// 定义缓存
// ------------------------------
export default {
  namespaced: true,

  // 缓存数据
  state: {
    users: [],
  },

  getters: {
    users: (state) => { return state.users }
  },

  mutations: {
    get_all_users(state, data) {
      state.users = data
    }
  },

  // 缓存 CRUD 异步接口
  actions: {
    async get_all_users ({ commit }) {
      //console.log("in store.actions.get_all_products.")
      let rs = await UserService.get_all_users()
      if (rs.success === false) {
        return rs
      }
      commit('get_all_users', rs.response.data.users)
    },

    async login({ dispatch }, {user_name = '', user_password = ''} = {}) {

      let rs = await UserService.login({user_name, user_password})
      if (rs.success === false) {
        return Results.Error()
      }
      util.cookies.set('uuid', rs.response.data.user.user_uuid)
      util.cookies.set('token', rs.response.data.user.user_token)

      let user_info = rs.response.data.user
      sessionStorage.setItem("user_info", JSON.stringify(user_info))
      await dispatch('d2admin/user/set', { user_name: rs.response.data.user.user_name, user_uuid: rs.response.data.user.user_uuid }, { root: true })
      await dispatch('load')
      return Results.Ok(rs.response.data)
    },

    async logout({ commit, dispatch }, { confirm = false} = {}) {
      async function logout() {
        let user_uuid = util.cookies.get("uuid")
        let user_token = util.cookies.get("token")

        util.cookies.remove('uuid')
        util.cookies.remove('token')
        sessionStorage.removeItem("user_info")

        await dispatch('d2admin/user/set', {}, { root: true })
        await UserService.logout({user_uuid, user_token})
        router.push({ name: 'login' })
      }
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', { type: 'warning' })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            Message({ message: '取消注销操作' })
          })

      }

      return Results.Ok()
    },

    async load ({ dispatch }) {
      // 加载用户名
      await dispatch('d2admin/user/load', null, { root: true })
      // 加载主题
      await dispatch('d2admin/theme/load', null, { root: true })
      // 加载页面过渡效果设置
      await dispatch('d2admin/transition/load', null, { root: true })
      // 持久化数据加载上次退出时的多页列表
      await dispatch('d2admin/page/openedLoad', null, { root: true })
      // 持久化数据加载侧边栏配置
      await dispatch('d2admin/menu/asideLoad', null, { root: true })
      // 持久化数据加载全局尺寸
      await dispatch('d2admin/size/load', null, { root: true })
      // 持久化数据加载颜色设置
      await dispatch('d2admin/color/load', null, { root: true })

      return Results.Ok()
    }
  },

}
