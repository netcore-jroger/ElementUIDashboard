<template>
  <el-col :span="4">
    <el-menu :default-active="activeIndex" class="" @open="handleOpen" @close="handleClose" theme="" @select="handleSelect">
      <el-menu-item v-bind:index="item.TabIndex" :router="true" v-for="(item, index) in menus" :key="item.TabIndex">
        {{item.MenuName}}
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
  import Bus from '../../utils/event-bus';
  import Http from '../../utils/http';

  let sideBarInstance = null;

  Bus.$on('change-menu', data => {
    if (sideBarInstance) {
      if (sideBarInstance.menus) {
        if (data.length) {
          sideBarInstance.$data.menus = data;

          let defaultMenu = data.find(m => m.IsDefault);
          sideBarInstance.$router.push({ path: defaultMenu.Path });
          sideBarInstance.$data.activeIndex = '1';
          return;
        }

        Http.get('/static/menu.json').then(response => {
          if (response.status === 200 && response.data) {
            let currentMenu = response.data.find(m => m.MenuName === data.MenuName);
            if (currentMenu && currentMenu.SubMenus.length > 0) {
              sideBarInstance.$data.menus = currentMenu.SubMenus;
              sideBarInstance.$data.activeIndex = '1';

              let defaultMenu = currentMenu.SubMenus.find(m => m.IsDefault);
              sideBarInstance.$router.push({ path: defaultMenu.Path });
            } else {
              sideBarInstance.$data.menus = [];
            }
          }
        }).catch(err => {
          if (err) {
            console.log(err);
            return;
          }
          // TODO: handle the error.
        });
      }
    }

    console.log('change-menu' + JSON.stringify(data));
  });

  export default {
    data() {
      return {
        activeIndex: '1',

        menus: []
      };
    },

    mounted() {
      sideBarInstance = this;
    },

    methods: {
      handleSelect: function(key, keyPath) {
        this.$data.activeIndex = keyPath[0];

        let targetMenu = this.menus.find(m => m.TabIndex === key);
        this.$router.push({path: targetMenu.Path});

        console.log(JSON.stringify(targetMenu));
      },
      handleOpen: function() {
      },
      handleClose: () => {
      }
    }
  };
</script>

<style scoped>

</style>
