import Vue from './vue'

let vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello world'
  }
})

console.log(vm)
console.log(vm.msg)
vm.msg = 123
console.log(vm.msg)