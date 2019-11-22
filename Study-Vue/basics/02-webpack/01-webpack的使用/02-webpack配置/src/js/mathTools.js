function add(num1,num2)
{
  return num1 + num2;
}
function mul(num1,num2)
{
  return num1 * num2
}

//1. commonJs 模块化规范
module.exports = {
  add,
  mul
}