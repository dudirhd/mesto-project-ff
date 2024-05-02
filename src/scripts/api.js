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
    return console.log('ОШИБКА')
  }
}

export function getUser() {
  return fetch(`${config.baseURL}/users/me `, {
    headers: config.headers,
    method: config.methodGet
  }).then(responseJson)
  .catch(error => console.log(error)) 
}

export function getAllCards() {
  return fetch(`${config.baseURL}/cards `, {
    headers: config.headers,
    method: config.methodGet,
  }).then(responseJson)
  .catch(error => console.log(error))
}

export function changeAvatar(avatar) {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH'
  }).then(responseJson)
  .catch(error => console.log(error)) 
}

export function newCardFunc(obj) {
  return fetch(`${config.baseURL}/cards`, {
    method: config.methodPost,    
    headers: config.headers,
    body: JSON.stringify(obj)
  }).then(responseJson)
  .catch(error => console.log(error))  
}

export function changeName(obj) {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',    
    headers: config.headers,
    body: JSON.stringify(obj)
  }).then(responseJson)
  .catch(error => console.log(error)) 
}

export function deleteCardRequest(id) {
  return fetch(`${config.baseURL}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .catch(error => console.log(error))
}

export function cardLikeRequest(flag, id) {
  if (flag) {
    return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    }).then(responseJson)
    .catch(error => console.log(error))
  } else {
    return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(responseJson)
    .catch(error => console.log(error))
  }
}