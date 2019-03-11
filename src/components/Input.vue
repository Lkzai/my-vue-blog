<template>
    <div
            class="input"
            :class="{'input-active': active}"
    >
        <label class="input-label">
            {{label}}
        </label>
        <slot name="icon"></slot>
        <input
                class="input-value"
                v-bind="$attrs"
                v-bind:value="value"
                v-on="inputListeners"
                ref="inputRef"
        >
        <svg
                class="input-clear"
                :class="{'input-clear-show': showClear}"
                @click="onClear"
        >
            <use xlink:href="#icon-clear"></use>
        </svg>
        <div class="input-bar"></div>
    </div>
</template>

<script>
    export default {
        name: "Input",
        inheritAttrs: false,
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
                            vm.$emit('on-focus',e)
                        },
                        blur(e) {
                            if(e.target.value === '') vm.active = false
                            vm.$emit('on-blur',e)
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
            onClear() {
                this.$emit('input', '');
                this.focus();
            },
            doExit() {
                this.$emit('input', '');
                this.active = false;
            },
            focus() {
                this.$refs.inputRef.focus()
            },
            blur() {
                this.$refs.inputRef.blur()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .input {
        position: relative;

        width: 100%;

        overflow: hidden;

        font-size: 0;
    .input-label {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;

        color: $theme-color;

        font-size: 16px;

        transform: translate3d(0, 12.5px, 0) scale(1);
        transform-origin: top left;
        transition: transform $quick-time $function, color $quick-time $function;
    }

    .input-value {
        padding: 20px 18px 4px 0;

        width: 100%;

        font-size: 15px;

        box-sizing: border-box;

    &::placeholder  {
         opacity: 0;

         transition: opacity $quick-time $function;
     }
    }

    .input-clear {
        position: absolute;
        right: 0;
        top: 0;

        padding: 4px 0;

        width: 18px;
        height: 18px;

        fill: #777;
        transform: translate3d(0, 15.5px, 0) scale(0);
        transition: transform $quick-time $function;

    &.input-clear-show {
         transform: translate3d(0, 15.5px, 0) scale(1);
     }
    }

    .input-bar {
        height: 1px;

        background-color: #333;

        transform: translate3d(-100%, 0, 0);
        transition: transform $quick-time $function;
    }

    &.input-active {
    .input-label {
        color: #333;
        transform: translate3d(0, 4px, 0) scale(0.75);
    }

    .input-value {
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