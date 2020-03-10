const defaultTime = 100

/**
 * 防抖
 * @param {Object} that func 的 this 对象
 * @param {Function} func 要执行的方法
 * @param {Number?} time 间隔时间
 */
function debounce (that, func, time) {
  time = time || defaultTime
  let timeoutId
  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      func.apply(that, arguments)
    }, time)
  }
}

/**
 * 节流
 * @param {Object} that func 的 this 对象
 * @param {Function} func 要执行的方法
 * @param {Number?} time 间隔时间
 */
function throttle (that, func, time) {
  time = time || defaultTime
  let lastTime
  return function () {
    if (lastTime === undefined || Date.now() > lastTime) {
      lastTime = Date.now() + time
      setTimeout(function () {
        func.apply(that, arguments)
      }, time)
    }
  }
}

export {
  debounce,
  throttle
}
