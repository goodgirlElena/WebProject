import axios from 'axios';

//封装axios发送请求方式一
export function request(config){
  // 1、创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });
  // 2、axios的拦截器
  // 2.1、请求拦截的作用
  instance.interceptors.request.use(config => {
    console.log(config);
    //此处需要处理什么样的代码？
      // 1、 当config中的一些信息不符合服务器的要求
      // 2、 当每次发送请求时，都希望在界面显示一个小图标
      // 3、 某些网络请求（比如登录(token))，必须携带一些特殊信息
    return config;
  }, err =>{
    console.log(err);
  })
  // 2.2、响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  },err =>{
    console.log(err);
  })

  // 3、 发送真正的网络请求
  return instance(config);
}

//封装axios发送请求方式二
// export function request(config){
//   return new Promise((resolve,reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     });
//     instance(config).then(res => {
//       resolve(res);
//     }).catch(err => {
//       reject(err);
//     })
//   })
// }

//封装axios发送请求方式三
// export function request(config,success,failure){
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     });
//     instance(config).then(res => {
//       success(res);
//     }).catch(err => {
//       failure(err);
//     })
// }

//封装axios发送请求方式四
// export function request(config){
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   });
//   instance(config.baseConfig).then(res => {
//     config.success(res);
//   }).catch(err => {
//     config.failure(err);
//   })
// }