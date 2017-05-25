<template>
  <div>
    <div id="particle"></div>

    <form v-on:submit.prevent id="app">
      <div class="container" id="loginForm">
        <div class="form-title">IvyBaby - 登 录</div>
        <div class="form-element form-element-first">
          <div class="form-element-label">用户名：</div>
          <div class="form-element-inp"><input type="text" name="UserName" v-model="UserName"></div>
          <div class="form-valid-message">请输入正确的用户名</div>
        </div>
        <div class="form-element">
          <div class="form-element-label">密　码：</div>
          <div class="form-element-inp"><input type="password" name="Password" v-model="Password"></div>
          <div class="form-valid-message">请输入正确的密码</div>
        </div>
        <div class="form-element">
          <div class="form-element-label">验证码：</div>
          <div class="form-element-inp">
            <input type="text" class="form-element-verify-inp" name="VerificationCode" v-model="VerificationCode" />
            <img id="verifyCodeImage" src="" alt="验证码" @click="LoadVerficationCode" />
          </div>
          <div class="form-valid-message">请输入正确的验证码</div>
        </div>
        <div class="form-element form-element-login">
          <div><button v-on:click="SignIn" class="">登 录</button></div>
          <div class="form-login-message">{{SignInResult}}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import particles from 'exports-loader?particlesJS=window.particlesJS,window.pJSDom!particles.js';
  import baseUri from './utils/config';
  import 'nprogress/nprogress.css';
  import Http from './utils/http';

  export default {
    data () {
      return {
        UserName: 'Admin',
        NickName: 'T2',
        Password: '123456',
        VerificationCode: '1234',
        VerificationCodeKey: '',
        SignInResult: ''
      };
    },

    mounted: function() {
      document.querySelector('#loginForm').style.marginTop = (window.innerHeight / 2 - 160) + 'px';

      this.LoadVerficationCode();
      this.MagicBackground();
    },

    methods: {
      LoadVerficationCode: function() {
        Http.get(`${baseUri}static/verifycode`)
          .then(res => {
            if (res.status === 200 && res.data.Code === 200) {
              document.querySelector('#verifyCodeImage').setAttribute('src', `data:image/png;base64,${res.data.Data.VerificationCode}`);

              this.$data.VerificationCodeKey = res.data.Data.VerificationCodeKey;
            } else {
              alert('获取验证码失败，请刷新重试。');
            }
          })
          .catch(err => {
            if (err) {
              console.log(err);
            }

            alert('服务器异常，请刷新重试。');
          });
      },

      SignIn: function() {
        this.$data.SignInResult = '';
        let data = this.$data;
        Http.post(`${baseUri}user/signin`, data)
          .then(res => {
            if (res.status === 200 && res.data && res.data.Code === 100) {
              let token = res.data.Data.Token;
              localStorage.setItem('token', token);
              this.$data.SignInResult = res.data.Messages.join(', ') + ' 2 秒后跳转...';
              window.setTimeout(() => {
                window.location.href = '/';
              }, 2000);
            } else {
              this.$data.SignInResult = `登录失败。${res.data.Messages.join(', ')}`;
            }
          })
          .catch(err => {
            if (err) {
              console.log(err);
            }
          });
      },

      MagicBackground: function() {
        let options = {
          'particles': {
            'number': {
              'value': 99,
              'density': {
                'enable': true,
                'value_area': 552.4033491425909
              }
            },
            'color': {
              'value': '#3079ed'
            },
            'shape': {
              'type': 'circle',
              'stroke': {
                'width': 0,
                'color': '#000000'
              },
              'polygon': {
                'nb_sides': 3
              },
              'image': {
                'src': 'img/github.svg',
                'width': 70,
                'height': 100
              }
            },
            'opacity': {
              'value': 1,
              'random': true,
              'anim': {
                'enable': false,
                'speed': 1,
                'opacity_min': 0.1,
                'sync': false
              }
            },
            'size': {
              'value': 2,
              'random': true,
              'anim': {
                'enable': false,
                'speed': 40,
                'size_min': 0.1,
                'sync': false
              }
            },
            'line_linked': {
              'enable': false,
              'distance': 150,
              'color': '#ffffff',
              'opacity': 0.4,
              'width': 1
            },
            'move': {
              'enable': true,
              'speed': 1.5782952832645452,
              'direction': 'none',
              'random': true,
              'straight': false,
              'out_mode': 'out',
              'bounce': false,
              'attract': {
                'enable': false,
                'rotateX': 600,
                'rotateY': 1200
              }
            }
          },
          'interactivity': {
            'detect_on': 'canvas',
            'events': {
              'onhover': {
                'enable': false,
                'mode': 'repulse'
              },
              'onclick': {
                'enable': true,
                'mode': 'repulse'
              },
              'resize': true
            },
            'modes': {
              'grab': {
                'distance': 400,
                'line_linked': {
                  'opacity': 1
                }
              },
              'bubble': {
                'distance': 400,
                'size': 40,
                'duration': 2,
                'opacity': 8,
                'speed': 3
              },
              'repulse': {
                'distance': 200,
                'duration': 0.4
              },
              'push': {
                'particles_nb': 4
              },
              'remove': {
                'particles_nb': 2
              }
            }
          },
          'retina_detect': false
        };
        particles.particlesJS('particle', options);
      }
    }
  };
</script>

<style scoped>
  body{
    padding:0;
    margin:0;
    background-color: white;
  }
  #app{
    position: relative;
  }
  .container{
    width: 600px;
    height: 320px;
    margin: 80px auto 0 auto;
    background-color: #e9f1ff;
    border: 1px solid #326bd2;
    border-radius: 3px;
    box-shadow: 3px 2px 10px lightslategrey;
  }
  .form-title{
    height: 39px;
    color: #efefef;
    padding-left: 20px;
    background-color: #4675ca;
    line-height: 39px;
    border-bottom: 1px solid #326bd2;
  }
  .form-element{
    margin: 10px 0;
    width: 600px;
    height: 50px;
  }
  .form-element:after{
    content: '';
    clear: both;
  }
  .form-element-first{
    margin-top: 30px;
  }
  .form-element div{
    height: 30px;
  }
  .form-element-label{
    width: 70px;
    line-height: 30px;
    text-align: right;
    padding-left: 165px;
    color: #333333;
    float: left;
  }
  .form-element-inp{
    width: 200px;
    float: left;
  }
  .form-element-inp>input:focus{
    border: 1px solid cornflowerblue;
    transition: all 0.2s linear;
  }
  .form-element-inp>div{
    margin: 0;
  }
  .form-element-inp>input, .form-element-verify-inp{
    height: 26px;
    width: 198px;
    font-size: 16px;
    text-indent: 0.5em;
    border: 1px solid #a8bee6;
    outline: none;
  }
  .form-element-inp>img{
    width: 72px;
  }
  .form-element-verify-inp{
    width: 120px !important;
    vertical-align: top;
    height: 28px !important;
    margin: 0;
    padding: 0;
  }
  .form-element-inp div{
    display: inline-block;
  }
  .form-valid-message{
    width: 365px;
    height: 20px !important;
    padding-left: 235px;
    font-size: 14px;
    color: red;
    visibility: hidden;
    float: left;
  }
  .form-login-message{
    color: red;
    font-size: 14px;
    height: 22px !important;
  }
  .form-element-login{
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  #particle {
    background-color: azure;
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:0;
  }
</style>
