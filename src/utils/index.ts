// 节流函数
export const throttle = (fn: Function, time: number) => {
  let i = false
  return function (...arg: any[]) {
    if (i) return
    i = true
    setTimeout(() => {
      i = false
    }, time)
    fn.apply(null, arg)
  }
}
