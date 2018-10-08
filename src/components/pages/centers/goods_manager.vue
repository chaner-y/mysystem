<template>
    <div class="goods_manager">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formInline.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="formInline.list" placeholder="请选择分类">
                <el-option label="食品" value="食品"></el-option>
                <el-option label="日常用品" value="日常用品"></el-option>
                <el-option label="电器" value="电器"></el-option>
                <el-option label="衣服" value="衣服"></el-option>
                <el-option label="生活用品" value="生活用品"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row class="btt">
            <el-button type="primary" @click="delGroup">删除</el-button>
            <el-button type="primary" @click="isShow=true">添加</el-button>
            <div class="addg" v-show="isShow">
                <span class="tuichu" @click="guan">X</span>
                <label for="agoodsf">商品类型</label>
                <input type="text" id="agoodsf" v-model="addg.agoodsf"/><br/>
                <label for="agoodsname">商品名称</label>
                <input type="text" id="agoodsname" v-model="addg.agoodsname"/><br/>
                <label for="aprice">商品价格</label>
                <input type="text" id="aprice" v-model="addg.aprice"/><br/>
                <label for="date">上存时间</label>
                <input type="text" id="date" v-model="addg.adate"/><br/>
                <label for="astatus">商品状态</label>
                <input type="text" id="astatus" v-model="addg.astatus" @keyup.enter.native="addgoods" /><br/>
                <span @click="guan">取消</span><span @click="addgoods">确定</span>
            </div>            
        </el-row>
        <el-table
            :data="tableData"
            border
            @row-click="handleCurrentChange" @selection-change="selsChange" ref="table"
            >
            <el-table-column
            fixed
            type="selection"
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
            label="商品分类"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="goodsname"
            label="商品名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="date"
            label="上存时间"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="status"
            label="发布状态"
            width="120">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button @click="changeg(scope.row,scope.$index)" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>            
                <el-button @click="handleClick(scope.$index)" type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
            </template>
                
            </el-table-column>
           
        </el-table>
         <div class="updateg" v-show="currshow">
            <span class="tuichu" @click="guan1">X</span>
            <label for="agoodsf">商品类型</label>
            <input type="text" id="agoodsf" v-model="updateg.ugoodsf"/><br/>
            <label for="agoodsname">商品名称</label>
            <input type="text" id="agoodsname" v-model="updateg.ugoodsname"/><br/>
            <label for="aprice">商品价格</label>
            <input type="text" id="aprice" v-model="updateg.uprice"/><br/>
            <label for="date">上存时间</label>
            <input type="text" id="date" v-model="updateg.udate"/><br/>
            <label for="astatus">商品状态</label>
            <input type="text" id="astatus" v-model="updateg.ustatus" @keyup.enter.native="updategoods" /><br/>
            <span @click="guan1">取消</span><span @click="updategoods">确定</span>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total=this.qtotal>
        </el-pagination>
    </div>
    
</template>

<script>
  export default {
     data() {
      return {
        isShow:false,
        currshow:false,
        sels: [],//选中的值显示
        addg:{
            agoodsf:'',
            agoodsname:'',
            aprice:'',
            adate:'',
            astatus:''
        },
        updateg:{
            ugoodsf:'',
            ugoodsname:'',
            uprice:'',
            udate:'',
            ustatus:''
        },
        tableData: [],
        count:5,
        start:0,
        page:1,
        totalPage:0,
        formInline: {
          name: '',
          list: ''
        },
        changedate:'',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        qtotal:''
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(idx) {
        console.log(this.tableData[idx]._id);
        
        this.$axios.post("api/delete_l",{
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
          this.$axios.post("api/update_l",{
              gid:this.changedate._id,
              ugoodsf:this.updateg.ugoodsf,
              ugoodsname:this.updateg.ugoodsname,
              uprice:this.updateg.uprice,
              udate:this.updateg.udate,
              ustatus:this.updateg.ustatus,
          }).then(res=>{
              console.log(res);
              if(res.data === "商品修改成功"){
                  alert(res.date);
              }
              this.getData();
              this.guan1();
          });
          
      },
      selsChange(sels) { 
        this.sels = sels 
        }, 
        delGroup() { 
            let goodsid = [];
        this.sels.forEach(item=>{
            console.log(item._id);
            this.$axios.post("api/delete_l",{
            gid:item._id
            }).then(res=>{
                console.log(res);
                this.getData();

            });
        })
        }, 
        handleCurrentChange(row, event, column) { 
        this.$refs.table.toggleRowSelection(row) 
        } ,
      onSubmit() {
        //   console.log(this.formInline.name,this.formInline.list);
        // console.log('submit!');
        this.$axios.post("api/searchg",{
            goodsname:this.formInline.name,
            goodsf:this.formInline.list
        }).then(res=>{
            console.log(res);
            let data = res.data;
            this.tableData = [];
            this.tableData.push(...data);
            console.log(this.tableData);
        });
      },
      guan(){
          this.isShow =!this.isShow;
      },
      guan1(){
           this.currshow =!this.currshow;
      },
      submitForm(){
           this.$refs[formName].validate((valid) => {
            if (valid) {

             } else {
                console.log('error submit!!');
                return false;
            }
            });
      },
      addgoods(){
          console.log(this.addg.adate);
          if(this.addg.agoodsf === "" || this.addg.agoodsname ==="" || this.addg.aprice ==="" || this.addg.adate ==="" || this.addg.astatus ===""){
              alert("输入不能为空");
              return false;
          }
          this.$axios.post("api/adds_l",{
              agoodsf:this.addg.agoodsf,
              agoodsname:this.addg.agoodsname,
              aprice:this.addg.aprice,
              adate:this.addg.adate,
              astatus:this.addg.astatus,
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
        this.$axios.post("api/goods_manager",{
            count:this.count,
            start:this.start
            }).then(res=>{
                console.log("result:",res.data.data);
                let data = res.data.data;
                this.tableData = [];
                //设置总分页数量
                this.qtotal = res.data.total;
                this.totalPage = Math.ceil(res.data.total*1/this.count);
                this.tableData.push(...data);
                console.log(this.tableData);
                console.log("total:",this.totalPage);

            })
        },
      
    },
    created(){
          this.getData();
    },

  }
</script>

<style scoped>
    .goods_manager{
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
        background:#0ff;
        color: #fff;
    }
</style>
