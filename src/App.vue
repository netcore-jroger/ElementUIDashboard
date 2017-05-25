<template>
  <div id="app">
    <router-view name="header"></router-view>
    <el-row>
      <router-view name="sideBar"></router-view>
      <router-view></router-view>
    </el-row>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
  import Bus from './utils/event-bus';
  import 'nprogress/nprogress.css';

  export default {
    name: 'app',

    mounted() {

    },

    methods: {
    }
  };
</script>

<style>
  body{
    padding: 0;
    margin: 0;
    background-color: white;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
