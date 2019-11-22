const path = require('path');
//利用commonJs导出一个对象，即webpack的配置文件
module.exports = {
  entry: path.join(__dirname,'src/main.js'),
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  }
}
