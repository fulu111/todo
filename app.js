// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
const bodyParser = require('body-parser');
//
// const formidable = require('formidable');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todo', {useNewUrlParser: true })

const fs = require('fs');
// 创建web服务器
const app = express();

// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 实现文件上传的路由
app.post('/upload', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	// 设置客户端上传文件的存储路径
	form.uploadDir = path.join(__dirname, 'public', 'uploads');
	// 保留上传文件的后缀名字
	form.keepExtensions = true;
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		// 将客户端传递过来的文件地址响应到客户端
		res.send({
			path: files.attrName.path.split('public')[1]
		}
		// 'ok'
		);
	});
});

//01-
app.post('/formData',(req,res)=>{
	//创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	//解析客户端传递过来的FormData对象
	form.parse(req,(err,fields,files)=>{
		res.send(fields);
	});
});

//01-$
app.post('/getData',(req,res)=>{
	res.send(req.body);
})


// 导入todo路由案例
const todoRouter = require('./route/todo')
// 当客户端的请求路径以/todo开头时
app.use('/todo', todoRouter);

// 获取用户列表信息
app.get('/users', (req, res) => {
	res.send('当前是获取用户列表信息的路由');
});

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在获取id为${id}用户信息`);
});

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在删除id为${id}用户信息`);
});

// 修改某一个用户的信息
app.put('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在修改id为${id}用户信息`);
});

app.get('/xml', (req, res) => {
	res.header('content-type', 'text/xml');
	res.send('<message><title>消息标题</title><content>消息内容</content></message>')
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');