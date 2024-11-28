<template>
  <div class="head_content flex-row flex--align--center">
    <div><img src="../assets/img/logo.png"/></div>
    <div class="head_title">{{TITLE}}</div>
  </div>
</template>

<script  lang="ts" setup>
import { TITLE } from "../util/defineData";
</script>

<style lang="scss" scoped>
.head_content{
  height: 50px;
  width: 100%;
  opacity: 1;
  background: #F9F9F9;
  img{
    height: 42px;
    width: 51px;
    margin-left: 163px;
  }
  .head_title{
    font-family: FZLanTingHei7-GBK;
    font-size: 18px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #1A1A1A;
    margin-left: 7px;
  }
}

</style>