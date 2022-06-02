<template>
  <div class="personal">
        <el-page-header @back="goBack" content="个人设置" style="margin-bottom: 5px;margin-top: 5px;">
        </el-page-header>
        <div>
            <span style="float:left;margin-left:110px">修改头像</span><br><br>
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/uploadAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload" name="avatar"
                :with-credentials="true">
                <div slot="tip" class="el-upload__tip">上传个人头像，只能上传jpg/png文件，且不超过2Mb</div>
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index';
Vue.use(VueAxios,axios);
export default {
data(){
return{
    imageUrl: ''
}
},
create(){

},
methods:{
    goBack: function(){
        VueRouter.push('/setting');
    },
    handleAvatarSuccess(res, file) {  // 上传头像成功
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl);
        location.reload();
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
}
}

</script>
<style scoped>

    .personal{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #f2f2f2;
    }
    .avatar-uploader{
        float: left;
        border:2px dashed #F00;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #141313;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #0c0f11;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #7d838b;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>