<template>
  <router-view v-if="isRouter"></router-view>
</template>

<script lang="ts">
  import { nextTick ,provide,ref } from "vue";
  export default {
    name:"APP",
    setup(){
      const isRouter = ref(true);
      const reload = () => {
        console.log("this is reload methods")
        isRouter.value = false;
        nextTick(() => {
          isRouter.value = true;
        });
      };
      provide("reload", reload);
      return {
        isRouter
      }
    }
  }
</script>

<style scoped>

</style>
