<template>
  <div class="footer">
    <div class="list">
        <span>帮助中心</span>
        <el-divider direction="vertical"></el-divider>
        <span>服务支持</span>
        <el-divider direction="vertical"></el-divider>
        <span>售后服务</span>
        <el-divider direction="vertical"></el-divider>
        <span>服务网点</span>
        <el-divider direction="vertical"></el-divider>
        <span>线下门店</span>
        <el-divider direction="vertical"></el-divider>
        <span>申请商家</span>
        <el-divider direction="vertical"></el-divider>
        <span>加入我们</span>
        <el-divider direction="vertical"></el-divider>
        <span>关于我们</span>
        <el-divider direction="vertical"></el-divider>
        <span>友情链接</span>
    </div>
    <div class="license">
        <span>Copyright©商城名称 2020-2050</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'footer',
data(){
    
return{

}
},
create(){

},
methods:{

}
}

</script>
<style scoped>

    .footer{
        width: 1517px;
        height: 106px;
        background-color: #2e2e41;
        color: #8f9499;
        font-size: 12px;
    }
    .list{
        padding-top: 30px;
    }
    .license{
        margin-top: 15px;
    }
</style>