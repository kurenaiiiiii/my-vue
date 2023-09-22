<template>
    <div>
        <div>
            <h2>申请{{ $route.params.type}}</h2>
            <div class="img"></div>
            <span class="names">{{ $route.params.name }}</span>
            <span class="namess">部门： {{ $route.params.depar }}</span>
            <span class="namesss">入职时间： {{ $route.params.time  }}</span>
        </div>
        <div>
            <p>申请类型：{{ $route.params.type }}</p>
            <p>请假类型：事假</p>
            <p>请假单位：天</p>
            <p>开始时间{{ $route.params.date }}</p>
            <p>结束时间：{{ $route.params.date }}</p>
            <p>请假时长： 1</p>
            <p>申请事由： 个人原因</p>
        </div>
            <div style="height: 300px;" class="tiao">
            <el-steps direction="vertical" :active="3">
                <el-step :title="$route.params.name +'发起申请'" :description="$route.params.date"></el-step>
                <el-step :title="$route.params.uname +'审批通过'" :description="$route.params.date"></el-step>
                <el-step title="'管理员审批通过'" :description="$route.params.date"></el-step>
            </el-steps>
            </div>

    </div>
</template>
<script>

</script>
<style>
.img{
    width: 100px;
    height: 100px;
    background-color: darkgray;
    border-radius: 50%;
    display: inline-block;

}

.names{
    position: absolute;
    font-size: 20px;
    
}
.namess{
    position: absolute;
    margin-top: 45px;
}
.tiao{
    float: right;
    margin-top: -300px;
}
</style>