/**
 * Description of helpers.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 22.03.18 13:51
 */
import Cookies from 'js-cookie'
import { keys } from 'lodash'

function delay(ms, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, ms)
  })
}

function delayAnswer(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, ms)
  })
}

function setUserData(name, value) {
  if (window.localStorage) { // eslint-disable-line
    window.localStorage.setItem(name, value) // eslint-disable-line
  } else {
    Cookies.set(name, value, { expires: 7 })
  }
}

function getUserData(name) {
  let token
  if (window.localStorage) { // eslint-disable-line
    token = window.localStorage.getItem(name) // eslint-disable-line
  } else {
    token = Cookies.get(name)
  }

  return token
}

function removeUserData(name) {
  if (window.localStorage) { // eslint-disable-line
    window.localStorage.removeItem(name) // eslint-disable-line
  } else {
    Cookies.remove(name)
  }
}

function removeEmpty(object) {
  const result = {}
  const props = keys(object)
  props.forEach((prop) => {
    if (object[prop]) {
      result[prop] = object[prop]
    }
  })
  return result
}

export {
  delay,
  delayAnswer,
  setUserData,
  getUserData,
  removeUserData,
  removeEmpty,
}
