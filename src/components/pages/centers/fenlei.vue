<template>
    <div class="fenlei">
        <div class="title">
            <p><span>主页/</span><span>商品管理/</span><span>商品分类</span></p>
        </div>
        <el-row>
            <el-button type="primary" class="btt" @click="isShow=true">添加</el-button>
            <div class="addg" v-show="isShow">
                <span class="tuichu" @click="guan">X</span>
                <label for="gid">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID</label>
                <input type="text" id="gid" v-model="addg.gid"/><br/>
                
                <label for="astatus">商品类型</label>
                <input type="text" id="agoodsf" v-model="addg.agoodsf" @keyup.enter.native="addgoods" /><br/>
                <span @click="guan">取消</span><span @click="addgoods">确定</span>
            </div>
        </el-row>
                <el-table
            :data="tableData"
            border
            >
            <el-table-column
            fixed
           type="index"
            width="60">
            </el-table-column>
            <el-table-column
            type="index"
            label="ID"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="goodsf"
            label="分类名"
            width="400px">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button  @click="changeg(scope.row,scope.$index)" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
                <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="updateg" v-show="currshow">
            <span class="tuichu" @click="guan1">X</span>
            <label for="gid">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID</label>
            <input type="text" id="gid" v-model="addg.gid"/><br/>
            <label for="agoodsf">商品类型</label>
            <input type="text" id="agoodsf" v-model="updateg.ugoodsf"/><br/>
            <span @click="guan1">取消</span><span @click="updategoods">确定</span>
        </div>
    </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row,idx) {
        this.$axios.post("api/delete_f",{
            gid:this.tableData[idx]._id
        }).then(res=>{
            console.log(res);
        });
        this.tableData.splice(idx,1);
      },
      changeg(row,idx){
          this.currshow = true;
          console.log(this.tableData[idx]);
        this.changedate = this.tableData[idx]
      },
      updategoods(){
          this.$axios.post("api/update_f",{
              gid:this.changedate._id,
              ugoodsf:this.updateg.ugoodsf
          }).then(res=>{
              console.log(res);
              if(res.data === "商品类型修改成功"){
                  alert(res.date);
              }
              this.getData();
              this.guan1();
          });
          
      },
      onSubmit() {
        console.log('submit!');
      },
      guan(){
          this.isShow =!this.isShow;
      },
      guan1(){
           this.currshow =!this.currshow;
      },
      addgoods(){
          console.log(this.addg.adate);
          if(this.addg.agoodsf === "" || this.addg.gid===""){
              alert("输入不能为空");
              return false;
          }
          this.$axios.post("api/adds_f",{
              agoodsf:this.addg.agoodsf,
              gid:this.addg.gid,

          }).then(res=>{
              console.log(res);
              if(res.data === "成功插入数据"){
                  alert(res.date);
              }
              this.getData();
              this.guan();
          });
      },
     getData(){
          this.$axios.post("api/fenlei",{
              count:this.count,
              start:this.start
          }).then(res=>{
              // console.log(res);
               let data = res.data;
                    console.log(data);
                    this.tableData = [];
                    //设置总分页数量
                    this.totalPage = Math.ceil(data.total/data.count);
                    this.tableData.push(...data);
                    console.log(this.tableData);
          })
      },
      
    },
    created(){
          this.getData();
    },


    data() {
      return {
        tableData: [],
        count:10,
        start:0,
        page:1,
        totalPage:0,
        isShow:false,
        addg:{
            agoodsf:'',
            gid:''
        },
        currshow:false,
        updateg:{
            ugoodsf:'',
            ugoodsname:'',
            uprice:'',
            udate:'',
            ustatus:''
        },
        changedate:''
      }
    }
  }
</script>

<style scoped>
    .title{
        text-align: left;
        margin: 10px;
    }
    .fenlei{
        float: right;
        width: 70%;
        margin-right: 100px;
    }
    .el-table thead{
        text-align: center;
    }
    .btt{
        float: left;
        margin: 10px;
    }
    .addg,.updateg{
        /* display: none; */
      border: 1px solid #ccc;
      background: #fff;
      /* opacity: 0.8; */
      width: 500px;
      /* height: 380px;   */
      position: absolute;
      top:-80px;
      left: 60px;
      z-index: 99;
      padding: 30px;
    }
    .updateg{
        /* display: none; */
      border: 1px solid #ccc;
      background: fff;
      /* opacity: 0.8; */
      width: 500px;
      /* height: 380px;   */
      position: absolute;
      top:205px;
      left: 325px;
      z-index: 99;
      padding: 30px;
    }
    .addg .tuichu,.updateg .tuichu{
        position: absolute;
        top:0;
        right: 0;
        margin: 5px;
        width: 15px;
        height: 15px;
        line-height: 15px;
        padding: 5px;
    }
    .addg .tuichu:hover,.updateg .tuichu:hover{
        background: #f00;
    }
    .addg input,.updateg input{
        width: 200px;
        height: 30px;
        margin: 10px;
        border-radius:5px; 
    }
    .addg span, .updateg span{
        display:inline-block;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 20px;
        border-radius:5px; 

    }
    .addg span:last-child,.updateg span:last-child{
        background: skyblue;
        color: #fff;
    }
</style>
