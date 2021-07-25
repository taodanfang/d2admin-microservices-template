const Ok = function(data, msg) {
  let the_msg = 'ok'
  if (msg) {
    if (msg !== '') {
      the_msg = msg
    }
  }

  let the_data = {}
  if (data) {
    the_data = data
  }

  let a_result = {
    success: true,
    code: 'server-api-ok',
    error: {},
    response: {
      data: the_data,
      msg: the_msg,
      expired: false,
    }
  }
  return a_result
}

const Error = function(msg, data) {
  let the_msg = 'error'
  if (msg) {
    if (msg !== '') {
      the_msg = msg
    }
  }

  let the_data = {}
  if (data) {
    the_data = data
  }

  let a_result = {
    success: false,
    code: 'server-api-error',
    response: {},
    error: {
      data: the_data,
      msg: the_msg,
      expired: false,
    }
  }
  return a_result
}

export default {
  Ok, Error
}
