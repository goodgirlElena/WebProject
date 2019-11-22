// 1. commonJs 模块化规范
const {add,mul} = require('./mathTools.js');
console.log(add(20, 30));
console.log(mul(20, 30));

// 2. ES6 模块化规范
import {name,age,height} from './info'

console.log(name);
console.log(age);
console.log(height);