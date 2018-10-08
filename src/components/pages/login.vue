<template>
    <div class="login">
        <img :src="imgurl"/>
        <h3>{{title}}</h3>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户" prop="user">
                <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
            </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button id="btn" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
            <div class=" checkbox">
            <label for="u34_input">
            <!-- Unnamed () -->
            <div id="u35" class="text" style="visibility: visible;">
                <p><span>记住密码</span></p>
            </div>
            </label>
            <input id="u34_input" type="checkbox" value="checkbox">
            </div>
            <div class=" link_button">
                <div id="u36_div" class=""></div>
                <!-- Unnamed () -->
                <div id="u37" class="text" style="visibility: visible;">
                <p><span>忘记密码？</span></p>
                </div>
            </div>
        </el-form>
    </div>
    
</template>

<script>
    export default {
         data() {

             var username = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('用户名不能为空'));
                } 
                callback();
                
            };
             var password = (rule,value,callback)=>{
                  if (value === '') {
                callback(new Error('请输入密码'));
                } 
                callback();
    
             }
             return {
                 ruleForm2:{
                     user:'admin',
                     pass:'123456'
                 },
                 rules2:{
                     user:[
                         {validator:username,trigger:'blur'}
                     ],
                     pass:[
                         {validator:password,trigger:'blur'}
                     ]
                 },
                imgurl:'../../../static/images/touxiang.jpg',
                title:'嘉丽购后台管理系统'
             }
         },
        methods: {
           submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.post("api/login",{
                        username:this.ruleForm2.user,
                        password:this.ruleForm2.pass
                    }).then(x=>{
                    console.log(x);
                    if(x.data === '登录失败'){
                        alert("登录失败，请检查您的用户名和密码是否有误");
                        
                        return false;
                    }else{
                        sessionStorage.setItem("username", x.data.username);
                        sessionStorage.setItem("password", x.data.password);
                        sessionStorage.setItem("id", x.data._id);
                        sessionStorage.setItem("token", "10086");
                        alert("登录成功，正在跳转。。。");
                        this.$router.push({name:"center"});
                        
                    }
                    
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .login{
       width: 440px;
       padding: 55px 75px 40px 20px;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
       border: 1px solid #ccc;
       box-shadow: 0 1px 5px rgba(0,0,0,.25);
    }
    .login #btn{
        width: 335px;
    }
    .login img{
        width: 100px;
        height: 100px;
        margin: 5px 0 5px 85px;
    }
    .login h3{
        margin-left:80px; 
    }
    .checkbox{
        float: left;
        overflow: hidden;
        position: relative;
        margin-left: 50px;
    }
    .checkbox input{
        float: left;
    }
    .checkbox label{
        float: right;
    }
    .checkbox label p,.link_button p{
        margin: 0 ;
    }
    .link_button{
        float: right;
    }
</style>

