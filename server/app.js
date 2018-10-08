var express = require("express");
var app = express();
var fs = require("fs");
app.use(express.static('./public'));
var session = require("express-session");
app.use(session({"secret":"wy"}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
var querystring = require("querystring"); 
app.use(bodyParser.json());

var conn = require("./modules/conn.js");

app.all("*",function(req,res,next){
    //允许别人请求我的接口
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    
    // res.setHeader("Content-Type","text/html;charset=utf-8");
    // res.setHeader("Access-Control-Allow-Credentials","true");
    // res.setHeader("Access-Control-Allow-Origin","http://10.3.137.10:8081");
    next();
})

//用户登录
app.post("/login",function(req,res){

    var strname = req.body.username;
    var strpass = req.body.password;

    conn(function(database){
        var db = database.db("mysystem");
        //查询用户名及密码是否正确
        var where = {username:strname,password:strpass};
        db.collection("userlist").find(where).toArray((err,result)=>{
            if(result.length == 0){
                res.end('登录失败');
            }else{
                //该账号的所有信息，都返回
                console.log(result[0]);
                res.end(JSON.stringify(result[0]));
            }
        }) ;
    });
});
//修改密码
app.post("/xgmm",function(req,res){
    console.log(req.body);
    var strname = req.body.username
    var currpass = req.body.currpass;
    var newpass = req.body.newpass;
    var renewpass = req.body.renewpass;
    conn(function(database){
        var db = database.db("mysystem");
        //查询当前输入密码正不正确
        var where = {username:strname,password:currpass};
        db.collection("userlist").find(where).toArray((err,result)=>{
            if(result.length == 0){
                res.end('当前密码不正确');
            }else{
            
                //修改信息
                var updateObj = {$set:{"password":newpass}};
                db.collection("userlist").updateOne(where,updateObj,(err,result)=>{
                    res.end("密码修改成功");
                })
            }
        })
    })
})

//请求数据分类
app.post("/fenlei",function(req,res){
    conn(function(database){
        var db = database.db("mysystem");
        db.collection("goods_fenlei").find().toArray((err,result)=>{
             //该账号的所有信息，都返回
             console.log(result);
             res.end(JSON.stringify(result));
        })
    });
})
//请求商品数据列表
app.post("/goods_manager",function(req,res){
    let count = req.body.count;
    let start = req.body.start;
    console.log(count,start)
    conn(function(database){
        var db = database.db("mysystem");
        // .skip(start).limit(count)
        db.collection("goodslist").find().toArray((err,result)=>{
             //该账号的所有信息，都返回
             let total = result.length;
            //  console.log(result);
            //  console.log(total);
             result = {
                 total:total,
                 data:result
             }
             res.end(JSON.stringify(result));
        })
    });
});
//添加商品数据
app.post("/adds_l",function(req,res){
    console.log(req.body.adate);
    var goodsf = req.body.agoodsf;
    var goodsname = req.body.agoodsname;
    var price = req.body.aprice;
    var date = req.body.adate;
    var status = req.body.astatus;
    conn(function(database){
        var db = database.db("mysystem");
        var myobj = {
            "goodsf":goodsf,
            "goodsname":goodsname,
            "price":price,
            "date":date,
            "status":status
        }
        db.collection("goodslist").insertOne(myobj,(err,result)=>{
            console.log(result);
             res.end("成功插入商品");
        })
    });
});
//添加商品类型
app.post("/adds_f",function(req,res){
    console.log(req.body.adate);
    var goodsf = req.body.agoodsf;
    var gid = req.body.gid;
    conn(function(database){
        var db = database.db("mysystem");
        var myobj = {
            "goodsf":goodsf,
            "gid":gid
        }
        db.collection("goods_fenlei").insertOne(myobj,(err,result)=>{
            console.log(result);
             res.end("成功插入商品类型");
        })
    });
});
//按要求查询
app.post("/searchg",function(req,res){
    var goodsname = req.body.goodsname;
    var goodsf = req.body.goodsf;
    conn(function(database){
        var db = database.db("mysystem");
        var where = {goodsname:goodsname,goodsf:goodsf};
        db.collection("goodslist").find(where).toArray((err,result)=>{
                console.log("查找成功");
                res.end(JSON.stringify(result));
      
        })
    })
})
//修改商品数据
app.post("/update_l",function(req,res){
    console.log(req.body);
    var gid = req.body.gid
    var goodsname = req.body.ugoodsname;
    var goodsf = req.body.ugoodsf;
    var price = req.body.uprice;
    var date = req.body.udate;
    var status = req.body.ustatus;
    conn(function(database,ObjectID){
        var db = database.db("mysystem");
        //查询当前输入密码正不正确
        var where = {_id:ObjectID(gid)};
        db.collection("goodslist").find(where).toArray((err,result)=>{
            if(result.length == 0){
                res.end('没有找到对应数据');
            }else{
                //修改数据
                var updateObj = {$set:{"goodsname":goodsname,"goodsf":goodsf,"price":price,"date":date,"status":status}};
                db.collection("goodslist").update(where,updateObj,(err,result)=>{
                    res.end("商品修改成功");
                })
            }
        })
    })
});
//修改商品类型
app.post("/update_f",function(req,res){
    console.log(req.body);
    var gid = req.body.gid
    var goodsf = req.body.ugoodsf;
    conn(function(database,ObjectID){
        var db = database.db("mysystem");
        //查询当前输入密码正不正确
        var where = {_id:ObjectID(gid)};
        db.collection("goods_fenlei").find(where).toArray((err,result)=>{
            if(result.length == 0){
                res.end('没有找到对应数据');
            }else{
                //修改数据
                var updateObj = {$set:{"goodsf":goodsf}};
                db.collection("goods_fenlei").update(where,updateObj,(err,result)=>{
                    res.end("商品修改成功");
                })
            }
        })
    })
});
//删除商品列表数据
app.post("/delete_l",function(req,res){
    console.log(req.body.gid);
    var gid = req.body.gid;
    conn(function(database,ObjectID){
        var db = database.db("mysystem");
        var where = {_id:ObjectID(gid)};
        db.collection("goodslist").deleteOne(where, (err, result)=>{
            res.end("删除成功");
        });
    })
});
//删除商品列表
app.post("/delete_f",function(req,res){
    console.log(req.body.gid);
    var gid = req.body.gid;
    conn(function(database,ObjectID){
        var db = database.db("mysystem");
        var where = {_id:ObjectID(gid)};
        db.collection("goods_fenlei").deleteOne(where, (err, result)=>{
            res.end("删除成功");
        });
    })
});
//资料修改
app.post("/zlxg",function(req,res){
    console.log(req.body);
    var myname = req.body.myname;
    var username = req.body.username;
    var actor = req.body.actor;
    var nickname = req.body.nickname;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var email = req.body.email;
    var beizhu = req.body.beizhu;
    conn(function(database){
        var db = database.db("mysystem");
        var where = {username:myname};
        db.collection("userlist").find(where).toArray((err,result)=>{
            if(result.length === 0){
                res.end("找不到该用户");
            }else{
                var updateObj = {$set:{"username":username,"actor":actor,"nickname":nickname,"gender":gender,"phone":phone,"email":email,"beizhu":beizhu}}
                db.collection("userlist").update(where,updateObj,(err,result)=>{
                    res.end("资料修改成功");
                })
            }
        })
    })
})
//数据库初始化代码
app.get("/dbinit",function(req,res){
    conn(function(database){
        //创建数据库
        // var db = database.db("mysystem");
        // // //插入测试的数据
        // var myobj = {
        //     "username":"admin",
        //     "password":encode("123456"),
        //     "regtime":new Date(),
        //     "logintime":new Date(),
        //     "loginip":req.ip.substring(7)
        // }
        // db.collection("userlist").insertOne(myobj,(err,result)=>{
        //     console.log(result);
        // });
         //删除所有
        // var whereObj = {}
        // db.collection("userlist").deleteMany(whereObj, (err, result)=>{})
    });
    res.end("成功")
});
app.listen(8082);