<template>
  <el-row class="header">
    <el-col :span="2">
      <img src="../../assets/logo.png" height="66" class="logo" />
    </el-col>
    <el-col :span="19">
      <el-menu class="menu" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item v-bind:index="menuItem.Index" v-for="menuItem in menus" :key="menuItem.Index">
          <router-link v-bind:to="menuItem.Path">{{menuItem.MenuName}}</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="3">
      <el-dropdown class="photo-profile" @command="handleCommand">
        <div class="el-dropdown-link">
          <img src="../../assets/logo.png" class="photo-img" alt="Photo" height="50" width="50" />
          <span class="photo-profile-label">SuperAdmin<i class="el-icon-caret-bottom el-icon--right"></i></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/settings/user-profile" class="photo-menu-item">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided command="signOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  import ElMenuItem from '../../../node_modules/element-ui/packages/menu/src/menu-item';
  import Bus from '../../utils/event-bus';
  import Http from '../../utils/http';
  import baseUri, {loginEntryPoint} from '../../utils/config';

  export default {
    components: { ElMenuItem },

    data() {
      return {
        activeIndex: '1',

        menus: []
      };
    },

    methods: {
      handleSelect: function(key, keyPath) {
        this.$data.activeIndex = keyPath[0];

        let currentMenu = this.menus.find(m => m.Index === key);
        Bus.$emit('change-menu', currentMenu);
      },

      /**
       * 加载顶部导航栏
       * @param self
       */
      loadNavationMenu: (self) => {
        Http.get('/static/nav-menu.json')
          .then(response => {
            if (response.status === 200 && response.data) {
              self.$data.menus = response.data;
            }
          })
          .catch(err => {
            Bus.$emit('Notification', {
              title: '获取主菜单失败，请刷新重试',
              message: err.message,
              type: 'error'
            });
          });
      },

      /**
       * 加载顶部菜单对应的子菜单
       * @param self
       */
      loadSubMenu: (self) => {
        Http.get('/static/menu.json')
          .then(response => {
            if (response.status === 200 && response.data) {
              let currentMenu = response.data.find(m => self.$route.fullPath.startsWith(m.DefaultPage));

              if (currentMenu && currentMenu.SubMenus.length > 0) {
                Bus.$emit('change-menu', currentMenu.SubMenus);
              }
            }
          })
          .catch(err => {
            Bus.$emit('Notification', {
              title: '获取子菜单失败，请刷新重试',
              message: err.message,
              type: 'error'
            });
          });
      },

      handleCommand: (command) => {
        if(command && command === 'signOut'){
          Http.post(`${baseUri}user/signout`)
            .then(res => {
              Bus.$emit('Notification', {
                title: res.data.Messages.join(';'),
                onClose: function(){
                  window.location.href = loginEntryPoint;
                }
              });
            })
            .catch(err => {
              Bus.$emit('Notification', {
                title: '注销失败',
                message: err.message,
                type: 'error'
              });
            });
        }
      }
    },

    mounted() {
      this.loadNavationMenu(this);
      this.loadSubMenu(this);
    }
  };
</script>

<style scoped>
  .el-menu-item > a{
    text-decoration: none;
  }

  .header{
    height: 80px;
    background-color: #eef1f6;
    border-bottom: 2px solid #20a0ff;
  }
  .logo{
    margin-top: 5px;
  }
  .menu{
    margin-top: 18px;
  }
  .photo-img{
    border-radius: 25px;
    display: block;
    float: left;
  }
  .photo-profile{
    margin: 15px 20px 0 0;
    float: right;
  }
  .photo-profile-label{
    margin: 15px 0 0 8px;
    display: inline-block;
    float: right;
  }

  .photo-menu-item{
    text-decoration: none;
  }

  .is-active{
    border-bottom: 5px solid #20a0ff;
  }
</style>
