<template>
    <div class="box">
        <el-row :id="tab.id" v-for="(tab,idx) in tabs" :key="idx" class="Abtn" @click.native="goto(tab.id)">
            <el-button type="info" plain>{{tab.title}}</el-button>
        </el-row>
    </div>
    
</template>

<script>
import login from '@/components/pages/login'
import center from '@/components/pages/center'

export default {
  data(){
    return {
      tabs:[
        {
          title:'登录',
          id:'login'
        },
        {
          title:'管理系统中心',
          id:'center'
        }
      ]
    }
  },
  components:{
    login,
    center
  },
  methods:{
    goto(id){
      this.$router.push({name:id});
    }
  }
}
</script>

<style scoped>
.box{
    overflow: hidden;
}
    .Abtn{
        float: left;
        margin: 10px;
        }
</style>

