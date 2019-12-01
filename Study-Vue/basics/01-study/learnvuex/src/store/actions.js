export default {
  // aupdateInfo(context,paras){
  //   setTimeout(() => {  
  //     context.commit('updateInfo');
  //     console.log(paras.payload);
  //     paras.success();
  //   },1000)
  // }

  aupdateInfo(context,payload){
    return new Promise((resolve,reject) => {
      setTimeout(() => {  
            context.commit('updateInfo');
            console.log(payload);
            resolve('success!');
          },1000)
    })
  }
}