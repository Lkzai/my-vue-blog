<template>
    <div class="loading">
        <svg class="loading-icon">
            <use xlink:href="#icon-logo"></use>
        </svg>
    </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style lang="scss" scoped>
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;

        font-size: 0;

        color: #eee;

        transform: translate(-50%, -50%);
        .loading-icon {
            width: 50px;
            height: 50px;

            fill: currentColor;
        }
        &::after {
            position: absolute;
            content: ' ';
            display: inline-block;
            height: 50px;
            width: 12px;
            background-color: rgba(255,255,255,.8);
            animation: 1.5s loadingframe infinite;
        }
        @keyframes loadingframe {
            0% {
                transform: skew(20deg) translate3d(-64px,0,0);
            }
            100% {
                transform: skew(20deg) translate3d(0,0,0);
            }
        }
    }
</style>