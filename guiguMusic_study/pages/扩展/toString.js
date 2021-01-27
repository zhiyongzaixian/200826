let arr = [1,2,3]
console.log(arr.toString()) // 1,2,3
let num = 123;
console.log(Object.prototype.toString.call(arr)) // [object Array]
console.log(Object.prototype.toString.call(num)) // [object Number]

console.log(Object.prototype.toString.call(arr).slice(8, -1)) // Array
console.log(Object.prototype.toString.call(num).slice(8, -1)) // Number