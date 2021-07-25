import request from '@/base/plugin/axios'


// 定义 API 调用
// --------------------------
export default {

  get_all_users: function(data) {
    return request({
      url: 'demo/user/get_all_users',
      method: 'get',
      data: data
    })
  },

  get_user_info: function(data) {
    return request({
      url: 'demo/user/get_user_info',
      method: 'post',
      data: data
    })
  },

  login: function(data) {
    return request({
      url: 'demo/user/login',
      method: 'post',
      data: data
    })
  },

  logout: function(data) {
    return request({
      url: 'demo/user/logout',
      method: 'post',
      data: data
    })
  },

}
