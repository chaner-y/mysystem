<template>
    <div class="box">
        <div class="header">
            <div class="fl">
                <img src="../../../static/images/touxiang.jpg"/>
                <h2>嘉丽购后台管理系统</h2>
            </div>
            <div class="fr">
                <p>欢迎<strong>{{username}}</strong>，登录我们的嘉丽购系统，在这你可以为所欲为<span @click="close">退出</span></p>
            </div>
        </div>
        <mymenu></mymenu>
        <router-view/>
    </div>

</template>

<script>
    import mymenu from '@/components/commons/menu'
    import goods_manager from '@/components/pages/centers/goods_manager'
    import fenlei from '@/components/pages/centers/fenlei'
    import xgmm from '@/components/pages/centers/xgmm'
    import zlxg from '@/components/pages/centers/zlxg'

  export default {
      data(){
          return {
              username:sessionStorage.getItem("username"),
          }
      },
    components:{
        mymenu,
        goods_manager,
        fenlei,
        xgmm,
        zlxg
    },
    methods:{
        close(){
            sessionStorage.clear();
            this.$router.push({name:'login'});
        }
    }
  }
</script>

<style scoped>
    .header{
        margin: 8px;
        overflow: hidden;
        border: 1px solid #ddd;
    }
    .fl{
        float: left;
        overflow: hidden;
    }
    .fr{
        float: right;
        margin-top:55px;
    }
    .fl img{
        float: left;
        margin: 5px;
        height: 100px;
        width: 100px;
    }
    .fl h2{
        float: left;
        height: 90px;
        line-height: 90px;
        margin: 10px;
    }
    .fr p{
        margin: 10px
    }
    .fr p span{
        margin: 20px;
        color: blue;
    }
</style>
