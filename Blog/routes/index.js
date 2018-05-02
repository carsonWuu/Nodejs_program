var express = require('express');
var router = express.Router();
var superagent=require('superagent');
var cheerio=require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
	superagent.get('https://cnodejs.org/').end(function(err,data){
	  if(err)console.log(err);
	  var $=cheerio.load(data.text);
	  var item=[];
	  var i=0;
	  $('.cell .topic_title').each(function(index,element){
		  var $element=$(element);
		  item.push({
			  i:i++,
			  title: $element.attr('title'),
			  href: $element.attr('href')
		  });
	  });
	  //console.log('爬到的数量：'+item.length);
	  res.set('Content-Type', 'text/html');
	  res.render('index', { title: 'Blog',pachong:item });
	});
});

router.get('/content', function(req, res, next) {
 var name=req.query.name;
 res.send(name);
});
router.post('/submit', function(req, res, next) {
	console.log(req.body);
 var name=req.body.title;
 res.send('/');
});

module.exports = router;
