function jsonp(options){
    //动态添加script标签
    let script = document.createElement('script');
    //拼接字符串的变量
    let params = ``;
    for (let key in options.data) {
        params += '&' + key + '=' + options.data[key];
    }
    let fnName = 'myJson' + Math.random().toString().replace('.','');
    // let fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    //变为全局函数
    window[fnName] = options.success;
    //为script标签添加src属性
    script.src = options.url + '?callback='+fnName+params;
    //将script标签添加到页面中
    document.body.appendChild(script);
    //为script标签添加onload事件
    script.onload = function(){
        //将页面中的script标签清除掉
        document.body.removeChild(script);
    }
}




// jsonp({
//     url:'http://127.0.0.1:4000/better',
//     data:{
//         name:'zs',
//         age:20
//     },
//     success:function(data){
//         console.log(data)
//     }
// })