<template>
    <div class="textarea" :class="{'textarea-active': active}">
        <label class="label">{{label}}</label>
        <textarea
                class="textarea-value"
                rows="3"
                v-bind="$attrs"
                v-bind:value="value"
                v-on="inputListeners"
                ref="textareaRef"
        ></textarea>
        <div class="input-bar"></div>
    </div>
</template>

<script>
  export default {
    name: "Textarea",
      props: ['label', 'value'],
      data() {
        return {
            active: this.value !== ''
        }
    },
      created() {
          window.inputBlur = () => {
              if(!this.hasBlur) this.blur();
              this.hasBlur = true
          }
          window.addEventListener('touchmove',window.inputBlur, {passive: true})
      },
      computed: {
          showClear() {
              return this.value !== ''
          },
          inputListeners() {
              var vm = this
              // `Object.assign` 将所有的对象合并为一个新对象
              return Object.assign({},
                  // 我们从父级添加所有的监听器
                  this.$listeners,
                  // 然后我们添加自定义监听器，
                  // 或覆写一些监听器的行为
                  {
                      focus(e) {
                          vm.active = true
                          //滑动时失焦
                          vm.hasBlur = false;
                          vm.$emit('focus',e)
                      },
                      blur(e) {
                          if(e.target.value === '') vm.active = false
                          vm.$emit('focus',e)
                      },
                      //输入法更新过滤
                      compositionstart(e) {
                          e.target.composing = true
                          vm.$emit('compositionstart',e)
                      },
                      compositionend(e) {
                          if (!e.target.composing) return
                          e.target.composing = false
                          vm.$emit('input', e.target.value)
                          vm.$emit('compositionend',e)
                      },
                      // 这里确保组件配合 `v-model` 的工作
                      input(e) {
                          //输入法更新过滤
                          if(!e.target.composing) {
                              let value = e.target.value
                              vm.$emit('input', value)
                          }
                      }
                  }
              )
          }
      },
      methods: {
          doExit() {
              this.$emit('input', '');
              this.active = false;
          },
          blur() {
              this.$refs.textareaRef.blur();
          }
      }
  }
</script>

<style lang="scss" scoped>
    .textarea {
        position: relative;

        width: 100%;
        height: 100%;
        box-sizing: border-box;

        font-size: 0;

        overflow: hidden;

        transition: transform $quick-time $function;
    .label {
            position: absolute;

            font-size: 16px;

            color: $theme-color;

            transform: translate3d(0,12.5px,0) scale(1);
            transform-origin: top left;
            transition: transform $quick-time $function, color $quick-time $function;
        }
        .textarea-value {
            display: block;
            
            margin: 20px 0 4px;

            font-size: 15px;

            width: 100%;

            -webkit-overflow-scrolling: touch;

            &::placeholder  {
                 opacity: 0;

                 transition: opacity $quick-time $function;
             }

        }
        .input-bar {
            height: 1px;

            background-color: #333;

            transform: translate3d(-100%, 0, 0);
            transition: transform $quick-time $function;
        }
        &.textarea-active {
            .label {
                color: #333;

                transform: translate3d(0,4px,0) scale(0.75);
            }
            .textarea-value {
                &::placeholder  {
                     opacity: 1;
                 }
            }
            .input-bar {
                transform: translate3d(0, 0, 0);
            }
        }
    }
</style>