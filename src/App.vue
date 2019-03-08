<template>
    <div id="app">
        <header class="header">
            <router-link class="header-left" to="/">
                <svg class="header-left-icon">
                    <use xlink:href="#icon-dog"></use>
                </svg>
            </router-link>
            <div class="header-right">
                <svg @click="loginDialogShow = true" v-if="JSON.stringify(this.$store.state.user)==='{}'" width="100%"
                     height="100%"
                     fill="currentColor">
                    <use xlink:href="#icon-login"></use>
                </svg>
                <svg v-else-if="this.$route.name === 'user'"  @click="logoutDialogShow = true" width="100%" height="100%" fill="rgba(0,0,0,.54)">
                    <use xlink:href="#icon-logout"></use>
                </svg>
                <router-link class="header-avatar" v-else to="/user">
                    <img :src="this.$store.state.user.avatar_url" alt="" width="100%" height="100%">
                </router-link>
            </div>
        </header>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <my-dialog v-model="loginDialogShow" :before-close="beforeLoginDialogClose"
                   :confirm-text="loginDialogConfirmText">
            <svg class="dialog-header-logo" slot="header">
                <use xlink:href="#icon-login"></use>
            </svg>
            <span slot="header">绑定 GitHub 信息</span>
            <my-input class="login-input" v-model="usernameValue" :label="usernameLabel"
                      :placeholder="usernamePlaceholder" ref="usernameInputRef"></my-input>
            <my-input class="login-input" type="password" v-model="tokenValue" :label="passwordLabel"
                      :placeholder="passwordPlaceholder" ref="passwordInputRef"></my-input>
        </my-dialog>
        <my-dialog v-model="logoutDialogShow" @on-confirm="clickLogoutDialogConfirm">
            <svg class="dialog-header-logo" slot="header">
                <use xlink:href="#icon-logout"></use>
            </svg>
            <span slot="header">注销账号</span>
            <div class="logout-main">确定要注销吗？</div>
        </my-dialog>
        <!--<drawer v-model="drawerShow" :before-close="beforeDrawerClose" :confirm-text="drawerConfirmText">-->
        <!--<svg class="edit-icon" slot="title">-->
        <!--<use xlink:href="#icon-write"></use>-->
        <!--</svg>-->
        <!--<my-input class="edit-header" v-model="desValue" :label="desLabel" :placeholder="desPlaceholder" ref="desInputRef"></my-input>-->
        <!--<div class="edit-main">-->
        <!--<div class="edit-main-left">-->
        <!--<img class="edit-avatar" :src="this.$store.state.user.avatar_url"/>-->
        <!--</div>-->
        <!--<div class="edit-main-right">-->
        <!--<p class="edit-author">{{this.$store.state.user.login}}</p>-->
        <!--<p class="edit-time"></p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="edit-footer">-->
        <!--<my-textarea :label="detailLabel" v-model="detailValue" :placeholder="detailPlaceholder" ref="detailTextareaRef"></my-textarea>-->
        <!--</div>-->
        <!--</drawer>-->
    </div>
</template>

<script>
  import Dialog from './components/Dialog'
  import Drawer from './components/Drawer'
  import Input from './components/Input'

  export default {
    components: {
      'my-dialog': Dialog,
      'my-input': Input,
      'drawer': Drawer
    },
    data() {
      return {
        loginDialogShow: false,
        logoutDialogShow: false,
        // drawerShow: false,
        loginDialogConfirmText: '绑定',
        usernameLabel: '用户名',
        usernamePlaceholder: '请输入GitHub用户名',
        passwordLabel: 'Token',
        passwordPlaceholder: '请输入有效Token',
        usernameValue: '',
        tokenValue: ''
      }
    },
    methods: {
      clickLogoutDialogConfirm() {
        this.$store.commit('SET_USER', {})
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        this.$tips('注销成功', 'correct', 2000);
        this.$router.push('/read')
      },
      beforeLoginDialogClose(action, done) {
        if (action === 'on-confirm') {
          if (!(this.usernameValue && this.tokenValue)) {
            done(false);
          } else {
            this.$tips('正在绑定', 'loading');
            this.$ajax(`https://api.github.com/user?access_token=${this.tokenValue}`).then((res) => {
                if (this.usernameValue === res.data.login) {
                    this.$tips('绑定成功', 'correct', 2000);
                    this.$store.commit('SET_USER', res.data);
                    this.$store.commit('SET_TOKEN', this.tokenValue);
                    sessionStorage.setItem("user", JSON.stringify(res.data));
                    sessionStorage.setItem("token", this.tokenValue);
                    this.$refs.usernameInputRef.doExit()
                    this.$refs.passwordInputRef.doExit()
                    this.$router.push('/');
                    done()
                } else {
                    this.$tips('用户名与Token不一致', 'wrong', 2000);
                    done(false)
                }
            }).catch(() => {
              this.$tips('绑定失败', 'wrong', 2000);
              done(false)
            })
          }
        } else {
          this.$refs.usernameInputRef.doExit()
          this.$refs.passwordInputRef.doExit()
          done()
        }
      }
    }
  }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;

        .header {
            position: relative;

            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0 15px;

            height: 46px;

            color: rgba(0, 0, 0, 0.54);

            @include border(bottom, rgba(0, 0, 0, .2));

            .header-left {
                display: flex;
                justify-content: center;
                align-items: center;

                font-size: 0;

                .header-left-icon {
                    width: 30px;
                    height: 30px;

                    fill: rgba(0, 0, 0, 0.54);
                }
            }

            .header-right {
                width: 30px;
                height: 30px;

                font-size: 0;
                .header-avatar {
                    display: block;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;

                    border: 1px solid rgba(0,0,0,.54);

                    overflow: hidden;
                }
            }
        }

        .dialog-header-logo {
            width: 30px;
            height: 30px;

            margin-right: 13px;

            fill: rgba(0, 0, 0, 0.54);
        }


    }
</style>
