<template>
  <div class="body_container flex-column flex--justify--center">
    <!--top header-->
    <Header></Header>
    <div class="container flex-row flex--grow flex--align--center flex--justify--center">
      <div class="container_body flex-column flex--align--center">
        <div class="process_title flex-row flex--align--center">
          <img src="../assets/img/lifangti.png">
          <div>模型验证</div>
        </div>

        <div class="step flex-row flex--align--center">
          <div class="step_item flex-column flex--align--center">
            <img src="../assets/img/step_1_active.png">
            <div>上传数据</div>
          </div>
          <div class="line"></div>
          <div class="step_item flex-column flex--align--center">
            <img src="../assets/img/step_1_active.png">
            <div>上传数据</div>
          </div>
          <div class="line"></div>
          <div class="step_item flex-column flex--align--center">
            <img src="../assets/img/step_1_active.png">
            <div>上传数据</div>
          </div>
        </div>

        <div class="upload">
          <el-upload class="upload_body" drag action="">
            <img src="../assets/img/upload.png">
            <div>将文件拖到此处或点击上传</div>
            <div>仅支持.CSV UTF-8格式</div>
          </el-upload>
        </div>

        <div class="button">
          <el-button type="primary">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.body_container{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  .container {
    height: calc(100% - 50px);
    .container_body{
      box-sizing: border-box;
      padding: 32px;
      width: 1440px;
      height: 900px;
      opacity: 1;
      background: #F8F9FA;
      .process_title{
        width: 100%;
        @include font_common();
        font-size: 18px;
        letter-spacing: 0.08em;
        img{
          height: 24px;
          width: 24px;
          margin-right: 6px;
        }
      }
      .step{
        margin-top: 63px;
        .step_item{
          img{
            height: 36px;
            width: 36px;
          }
          font-family: Microsoft YaHei;
          font-size: 16px;
          font-weight: normal;
          line-height: 27px;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #1D2129;
        }
        .line{
          width: 252px;
          opacity: 1;
          border: 1.4px solid #017EFA;
        }
      }

      .upload{
        height: 360px;
        width: 960px;
        margin-top: 60px;
        .upload_body{
          height: 100%;
          :deep(.el-upload-dragger){
            height: 360px;
          }
        }
        img{
          height: 64px;
          width: 64px;
        }
      }

      .button{
        margin-top: 58px;
      }
    }
  }
}



</style>
