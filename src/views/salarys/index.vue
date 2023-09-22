<template>
  <div>
    <el-card style="margin:20px">


       <div class="box">
        <span>聘用形式:</span>
        <template>
            <el-radio v-model="radio" label="1">正式</el-radio>
            <el-radio v-model="radio" label="2">非正式</el-radio>
        </template>
       </div>

       
       <div class="box">
        <span>員工狀態:</span>
        <template>
            <el-radio v-model="radio1" label="1">在职</el-radio>
            <el-radio v-model="radio1" label="2">离职</el-radio>
        </template>
       </div>
       <div class="content">
        <template >
            <span>部门:</span>
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-for="(val) in checkboxList" :key="val.id"  v-model="val.isChecked">{{ val.name }}</el-checkbox>
        </template>
       </div>



    </el-card>
    <el-card style="margin:20px">
        <template>
            <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机"
                width="250">
            </el-table-column>
            <el-table-column
                prop="workNumber"
                label="工号">
            </el-table-column>
            <el-table-column
                
                label="聘用形式"
                width="80">
                <template>
                    <span>未知</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="departmentName"
                label="部门"
                width="180">
            </el-table-column>
            <el-table-column
                prop="timeOfEntry"
                label="入职时间"
                width="120">
            </el-table-column>
            <el-table-column
               
                label="工资基数"
                width="250">
                <template>
                    <span>2000</span>
                </template>
            </el-table-column>
            <el-table-column
            width="120"
                style="margin-right: 0;"
                
                label="津贴方案">
                <template>
                    <span>通用方案</span>
                </template>
            </el-table-column>
            </el-table>
        </template>

        <div class="footer">
            <el-pagination
                
                background
                layout="prev, pager, next"
                :page-size="page.pagesize"
                :current-page="page.page"
                :total="page.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>

    </el-card>
  </div>
</template>

<script>
import { getSalarys , getDepartment , getDepartmentData} from '@/api/salarys'
export default {
    mounted(){
         this.getDepartmentList()
        this.getSalarysList()
        
        
        // this.changeIsCheck()
    },
    created(){
       

    },
        data(){
            return {
                checked1:false,
                checked2:false,
                checked3:false,
                checked4:false,
                page:{
                    page:1,
                    pagesize:10,
                    total:0,
                   
                    
                    
                },
                checkboxList:[],
                tableData: [],
                loading:true,
                radio:'1',
                radio1:'1',
                newTableData:[],

            }
        },
        watch:{

            checkboxList:{
                deep:true,
                immediate: false,
                async handler(newName){
                    this.newTableData = []
                    // console.log(newName);
                    // let num = {}
                    // this.tableData = []
                    // this.checkboxList = []
                    // this.getDepartmentList()
                    // this.getSalarysList()
                    for (const val of newName){
                        if(val.isChecked){
                        // console.log(val);
                        // console.log(123);
                        this.page.departmentId = val.id
                        
                        // console.log(this.page);
                        const res = await getDepartmentData(this.page)
                       if(res.success){
                            this.page.total = res.data.total
                            // console.log(res,'res');
                            // console.log(666);
                            // this.tableData = res.data.rows
                            // num = {...res.data.rows}
                            // console.log(res.data.rows);
                            this.newTableData.push(...res.data.rows)
                       } else {
                        console.log('获取更新数据失败');
                       }
                          
                        } 
                    }
                    this.tableData = this.newTableData
                    // console.log(this.tableData);
                }
               
                // getDepartmentData()
            }
    
        },
        methods:{
            async getDepartmentList(){
                const res = await getDepartment()
                // console.log(res);
                this.checkboxList = res.data
            },


            async getSalarysList(){
                const res = await getSalarys(this.page)
                
                this.tableData = res.data.rows
                console.log(this.tableData);
                this.loading = false
                this.page.total = res.data.total
                
            },


            handleCurrentChange(val) {
            this.page.page = val
            this.getSalarysList()
         },
            // updata(){
            //     this.checkboxList.forEach(async val=>{
            //         if(val.isChecked){
            //             console.log(val);
            //             this.page.departmentId = val.id
            //             console.log(this.page);
            //             const res = await getDepartmentData(this.page)
            //             // console.log(res,'res');
            //             this.tableData = res.data.rows

            //         }
            //     })
            //     // getDepartmentData()
            // }

        }
        
}
</script>

<style lang='scss' scoped>

span{
    padding-left: 10px;
 
 }
 .box{
     margin: 20px;
 }

 ::v-deep .el-radio {
  .el-radio__input {
    .el-radio__inner {
      border-radius: 2px;
    }
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    content: '';
    width: 8px;
    height: 3px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 2px;
    left: 1px;
    vertical-align: middle;
    transform: rotate(-45deg);
    border-radius: 0px;
    background: none;
  }
}

.footer{
    text-align: center;
}
</style>
    

