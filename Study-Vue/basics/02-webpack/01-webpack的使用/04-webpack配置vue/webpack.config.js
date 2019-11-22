const path = require('path');
//利用commonJs导出一个对象，即webpack的配置文件
module.exports = {
  entry: path.join(__dirname,'src/main.js'),
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'//该配置是将凡是需要打包到dist中的url文件，给其访问路径自动加上'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当图片的大小小于limit时，会将图片编译成base64字符串形式
              //当图片的大小大于limit时，需要使用file-loader进行加载
              //file-loader只需要进行安装就行，不用进行配置
              limit: 4000,
              //将打包后的文件重新命名，并赋予8位的哈希值使其唯一
              //使用name的属性值替换掉应用图片处url里面的值
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    // vue 发布的时候有什很多版本，默认的是运行 runtime-only版本
    // 该版本只运行不编译，因此代码中不能包含template，否侧报错，
    // 此时我们就需要改变默认运行的vue版本为 runtime-compiler
    //该版本运行且编译，即代码中可以有template（vue实例）
    //alias: 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js','.vue','.css']
    }
}
