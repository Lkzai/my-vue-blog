<template>
    <main class="main">
        <div class="read-wrap">
            <div class="read"  ref="readRef">
                <header class="read-header">
                    <p class="read-big-title">个人博客</p>
                    <div class="read-rely">
                        <svg class="read-icon" width="70" height="20"><g shape-rendering="crispEdges"><path fill="#555" d="M0 0h31v20H0z"/><path fill="#4c1" d="M31 0h39v20H31z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"> <text x="165" y="140" transform="scale(.1)" textLength="185">vue</text><text x="495" y="140" transform="scale(.1)" textLength="290">2.6.6</text></g> </svg>
                        <svg class="read-icon" width="70" height="20"><g shape-rendering="crispEdges"><path fill="#555" d="M0 0h31v20H0z"/><path fill="#4c1" d="M31 0h39v20H31z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"> <text x="165" y="140" transform="scale(.1)" textLength="250">vuex</text><text x="495" y="140" transform="scale(.1)" textLength="290">2.6.6</text></g> </svg>
                        <svg class="read-icon" width="108" height="20"><g shape-rendering="crispEdges"><path fill="#555" d="M0 0h69v20H0z"/><path fill="#4c1" d="M69 0h39v20H69z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"> <text x="355" y="140" transform="scale(.1)" textLength="590">vue-router</text><text x="875" y="140" transform="scale(.1)" textLength="290">3.0.1</text></g> </svg>
                        <svg class="read-icon" width="84" height="20"><g shape-rendering="crispEdges"><path fill="#555" d="M0 0h39v20H0z"/><path fill="#fe7d37" d="M39 0h45v20H39z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"> <text x="205" y="140" transform="scale(.1)" textLength="290">axios</text><text x="605" y="140" transform="scale(.1)" textLength="350">0.18.0</text></g> </svg>
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
                        <div class="read-detail">点击右上方的 <svg class="read-main-icon">
                            <use xlink:href="#icon-login"></use></svg> 绑定 GitHub 信息。
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
                font-size: 30px;
                .read-big-title {
                    text-align: center;

                    margin-bottom: 15px;
                }
                .read-rely {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    margin-bottom: 15px;
                    .read-icon {
                        margin: 2px;
                    }
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

                        @include border(bottom,rgba(0,0,0,.2));
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