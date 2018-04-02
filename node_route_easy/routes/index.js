var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
  res.render('index', { title: 'Express' });
});
router.route('/register').get(function(req, res) {
	//alert('get');
  res.render('register', { title: '注册' });
}).post(function(req, res) {
	var username=req.body.name;
	var psw=req.body.psw;
	var User=global.database;
	User.findOne({name:username},function(err,result){

		if(err){
			res.send(500);
			console.log(err);
		}
		else if(result){
			req.session.error='用户名存在，不可以创建';
			res.send(500);
		}
		else{
			User.create({
				name:username,
				password:psw
			},function(err,doc){
				if(err){res.send(500);
					console.log(err);
				}
				else{
					req.session.error='创建成功';
					res.send(200);
				}
			})
		}
	});
	
});

router.route('/login').get(function(req, res) {
	//alert('get');
  res.render('login', { title: '登录' });
}).post(function(req, res) {
	var username=req.body.name;
	var psw=req.body.psw;
	var User=global.database;
	User.findOne({name:username},function(err,result){

		if(err){
			res.send(500);
			console.log(err);
		}
		else if(!result){
			req.session.error='用户名不存在';
			res.send(404);
		}
		else{
			if(psw!=result.password){
				req.session.error='密码错误';
				res.send(404);
			}
			else{
				req.session.user=result;
				res.send(200);
			}
		}
	});
});

router.route('/home').get(function(req, res) {
	console.log(req.session.user);
  if(!req.session.user){
  	req.session.error = "请先登录"
  	res.redirect("/login");	
  	}

  	res.render('home', { title: '你的博客' });
});
router.route('/logout').get(function(req, res) {

  	req.session.user=null;
  	req.session.error = null;
  	res.redirect("/");	
  
});

module.exports = router;
