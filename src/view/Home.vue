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
            <img src="../assets/img/step_2.png">
            <div>数据分类</div>
          </div>
          <div class="line"></div>
          <div class="step_item flex-column flex--align--center">
            <img src="../assets/img/step_3.png">
            <div>完成</div>
          </div>
        </div>

        <div class="upload flex-column flex--align--center flex--justify--center">
          <el-upload class="upload_body" drag action="" v-if="!upload_success">
            <img src="../assets/img/upload.png">
            <div class="upload_text text1">将文件拖到此处或<span>点击上传</span></div>
            <div class="upload_text text2">仅支持.CSV UTF-8格式</div>
          </el-upload>
          <div class="upload_success flex-column flex--align--center" v-else>
            <img src="../assets/img/success.png">
            <span>解析成功</span>
          </div>
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
import { ref } from 'vue';
let upload_success = ref(false);
</script>

<style lang="scss" scoped>
@mixin font_common(){
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #A9AEB8;
}
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
            margin-bottom: 6px;
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
          margin: 0 8px;
        }
      }
      .upload{
        height: 360px;
        width: 960px;
        margin-top: 60px;
        background: #FFFFFF;
        box-sizing: border-box;
        img{
          height: 64px;
          width: 64px;
        }
        .upload_body{
          height: 100%;
          width: 100%;
          :deep(.el-upload){
            height: 100%;
          }
          :deep(.el-upload-dragger){
            height: 100%;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          .upload_text{
            @include font_common();
            &.text1{
              margin-top: 4px;
              line-height: 22px;
              span{
                color: #017EFA;
              }
            }
            &.text2{
              margin-top: 20px;
            }
          }
        }
        .upload_success{
          @include font_common();
          span{
            margin-top: 12px;
          }
        }
      }
      .button{
        margin-top: 58px;
      }
    }
  }
}
</style>
