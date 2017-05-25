<template>
  <el-col :span="24">
    <div>Body</div>
    <p>
      <button @click="Notification">弹出消息</button>
    </p>
    <p>
      <button @click="GetUserInfo">跨站请求</button>
    </p>
  </el-col>
</template>

<script>
  import Bus from '../utils/event-bus';
  import Http from '../utils/http';

  export default {

    data () {
      return {
      };
    },

    methods: {
      Notification: function() {
        Bus.$emit('Notification', {
          title: '生日提醒'
        });
      },

      GetUserInfo: function() {
        Http.get(`http://localhost:20938/api/user/1/10`)
          .then(res => {
            console.log(res);
          })
          .catch(function(error){
            console.log(error);
            Bus.$emit('Notification', {
              message: error.message,
              type: 'error'
            });
          });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
