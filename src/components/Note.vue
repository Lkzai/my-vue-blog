<template>
    <div class="note">
        <header class="note-header">
            <div class="note-header-top">
                {{des}}
            </div>
            <div class="note-header-bottom">
                <a class="note-header-bottom-left">
                    <img class="note-avatar" :src="avatar"/>
                </a>
                <div class="note-header-bottom-right">
                    <p class="note-author">{{author}}</p>
                    <p class="note-time">{{time}}</p>
                </div>
            </div>
        </header>
        <Main class="note-Main">
            <div class="note-Main-top">
                {{detail}}
            </div>
        </Main>
    </div>
</template>

<script>
  export default {
    name: "note",
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
      imgs: {
        type: Array,
        default: () => ['', '', '']
      },
      detail: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    .note {
        .note-header {
            margin: 0 15px;

            .note-header-top {
                margin-top: 15px;

                font-size: 30px;
                font-weight: 700;
                color: #333;
            }

            .note-header-bottom {
                margin-top: 15px;
                display: flex;
                align-items: center;

                .note-header-bottom-left {
                    width: 50px;
                    height: 50px;

                    border-radius: 50%;
                    border: 1px solid #eee;

                    font-size: 0;

                    overflow: hidden;

                    .note-avatar {
                        width: 100%;
                        height: 100%;
                    }
                }

                .note-header-bottom-right {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    flex-direction: column;

                    margin: 0 5px;

                    .note-author {
                        margin-bottom: 10px;

                        min-height: 25px;

                        font-size: 22px;

                        color: #333;
                    }

                    .note-time {
                        min-height: 16px;

                        font-size: 14px;

                        color: #999;
                    }
                }
            }
        }

        .note-Main {
            margin: 0 15px;

            .note-Main-top {
                margin-top: 15px;
                line-height: 26px;

                color: #222;
            }
        }

    }
</style>