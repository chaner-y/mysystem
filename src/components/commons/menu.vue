<template>
    <div class="mymenu">
        <el-row class="tac">
                <el-col :span="12">
                    <h5>管理系统中心</h5>
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" @click="goto2">商品分类</el-menu-item>
                                <el-menu-item index="1-2" @click="goto1">商品列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="goto3">修改密码</el-menu-item>
                                <el-menu-item index="2-2" @click="goto4">资料修改</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>交易管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">订单列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "mymenu",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goto1() {
      this.$router.push({ name: "goods_manager" });
    },
    goto2() {
      this.$router.push({ name: "fenlei" });
    },
    goto3() {
      this.$router.push({ name: "xgmm" });
    },
    goto4() {
      this.$router.push({ name: "zlxg" });
    }
  }
};
</script>


<style scoped>
.mymenu{
    float: left;
}
.el-col-12 {
  width: 250px;
  border: 1px solid #ddd;
  margin-left: 8px;
}
</style>

