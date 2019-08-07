//这个文件主要目的就是封装一个ajax函数  使用这个函数帮我们发送请求还有接收服务器想赢回来的数据
//这个函数的主要作用是将一个对象转换为字符串
//这个参数要求是一个对象
function objToString(obj) {
    //如果这个参数有并且参数是object
    if(obj && typeof obj == 'object') {
        //因为传递过来的是一个对象，需要遍历这个对象
        //把这个对象转换为k=v&k=v
        let str = ``;
        for(let key in obj) {
            str += key + '=' + obj[key]+'&';
        }
        return str.substr(0,str.length-1);
    }
}

//options是一个对象
function ajax(options){
    //接收函数的实参   请求的类型
    let type = options.type || 'get';
    let url = options.url;
    let data = objToString(options.data) ||'';
    let dataType = options.dataType || 'json';

    //创建异步对象
    let xhr = new XMLHttpRequest();
    //因为参数的拼接与请求方式有直接的关系
    if(type == 'get') {
        //设置请求方式与请求的路由地址
        xhr.open(type,url + '?' + data);
        //发送请求
        xhr.send();
    } else if (type == 'post') {
        xhr.open(type,url);
        //获取传递过来的参数格式是什么
        let contentType = options.header['Content-Type'];
        // 设置请求头
        //判断contentType这个变量的值是什么
        xhr.setRequestHeader('Content-Type',contentType)
        if(contentType == 'application/json') {
            //发送请求
            xhr.send(JSON.stringify(options.data));
        } else {
            //发送请求
            xhr.send(data);
        }
    }
    //接收服务器响应回来的数据
    xhr.onload=function(){
        let data = ``;
        //只需要判断一下dataType属性的值就可以了
        if(dataType =='json') {
            //将json字符串转换为json对象
            data = JSON.parse(xhr.responseText);
        } else if(dataType =='string') {
            data = xhr.responseText;
        }
        //当http状态码为200的时候
        if(xhr.status == 200) {
            //请求成功 调用处理成功情况的函数
            options.success && options.success(data,xhr);
        } else {
            //请求失败  调用处理失败情况的函数
            options.error&& options.error(data,xhr)
        }
    }
}
















// 调用函数  我们在发送ajax的时候 需要将参数传递给我们的服务器

// ajax({
//     type: 'post', // 请求的类型
//     url: 'http://127.0.0.1:3000/first',
//     data: {
//         uname: '张三',
//         age: 18
//     },
//     // 告诉服务器 在发送post请求时 参数的格式类型
//     header: {
//         'Content-Type': 'application/json'
//     },
//     // jquery里面有一个ajax函数  dataType 这个属性的作用就是用于规定服务器向客户端响应回来的数据格式 
//     dataType: 'json',
//     success:function(){

//     }
// });