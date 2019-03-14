<template>
    <main class="main">
        <div class="read-wrap">
            <div class="read" ref="readRef">
                <header class="read-header">
                    <p class="read-big-title">个人博客</p>
                    <div class="read-rate">
                        <div class="read-rate-item">
                            <svg class="octicon octicon-eye v-align-text-bottom" viewBox="0 0 16 16" version="1.1"
                                 width="14" height="14" aria-hidden="true" style="margin-right: 4px;">
                                <path fill-rule="evenodd"
                                      d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
                            </svg>{{repo.subscribers_count}}
                        </div>
                        <div class="read-rate-item">
                            <svg class="octicon octicon-star"  viewBox="0 0 14 16" version="1.1" width="12" height="14"
                                 aria-hidden="true" style="margin-right: 4px;">
                                <path fill-rule="evenodd"
                                      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                            </svg>
                            {{repo.stargazers_count}}
                        </div>
                        <div class="read-rate-item">
                            <svg class="octicon octicon-repo-forked v-align-text-bottom" viewBox="0 0 10 16"
                                 version="1.1" width="8" height="14" aria-hidden="true" style="margin-right: 4px;">
                                <path fill-rule="evenodd"
                                      d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                            </svg>
                            {{repo.forks}}
                        </div>
                    </div>
                    <div class="read-rely">
                        <svg class="read-icon" width="70" height="20">
                            <g shape-rendering="crispEdges">
                                <path fill="#555" d="M0 0h31v20H0z"/>
                                <path fill="#4c1" d="M31 0h39v20H31z"/>
                            </g>
                            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
                               font-size="110">
                                <text x="165" y="140" transform="scale(.1)" textLength="185">vue</text>
                                <text x="495" y="140" transform="scale(.1)" textLength="290">2.6.6</text>
                            </g>
                        </svg>
                        <svg class="read-icon" width="70" height="20">
                            <g shape-rendering="crispEdges">
                                <path fill="#555" d="M0 0h31v20H0z"/>
                                <path fill="#4c1" d="M31 0h39v20H31z"/>
                            </g>
                            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
                               font-size="110">
                                <text x="165" y="140" transform="scale(.1)" textLength="250">vuex</text>
                                <text x="495" y="140" transform="scale(.1)" textLength="290">2.6.6</text>
                            </g>
                        </svg>
                        <svg class="read-icon" width="108" height="20">
                            <g shape-rendering="crispEdges">
                                <path fill="#555" d="M0 0h69v20H0z"/>
                                <path fill="#4c1" d="M69 0h39v20H69z"/>
                            </g>
                            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
                               font-size="110">
                                <text x="355" y="140" transform="scale(.1)" textLength="590">vue-router</text>
                                <text x="875" y="140" transform="scale(.1)" textLength="290">3.0.1</text>
                            </g>
                        </svg>
                        <svg class="read-icon" width="84" height="20">
                            <g shape-rendering="crispEdges">
                                <path fill="#555" d="M0 0h39v20H0z"/>
                                <path fill="#fe7d37" d="M39 0h45v20H39z"/>
                            </g>
                            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
                               font-size="110">
                                <text x="205" y="140" transform="scale(.1)" textLength="290">axios</text>
                                <text x="605" y="140" transform="scale(.1)" textLength="350">0.18.0</text>
                            </g>
                        </svg>
                    </div>
                </header>
                <main class="read-main">
                    <div class="read-main-item">
                        <div class="read-middle-title">
                            介绍
                        </div>
                        <div class="read-detail">
                            本项目利用 GitHub Gist 作为数据库，搭建了一个基于Vue纯前端却可保存数据的移动端个人博客。
                        </div>
                    </div>
                    <div class="read-main-item">
                        <div class="read-middle-title">
                            快速使用
                        </div>
                        <div class="read-detail">点击右上方的
                            <svg class="read-main-icon">
                                <use xlink:href="#icon-login"></use>
                            </svg>
                            绑定 GitHub 信息。
                            <div class="read-small-title">
                                用户名
                            </div>
                            用户名为 GitHub 的用户名。
                            <div class="read-small-title">
                                Token
                            </div>
                            在 GitHub > Settings > Developer Settings > Personal access tokens 勾选 gist 权限获取 Token。
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </main>
</template>

<script>
  export default {
    name: "read",
    data() {
      return {
        repo: {}
      }
    },
    created() {
        this.getRepo();
    },
    methods: {
      getRepo() {
        this.$ajax.get("https://api.github.com/repos/Lkkkkkkg/my-vue-blog").then((res)=>{
          this.repo = res.data;
          console.log(this.repo);
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('SET_SCROLLTOPS', {
        key: 'read',
        value: this.$refs.readRef.scrollTop
      });
      next();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$refs.readRef.scrollTop = vm.$store.state.scrollTops.home
      })
    }
  }
</script>

<style lang="scss" scoped>
    .read-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        padding-top: 46px;

        overflow: auto;
        -webkit-overflow-scrolling: touch;

        .read {
            .read-header {
                margin: 30px 15px 0;

                .read-big-title {
                    text-align: center;

                    margin-bottom: 15px;

                    font-size: 30px;
                }

                .read-rate,
                .read-rely {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    margin-bottom: 15px;
                }

                .read-rate-item,
                .read-icon {
                    margin: 2px;
                }

                .read-rate-item {
                    display: flex;
                    align-items: center;

                    padding: 2px 4px;
                    border: 1px solid rgba(0, 0, 0, .2);

                    font-size: 12px;

                    color: #24292e;
                }
            }

            .read-main {
                margin: 30px 15px 0;

                .read-main-item {
                    margin-bottom: 30px;

                    .read-middle-title {
                        position: relative;

                        padding-bottom: 8px;
                        margin-bottom: 8px;

                        font-size: 22px;

                        @include border(bottom, rgba(0, 0, 0, .2));
                    }

                    .read-detail {
                        line-height: 1.5;
                        color: #24292e;

                        .read-main-icon {
                            vertical-align: top;

                            width: 21px;
                            height: 21px;
                        }

                        .read-small-title {
                            margin-top: 5px;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
</style>