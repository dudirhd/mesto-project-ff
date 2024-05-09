const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    'Content-Type': 'application/json',
    'authorization': '27e1782a-9848-48d5-811f-a412253546cd'
  },
  methodGet: 'GET',
  methodPost: 'POST'
}

function responseJson(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status);
  }
}

export function getUser() {
  return fetch(`${config.baseURL}/users/me `, {
    headers: config.headers,
    method: config.methodGet
  }).then(responseJson)
}

export function getAllCards() {
  return fetch(`${config.baseURL}/cards `, {
    headers: config.headers,
    method: config.methodGet,
  }).then(responseJson)
}

export function changeAvatar(avatar) {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(responseJson)
}

export function newCardFunc(obj) {
  return fetch(`${config.baseURL}/cards`, {
    method: config.methodPost,    
    headers: config.headers,
    body: JSON.stringify(obj)
  }).then(responseJson)
}

export function changeName(obj) {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',    
    headers: config.headers,
    body: JSON.stringify(obj)
  }).then(responseJson)
}

export function deleteCardRequest(id) {
  return fetch(`${config.baseURL}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function cardLikeRequest(flag, id) {
  if (!flag) {
    return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    }).then(responseJson)
  } else {
    return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(responseJson)
  }
}