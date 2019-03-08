<template>
    <div class="skeleton">
        <div class="skeleton-item" v-for="item in number">
            <div class="skeleton-item-header">
                <a class="skeleton-item-header-left">
                </a>
                <div class="skeleton-item-header-right">
                    <p class="skeleton-item-header-right-top"></p>
                    <p class="skeleton-item-header-right-bottom"></p>
                </div>
            </div>
            <div class="skeleton-item-main"></div>
            <div class="skeleton-item-footer"></div>
            <div class="skeleton-item-loading"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "skeleton",
    props: {
      number: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
    .skeleton {
        .skeleton-item {
            position: relative;

            margin-top: 15px;
            padding: 0 15px;

            border-bottom: 1px solid $border-color;

            overflow: hidden;

            &:last-child {
                 border-bottom: 1px solid transparent;
             }

            .skeleton-item-header-left,
            .skeleton-item-header-right-top,
            .skeleton-item-header-right-bottom,
            .skeleton-item-main,
            .skeleton-item-footer {
                background-color: #eee;
            }

            .skeleton-item-header {
                display: flex;
                align-items: center;

                .skeleton-item-header-left {
                    width: 52px;
                    height: 52px;

                    border-radius: 50%;
                }

                .skeleton-item-header-right {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    flex-direction: column;

                    margin-left: 5px;

                    .skeleton-item-header-right-top {
                        margin-bottom: 8px;

                        height: 27px;
                    }

                    .skeleton-item-header-right-bottom {
                        width: 148px;

                        height: 16px;
                    }

                }
            }
            .skeleton-item-main {
                margin-top: 15px;
                height: 19px;
            }
            .skeleton-item-footer {
                margin: 12px 0;

                width: 39px;
                height: 17px;
            }
            .skeleton-item-loading {
                position: absolute;
                top: 0;
                left: -18px;
                right: -6px;
                bottom: 0;
                animation: 1s loadingframe infinite;
                &::after {
                    content: ' ';
                    display: inline-block;
                    position: relative;
                    height: 116px;
                    width: 12px;
                    background-color: rgba(255,255,255,.8);
                    transform: skew(20deg);
                }
                @keyframes loadingframe {
                    0% {
                        transform: translate3d(0,0,0);
                    }
                    100% {
                        transform: translate3d(100%,0,0);
                    }
                }
            }
        }
    }
</style>