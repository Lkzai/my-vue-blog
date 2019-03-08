<template>
    <transition name="fade">
        <span class="tips" v-show="visible">
            <svg class="tips-icon" :class="{'tips-icon-loading': type === 'loading'}">
                <use v-if="type === 'correct'" xlink:href="#icon-correct"></use>
                <use v-else-if="type === 'loading'"  xlink:href="#icon-loading"></use>
                <use v-if="type === 'wrong'" xlink:href="#icon-wrong"></use>
            </svg>
            {{message}}
        </span>
    </transition>
</template>

<script>
    export default {
        name: "tips",
        data() {
            return {
                visible: false,
                message: "",
                type: ''
            };
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity $quick-time $function;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .tips {
        position: absolute;
        top: 0;
        left: 50%;
        display: flex;
        align-items: center;
        z-index: 5;


        height: 46px;

        font-size: 16px;

        color: rgba(0,0,0,.54);

        transform: translateX(-50%);
        .tips-icon {
            width: 17px;
            height: 17px;

            margin-right: 4px;

            fill: currentColor;
            &.tips-icon-loading {
                animation: circle-animate .8s linear infinite;

    @keyframes circle-animate {
        100% {
            transform: rotate(360deg);
        }
    }
            }
        }
    }
</style>