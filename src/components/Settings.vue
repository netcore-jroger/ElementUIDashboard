<template>
  <el-col :span="20">
    <div>{{msg}}</div>
    <router-view></router-view>
  </el-col>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'settings'
      };
    }
  };
</script>

<style scoped>

</style>
