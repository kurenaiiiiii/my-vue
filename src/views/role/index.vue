<template>
    <div>
         <el-card style="margin:15px">
         
            <el-row>
               
                 <el-button type="primary" size="mini"  @click="dialogVisible=true">添加角色</el-button>
            </el-row>
 
            <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                size="small"
                style="width: 100%;margin-top:8px">
                <el-table-column
                prop="name"
                label="角色"
                width="200">
                </el-table-column>
                <el-table-column
                prop="state"
                label="启用"
                width="200">

                <template slot-scope="scope">
                    <span>{{ scope.row.state === 1 ? '已启用' : scope.row.state === 0 ? '未启用' : '为止' }}</span>
                </template>
  
                </el-table-column>
                <el-table-column
                prop="description"
                label="描述">
                </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="primary"
                        size="mini"
                        @click="btnPermission(scope.row.id)">分配权限</el-button>
                        <el-button
                        size="mini"
                        @click="editRole(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteRole(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
            </el-table>

            <!-- 添加角色dialog -->
            <el-dialog
                title="添加角色"
                :visible.sync="dialogVisible"
                width="35%"
                @close="btnCancle"
               >
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="角色名称:" prop="name">
                            <el-input size="mini" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="启用:">

                            <el-switch
                                v-model="ruleForm.state"
                                size="mini"
                                :active-value="1"
                                :inactive-value="0"
                               >
                             </el-switch>
                         
                        </el-form-item>

                        <el-form-item label="角色描述:" prop="description">
                            <el-input size="mini" type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                    </el-form>


                <span slot="footer" class="dialog-footer">
                       <el-button @click="btnCancle">取消</el-button>
                       <el-button type="primary" @click="addRoleDialogEnter">确定</el-button>
                </span>
             </el-dialog>

               <!-- 配权限dailog -->
            <el-dialog title="分配权限" :visible="showPermissionDialog" @close="btnPermCancel">
               
                <el-tree
                    ref="permTree"
                    check-strictly
                    node-key="id"
                    :data="permissionData"
                    :props="{ label: 'name' }"
                    show-checkbox
                    default-expand-all
                   :default-checked-keys="permIds"   
                />
                <!-- 确定和取消按钮 -->
                <el-row slot="footer" type="flex" justify="center">
                    <el-col :span="6">
                    <el-button type="primary" size="small" @click="btnPermissionOK">确定</el-button>
                    <el-button size="small" @click="btnPermCancel">取消</el-button>
                    </el-col>
                </el-row>
            </el-dialog>

            <!-- 分页 -->
           <el-pagination
                layout="prev, pager, next"
                :page-size="page.pagesize"
                :current-page="page.page"
                :total="page.total"
                @current-change="handleCurrentChange">
            </el-pagination>
            
            
        </el-card>  
    </div>
</template>

<script>
import { getRoleList , addRoleList , updateRole ,getRoleDetail, deleteRole , assignPerm , getPermissionList} from '@/api/role'
import { transListToTreeData} from '@/utils'

export default {
    data(){
         return{
               tableData: [],   
                page:{
                      page:1,
                      pagesize:10,
                      total:0
                },
                dialogVisible: false, //添加角色
                ruleForm:{
                     name:'',
                     state:0,// 默认0 关闭 0 打开1
                     description:''

                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                    ],
                },
                loading: true, //获取table loading
                showPermissionDialog: false,//
                permissionData: [],
                currentRoleId: null,
                permIds: []
             }
    },
    mounted(){
           this.getRoleData()
    },
    methods:{
        //获取角色列表
       async getRoleData(){
               const res = await getRoleList(this.page)
               if(res.success){
                    this.tableData = res.data.rows
                    this.page.total = res.data.total
                    this.loading = false
               }
               

       },
       //切换分页
         handleCurrentChange(val) {
            this.page.page = val
            this.getRoleData()
         },

      //获取编辑详情
       async editRole(row) {
            const res = await getRoleDetail(row.id)
            this.ruleForm = res.data
            this.dialogVisible = true
        },
        //添加与编辑
       async addRoleDialogEnter() {
        try {

            await this.$refs.ruleForm.validate()
            
            if (this.ruleForm.id) {
                // 编辑场景
               const res = await updateRole(this.ruleForm) // 修改数据库数据
               this.$message.success(res.message)

            } else {
               // 新增场景
                const res = await addRoleList(this.ruleForm)
                this.$message.success(res.message)
            }
            this.getRoleData() // 获取角色列表
            this.dialogVisible = false // 关闭弹层 会触发 close事件
         } catch (error) {
                console.log(error)
         }
        },
        //当dialog被关闭时
        btnCancle(){
              this.ruleForm = {} // 重置数据
              this.$refs.ruleForm.resetFields() //重置表单数据
              this.dialogVisible = false
        },

       

         async  btnPermission(id) {
            this.currentRoleId = id
            const res = await getRoleDetail(id)
            const { permIds } = res.data
            this.permIds = permIds
            // console.log('permIdsss',this.permIds);
            const res1 = await getPermissionList()
            // console.log('res1res1res1res1res1',res1);
            this.permissionData = transListToTreeData(res1.data, 0)
            console.log('this.permissionData',this.permissionData);
            this.showPermissionDialog = true
            },
            // 点击确定时触发
            async  btnPermissionOK() {
                await assignPerm({
                    id: this.currentRoleId,
                    permIds: this.$refs.permTree.getCheckedKeys() //被选中的节点的 key 所组成的数组
                })
                this.$message.success('角色分配权限成功')
                this.showPermissionDialog = false
            },  

             btnPermCancel() {
                this.permIds = []
                this.showPermissionDialog = false
                },

          //删除

          async deleteRole(row) {
               try {
                    await this.$confirm('确认删除该角色吗')
                    // 只有点击了确定 才能进入到下方
                    await deleteRole(row.id) // 调用删除接口
                    this.getRoleData() // 重新加载数据
                    this.$message.success('删除角色成功')
                } catch (error) {
                    console.log(error)
                }
            }
         }
}
</script>

<style>
  .cell{
     text-align: center;
  }
  .el-dialog__footer{
      text-align: center;
  }
  .el-pagination{
     text-align: right;
     padding-top: 30px;
  }
</style>