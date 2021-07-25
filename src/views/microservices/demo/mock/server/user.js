const Mock = require('mockjs')
import Results from '@/base/libs/result'

// 定义数据表
// ----------------------
var table_users = []


// 定义数据表结构
// ----------------------
const init_table = function() {
  table_users = [
    { user_name: 'admin', password: 'admin', uuid: 'admin-uuid', role: 'admin', token: 'admin-uuid', is_login: false },
    { user_name: 'editor', password: 'editor', uuid: 'editor-uuid', role: 'editor', token: 'editor-uuid', is_login: false},
    { user_name: 'user1', password: 'user1', uuid: 'user1-uuid',  role: 'user', token: 'user1-uuid', is_login: false }
  ];
}


// 定义 CRUD 接口
// ----------------------
const get_all_users = function (request) {
  const params = JSON.parse(request.body)

  if (!params.user_token) {
    return Results.Error('no user_token')
  }

  const user = table_users.find(e => e.token === params.user_token)
  if (!user) {
    return Results.Error('user_token is fault.')
  }

  return Results.Ok({users: table_users } )

}

const get_user_info = function(request) {
  const params = JSON.parse(request.body)

  if (!params.user_token) {
    return Results.Error('no user_token')
  }

  if (!params.user_uuid) {
    return Results.Error('no user_uuid')
  }

  const user = table_users.find(e => e.uuid === params.user_uuid)
  if (user) {
    if (user.user_token === params.user_token) {
      return Results.Ok(
        {
          user: {
            user_name: user.user_name,
            user_uuid: user.uuid,
            user_role: user.role,
            user_is_login: user.is_login,
          }})
    } else {
      return Results.Error("user_token is fault.")
    }

  } else {
    return Results.Error("user_uuid is fault.")
  }
}

const login = function(request) {

  const params = JSON.parse(request.body)
  if (!params.user_name) {
    return Results.Error('no user_name')
  }
  if (!params.user_password) {
    return Results.Error('no user_password')
  }

  const user = table_users.find(e => e.user_name === params.user_name && e.password === params.user_password)

  if (user) {
    user.is_login = true
    return Results.Ok({
      user: {
        user_name: user.user_name,
        user_uuid: user.uuid,
        user_role: user.role,
        user_token: user.token,
        user_is_login: user.is_login,
      }
    })

  } else {
    return Results.Error('user_name or user_password is error.')
  }
}


const logout = function(request) {
  const params = JSON.parse(request.body)
  if (!params.user_uuid) {
    return Results.Error('no user_uuid')
  }

  if (!params.user_token) {
    return Results.Error('no user_token')
  }

  const user = table_users.find(e => e.uuid === params.user_uuid && e.token === params.user_token)

  if (user) {
    user.is_login = false
    return Results.Ok(
      {user: {
          user_name: user.user_name,
          user_uuid: user.uuid,
          user_role: user.role,
          user_is_login: user.is_login,
        }})
  } else {
    return Results.Error('user_uuid or user_token is error.')
  }
}

// 定义 API
// ----------------------
init_table()

Mock.mock('/demo/user/get_all_users', 'get', get_all_users);
Mock.mock('/demo/user/get_user_info', 'post', get_user_info);
Mock.mock('/demo/user/login', 'post', login);
Mock.mock('/demo/user/logout', 'post', logout);

