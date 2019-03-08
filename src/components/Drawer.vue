<template>
    <div class="drawer" :class="{'drawer-show': show}" :value="value">
        <div class="drawer-header">
            <span class="drawer-cancel" @click="handleAction('on-cancel')">{{cancelText}}</span>
            <slot name="title"></slot>
            <div class="drawer-confirm" @click="!loading && show ? handleAction('on-confirm') : undefined">
                <svg v-if="loading" class="drawer-loading">
                    <use xlink:href="#icon-loading"></use>
                </svg>
                <span class="drawer-confirm-text" v-else>{{confirmText}}</span>
            </div>

        </div>
        <div class="drawer-main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
      name: "drawer",
      props: {
          value: {
              type: Boolean,
              default: false
          },
          cancelText: {
              type: String,
              default: '取消'
          },
          confirmText: {
              type: String,
              default: '确认'
          },
          beforeClose: Function
      },
      data() {
          return {
              show: false,
              loading: false
          }
      },
      watch: {
          value(value) {
              this.show = value
          },
          show(show) {
              //配合model
              this.$emit('input', show);

              //锁定滚动
              const body = document.body || document.documentElement
              body.className = show ? 'body-fix' : ''
          }
      },
      methods: {
          handleAction(action) {
              this.$emit(action);
              //关闭前回调函数
              if(this.beforeClose) {
                  this.loading = true
                  this.beforeClose(action,state =>{
                      if(state !== false) {
                          this.show = false
                      }
                      this.loading = false
                  })
              }else {
                  this.show = false
              }
          }
      }
  }
</script>

<style lang="scss" scoped>
    .drawer {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        z-index: 4;

        background-color: #fff;

        transform: translate3d(0, 100%, 0);
        transition: transform $default-time $function;
        &.drawer-show {
             transform: translate3d(0, 0, 0);
        }
         .drawer-header {
             display: flex;
             justify-content: space-between;
             align-items: center;

             padding: 0 15px;

             height: 46px;

             background-color: #fff;
    .drawer-cancel {
                 color: #222;
             }
             .drawer-loading {
                 width: 20px;
                 height: 20px;

                 animation: circle-animate .8s linear infinite;

    @keyframes circle-animate {
        100% {
            transform: rotate(360deg);
        }
    }
             }
             .drawer-confirm {
                 display: flex;
                 align-items: center;
                 justify-content: center;

                 width: 32px;
                 height: 17px;

                 font-size: 0;

                 .drawer-confirm-text {
                     font-size: 16px;
                 }
             }
         }
         .drawer-main {
             padding: 0 15px;

             height: calc(100% - 46px);
         }
    }
</style>