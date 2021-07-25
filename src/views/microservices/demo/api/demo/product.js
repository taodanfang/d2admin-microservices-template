import request from '@/base/plugin/axios'


// 定义 API 调用
// --------------------------
export default {

  get_all_products: function() {
    return request({
      url: 'demo/product/get_all_products',
      method: 'get',
      data: {}
    })
  },

}
