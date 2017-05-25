import Vue from 'vue';

let Bus = new Vue();

Bus.$on('Notification', function(data) {
  if (!data) return;

  let defaultOption = {
    type: 'success'
  };
  for (let key of Object.keys(data)) {
    defaultOption[key] = data[key];
  }
  console.log(defaultOption);
  this.$notify(defaultOption);
});

export default Bus;
