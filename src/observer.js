export default class Observer {
  constructor(data) {
    // 用来遍历 data
    this.walk(data)
  }

  walk (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive (data, key, value) {
    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
    this.walk(value)

    const self = this
    // 创建 Dep 对象
    // let dep = new Dep()
    Object.defineProperty(data, key, {
      // 设置可枚举
      enumerable: true,
      // 设置可配置
      configurable: true,
      get () {
        // 在这里添加观察者对象 Dep.target 表示观察者
        // Dep.target && dep.addSub(Dep.target)
        console.log('observer get', 111)
        return value
      },
      set (newValue) {
        // 判断旧值和新值是否相等
        if (newValue === value) return
        // 设置新值
        value = newValue
        // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
        self.walk(newValue)

        console.log('observer set', newValue)
        // 触发通知 更新视图
        // dep.notify()
      }
    })
  }
}