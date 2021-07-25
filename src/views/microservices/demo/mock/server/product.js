const Mock = require('mockjs')
const Random = Mock.Random
import Results from '@/base/libs/result'

const titleList = ['男士上衣', 'T恤', '衬衫', '牛仔裤', '皮衣', '短裙'];

// 定义数据表
// ----------------------
var table_products = [];


// 定义数据表结构
// ----------------------
const init_table = function() {
  table_products = [];

  for (let i = 0; i < 10; i++) {
    let product = {
      id: i + 1,
      title: titleList[Math.floor(Math.random()*titleList.length)],
      price: Random.float(10, 100).toFixed(2),
      stock: Random.integer(10, 100),
      saleCount: Random.integer(0, 90),
      isSale: Random.integer(0, 1),
      createTime: Random.datetime(),
      imgUrl: Random.dataImage('60x60', 'ZAdmin-' + (i + 1)),
    }
    table_products.push(product)
  }
}


// 定义 CRUD 接口
// ----------------------
const get_all_products = function () {

  let data = {products: table_products}
  return Results.Ok(data)

}


// 定义 API
// ----------------------

init_table()
Mock.mock('/demo/product/get_all_products', 'get', get_all_products);
