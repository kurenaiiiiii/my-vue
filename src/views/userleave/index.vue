<template>
    <div>
      <el-card style="margin:20px">
        <el-col :span="6">当前审批中<div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6">本月审批中<div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6">本月审批驳回<div class="grid-content bg-purple"></div></el-col><br>
        <el-col :span="6">{{ processStateCounts['1'] }} <div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6">{{ processStateCounts['2'] }} <div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6">{{ processStateCounts['3'] }} <div class="grid-content bg-purple"></div></el-col>
      </el-card>
      <el-card style="margin: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="80">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="type" label="审批类型" width="180"></el-table-column>
          <el-table-column prop="name" label="申请人"></el-table-column>
          <el-table-column prop="uname" label="当前申请人"></el-table-column>
          <el-table-column prop="date" label="审批发起时间"></el-table-column>
          <el-table-column prop="state" label="审批状态">
            <template slot-scope="scope">{{ convertProcessState(scope.row.processState) }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="viewDetails(scope.row)">查看</el-button>
  </template>
          </el-table-column>
        </el-table>
        <div class="footer">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-card>
    </div>
  </template>
  <script>
  import { getinstance } from '@/api/userleave';
  
  export default {
    mounted() {
      this.getinstances();
    },
    data() {
      return {
        tableData: [],
        processStateCounts: {
          '1': 0,
          '2': 0,
          '3': 0,
        },
      };
    },
    methods: {
      viewDetails(data) {
    // 跳转到目标组件，将 data 作为参数传递
    this.$router.push({
      name: 'userleave1',
      params: {
        type: data.type,
        name: data.name,
        uname: data.uname,
        date: data.date,
        state: data.state,
        depar: data.depar,
        time: data.time
      }
    });
  },
      async getinstances() {
        try {
          const res = await getinstance(1, 7);
          const data = res.data.rows;
  
          // 统计 processState 数量
          this.processStateCounts = data.reduce((counts, item) => {
            const state = item.processState.toString();
            counts[state] = (counts[state] || 0) + 1;
            return counts;
          }, this.processStateCounts);
  
          console.log(data);
          
          // 填充 tableData
          this.tableData = data.map(item => ({
            type: item.processName,
            name: item.username,
            uname: item.procCurrNodeUserName,
            date: item.procApplyTime,
            state: item.processState, 
            depar:item.departmentName,
            time:item.timeOfEntry
          }));
        } catch (error) {
          console.error('请求出错', error);
        }
      },
      convertProcessState(state) {

        switch (state) {
          case 1:
            return '审批中';
          case 2:
            return '审批通过';
          case 3:
            return '审批不通过';
          case 4:
            return '撤销';
          default:
            return '未知状态';
        }
      },
    },
  };
  </script>
  <style>
.footer{
    text-align: center;
}
</style>