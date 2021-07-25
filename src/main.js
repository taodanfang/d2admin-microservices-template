// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'

// 第三方插件
// ------------------------------------------------

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import './base/assets/css/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import VCharts from 'v-charts'
import D2Crud from '@d2-projects/d2-crud'
// ------------------------------------------------

// 核心插件
import d2Admin from '@/base/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(d2Admin)

// 第三方插件
// ------------------------------------------------
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VXETable)
Vue.use(VCharts)
Vue.use(D2Crud)

Vue.prototype.$XModal = VXETable.modal
// ------------------------------------------------

// 引入mock数据
import '@/views/microservices/demo/mock'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
