var mongoose=require('mongoose');
var db=mongoose.createConnection('mongodb://127.0.0.1:27017/nodedb');
db.on('error',function(error){
	console.log(error);
});

var mongooseSchema=new mongoose.Schema({
	username:{type:String},
	title:{type:String},
	content:{type:String}
});
var mongooseModel=db.model('blogs',mongooseSchema);

// var doc = {name : 'user1', password : 'psw1'};
// mongooseModel.create(doc, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
//     // 关闭数据库链接
//     db.close();
// });
module.exports=mongooseModel;