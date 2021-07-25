import util from '@/base/libs/util'

export default {
  install (Vue, options) {
    Vue.prototype.$open = util.open
  }
}
