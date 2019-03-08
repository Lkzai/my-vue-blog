<template>
    <div class="card">
        <div class="card-header">
            <a class="card-header-left">
                <img class="card-avatar" :src="avatar"/>
            </a>
            <div class="card-header-mid">
                <p class="card-author">{{author}}</p>
                <p class="card-time">{{time}}</p>
            </div>
            <svg class="card-header-right" @click="$emit('on-header-right-lick')">
                <use xlink:href="#icon-close"></use>
            </svg>
        </div>
        <div class="card-main" @click="$emit('on-main-click')">
            <p class="card-des">{{des}}</p>
        </div>
        <div class="card-footer">
            <div class="card-comments-wrap">
                <svg class="card-comments-icon">
                    <use xlink:href="#icon-comment"></use>
                </svg>
                <span>{{comments}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "card",
    props: {
      avatar: {
        type: String,
        default: ''
      },
      author: {
        type: String,
        default: ''
      },
      time: {
        type: String,
        default: ''
      },
      des: {
        type: String,
        default: ''
      },
      comments: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="scss">
    .card {
        position: relative;

        padding: 15px 15px 12px;

        @include border(bottom,rgba(0,0,0,.2));

        &:last-child {
         @include border(bottom,transparent);
         }
        .card-header {
            display: flex;
            align-items: center;

            .card-header-left {
                width: 50px;
                height: 50px;

                border-radius: 50%;
                border: 1px solid $border-color;

                font-size: 0;

                overflow: hidden;

                .card-avatar {
                    width: 100%;
                    height: 100%;
                }
            }

            .card-header-mid {
                flex: 1;
                margin-left: 5px;

                width: 0;

                .card-author {
                    margin-bottom: 7px;

                    font-size: 24px;

                    color: #333;
                }

                .card-time {
                    font-size: 14px;

                    color: #999;
                }
            }
            .card-header-right {
                width: 15px;
                height: 15px;

                padding: 0 0 28px 28px;

                fill: rgba(0,0,0,.54);
            }
        }

        .card-main {
            padding: 10px 0;
            color: #444;

            .card-des {
                font-size: 17px;
                line-height: 1.5;
            }
        }
        .card-footer {
            font-size: 0;

            .card-comments-wrap {
                display: inline-flex;
                align-items: center;

                color: #777;

                font-size: 15px;

                .card-comments-icon {
                    width: 27px;
                    height: 15px;

                    margin-right: 3px;

                    fill: currentColor;
                }
            }
        }
        .card-author,
        .card-time {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>