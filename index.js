var  express=require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');

var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'crud_sandeep',
	port:'3307'
});


conn.connect(function(err){
	if(err) throw err;
	console.log('connection success');
})


app.get('/insert',function(req,res)
{
	res.render('insert');
})

app.post('/insert',function(req,res){
	var name=req.body.name;
	var email=req.body.email;

	var sql=`insert into users(name, email) values ('${name}','${email}') `;
	conn.query(sql,function(err,result){
		if (err) throw err;

		res.redirect('/');

	})
})
app.get('/',function(req,res) {
	var sql=`select * from users order by id desc`;
	conn.query(sql,function(err,result){
		if(err) throw err;
		res.render('show',{users:result});
	})
	
})

app.get('/delete/:id',function(req,res){
	var id=req.params.id;
	var sql=`delete from users where id='${id}'`;
	conn.query(sql,function(err,result){
		if(err) throw err;
		res.redirect('/');
	})
})


app.get('/edit/:id',function(req,res){
	var id=req.params.id;
	var sql=`select * from users where id='${id}'`;

	conn.query(sql,function(err,result){
		if(err) throw err;
		res.render('edit',{users:result});
	})
	//	res.render('edit');

})

app.post('/update/:id',function(req,res){
	var name=req.body.name;
	var email=req.body.email;

	var id=req.params.id;
	var sql=`update users set name='${name}',email='${email}' where id='${id}'`;
	conn.query(sql,function(err,result) {
		if(err) throw err;
		res.redirect('/');
	})
})

var server=app.listen(4000,function(){
	console.log("App is running at 4000 port ");
})