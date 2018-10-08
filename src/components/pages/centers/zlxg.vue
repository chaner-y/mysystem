<template>
    <div class="change-info">
        <div class="title">
            <h4>设置我的资料</h4>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="我的角色">
                <el-select v-model="form.region" placeholder="请选择您的角色">
                <el-option label="超级管理员" value="super"></el-option>
                <el-option label="普通管理员" value="common"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="上传头像">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>
                <el-button>重新填写</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name : 'ChangeInfo',
        data() {
      return {
        form: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          phone:'',
          email:'',
          nickname:'',
          imageUrl: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form.region);
        this.$axios.post("api/zlxg",{
            username:this.form.name,
            myname:sessionStorage.getItem("username"),
            actor:this.form.region,
            nickname:this.form.nickname,
            gender:this.form.resource,
            phone:this.form.phone,
            email:this.form.email,
            beizhu:this.form.desc
        }).then(res=>{
            // if(res.data === "资料修改成功"){
                
            // }
            alert(res.data);
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style lang="scss" scoped>
    .change-info{
        float: right;
        width: 50%;
        text-align: left;
        padding-right: 340px;
    }
    .title{
        padding: 10px;
    }
    .avatar-uploader{
    width: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>