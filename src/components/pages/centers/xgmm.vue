<template>
    <div class="xgmm">
        <div class="title">
            <p>{{title}}</p>
        </div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="当前密码" prop="Ppass">
                <el-input type="password" v-model="ruleForm2.Ppass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="Npass">
                <el-input type="password" v-model="ruleForm2.Npass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
             data(){
                var dpass = (rule, value, callback) => {
                    if (value === '') {
                    callback(new Error('当前密码不能为空'));
                    } 
                    callback();
                    
                };
                var xpass = (rule,value,callback)=>{
                    if (value === '') {
                    callback(new Error('请输入新密码'));
                    } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                    }
                };
                var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                    callback(new Error('请再次输入密码'));
                    } else if (value !== this.ruleForm2.Npass) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                };
                return {
                    ruleForm2:{
                        Ppass:'',
                        Npass:'',
                        checkPass:''
                    },
                    rules2:{
                        Ppass:[
                            {validator:dpass,trigger:'blur'}
                        ],
                        Npass:[
                            {validator:xpass,trigger:'blur'}
                        ],
                        checkPass:[
                            {validator:validatePass2,trigger:'blur'}
                        ]
                    },
                    title:'修改密码'
                }
            },
            methods:{
                close(){
                    sessionStorage.clear();
                    this.$router.push({name:"login"});
                },
                submitForm(formName) {
                     this.$refs[formName].validate((valid) => {
                         if(valid){
                             if(this.ruleForm2.Npass === this.ruleForm2.checkPass){
                                this.$axios.post("api/xgmm",{
                                    username:sessionStorage.getItem("username"),
                                    currpass:this.ruleForm2.Ppass,
                                    newpass:this.ruleForm2.Npass,
                                    renewpass:this.ruleForm2.checkPass
                              }).then(res=>{
                                  console.log(res);
                                  if(res.data=='密码修改成功'){
                                      alert('密码修改成功');
                                      this.close();

                                  }else{
                                      alert('当前密码错误');
                                      return false;
                                  }
                              });
                             }else{
                                 alert("两次输入的密码不一致");
                             }
                              
                         }else {
                            console.log('error submit!!');
                            return false;
                        }
                     });
                },
            }
    }
</script>
<style scoped>
    .xgmm{
        float: right;
        width: 50%;
        text-align: left;
        padding-right: 340px;
    }
    .title{
        padding: 10px;
    }
</style>
