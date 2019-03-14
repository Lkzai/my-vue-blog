<template>
    <transition name="fade" >
        <div class="dialog-wrap" :value="value" v-if="show">
            <div class="dialog">
                <div class="dialog-header">
                    <slot name="header"></slot>
                </div>
                <div class="dialog-main">
                    <slot></slot>
                </div>
                <div class="dialog-footer">
                    <div class="dialog-action-cancel" @click="handleAction('on-cancel')">
                        <span>{{cancelText}}</span>
                    </div>
                    <div class="dialog-action-confirm" @click="!loading && show ? handleAction('on-confirm') : undefined">
                        <svg v-if="loading" class="dialog-loading">
                            <use xlink:href="#icon-loading"></use>
                        </svg>
                        <span v-else>{{confirmText}}</span>
                    </div>
                </div>
            </div>
            <div class="mask"></div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "my-dialog",
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
    .dialog-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        .dialog {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 4;

            border-radius: 8px;

            width: 270px;

            background-color: #fff;

            transform: translate(-50%, -50%) scale(1);

            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

            overflow: hidden;

            .dialog-header {
                display: flex;
                align-items: center;

                padding: 15px 15px 0 15px;

                font-size: 16px;

                color: #333;
            }
            .dialog-main {
                position: relative;

                padding: 12px 15px 13px 15px;

                @include border(bottom,rgba(0,0,0,.2));
            }
            .dialog-footer {
                display: flex;
                height: 44px;

                .dialog-action-cancel,
                .dialog-action-confirm {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    flex: 1;

                    font-size: 16px;
                    &:active {
                         background-color: #eee;
                     }
                }
                .dialog-action-cancel {
                    position: relative;

                    @include border(right,rgba(0,0,0,.2));

                    color: $theme-color;
                }
                .dialog-action-confirm {
                    color: rgba(0,0,0);
                }
                .dialog-loading {
                    width: 20px;
                    height: 20px;

                    fill: currentColor;
                    animation: circle-animate .8s linear infinite;

                    @keyframes circle-animate {
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                }
            }
        }

        .mask {
            width: 100%;
            height: 100%;

            background-color: rgba(255, 255, 255, .4);
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity $quick-time $function, transform $quick-time $function;

    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: scale(1.185);
    }
</style>