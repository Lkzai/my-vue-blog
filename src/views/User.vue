<template>
    <main class="main">
        <div class="user-wrap">
            <div class="user">
                <header class="user-header">
                    <img class="user-avatar" :src="this.$store.state.user.avatar_url">
                    <div class="user-username">{{this.$store.state.user.login}}</div>
                    <div class="user-extra">
                        <router-link to="/" class="user-extra-item">
                            <div class="user-extra-item-top">{{this.$store.state.user.public_gists}}</div>
                            <div class="user-extra-item-bottom">博客</div>
                        </router-link>
                        <router-link to="/sociality" class="user-extra-item">
                            <div class="user-extra-item-top">{{this.$store.state.user.followers}}</div>
                            <div class="user-extra-item-bottom">粉丝</div>
                        </router-link>
                        <router-link to="/sociality/following" class="user-extra-item">
                            <div class="user-extra-item-top">{{this.$store.state.user.following}}</div>
                            <div class="user-extra-item-bottom">关注</div>
                        </router-link>
                    </div>
                </header>
                <main class="user-main">
                    <router-link to="/read" class="user-main-item">
                        <svg class="user-main-item-icon">
                            <use xlink:href="#icon-readme"></use>
                        </svg>
                        <div class="user-main-item-content">
                            <div class="user-main-item-text">使用说明</div>
                            <svg class="user-main-item-right">
                                <use xlink:href="#icon-right"></use>
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/sociality" class="user-main-item">
                        <svg class="user-main-item-icon">
                            <use xlink:href="#icon-friends"></use>
                        </svg>
                        <div class="user-main-item-content">
                            <div class="user-main-item-text">社交圈</div>
                            <svg class="user-main-item-right">
                                <use xlink:href="#icon-right"></use>
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/" class="user-main-item">
                        <svg class="user-main-item-icon">
                            <use xlink:href="#icon-blogs"></use>
                        </svg>
                        <div class="user-main-item-content">
                            <div class="user-main-item-text">博客列表</div>
                            <svg class="user-main-item-right">
                                <use xlink:href="#icon-right"></use>
                            </svg>
                        </div>
                    </router-link>
                    <a href="https://github.com/Lkkkkkkg/my-vue-blog" class="user-main-item">
                        <svg class="user-main-item-icon">
                            <use xlink:href="#icon-github"></use>
                        </svg>
                        <div class="user-main-item-content">
                            <div class="user-main-item-text">项目源码</div>
                            <svg class="user-main-item-right">
                                <use xlink:href="#icon-right"></use>
                            </svg>
                        </div>
                    </a>
                </main>
            </div>
        </div>
    </main>
</template>

<script>
  export default {
    name: "User"
  }
</script>

<style lang="scss" scoped>
    .user-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        padding-top: 46px;

        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .user {
            .user-header {
                font-size: 0;
                .user-avatar {
                    display: block;
                    width: 80px;
                    height: 80px;

                    margin: 15px auto 0;

                    border-radius: 50%;

                    box-shadow: 0 0 1px $theme-color;
                }
                .user-username {
                    margin-top: 10px;

                    font-size: 18px;
                    text-align: center;

                    color: #444;
                }
                .user-extra {
                    display: flex;
                    align-items: center;

                    padding: 15px 15px 0;

                    .user-extra-item {
                        position: relative;
                        flex: 1;

                        text-align: center;
                        @include border(right,rgba(0,0,0,.2));
                        &:last-child {
                            @include border(right,transparent);
                        }
                        .user-extra-item-top {
                            font-size: 19px;
                            color: #444;
                        }
                        .user-extra-item-bottom {
                            margin-top: 5px;
                            font-size: 15px;

                            color: $theme-color;
                        }
                    }
                }
            }
            .user-main {
                position: relative;

                margin-top: 15px;

                @include border(top,rgba(0,0,0,.2));
                @include border(bottom,rgba(0,0,0,.2));
                .user-main-item {
                    display: flex;
                    align-items: center;

                    padding-left: 11px;


                    height: 50px;

                    color: #444;
                
                    &:active {
                         background-color: #eee;
                     }

                    &:last-child {
                        .user-main-item-content {
                            @include border(bottom,transparent);
                        }
                    }

                    .user-main-item-icon {
                        width: 26px;
                        height: 26px;

                        margin-right: 11px;
                    }
                    .user-main-item-content {
                        position: relative;
                        flex: 1;
                        display: flex;
                        align-items: center;

                        padding-right: 11px;

                        height: 100%;

                        @include border(bottom,rgba(0,0,0,.2));
                        .user-main-item-text {
                            flex: 1;
                            font-size: 15px;
                        }
                        .user-main-item-right {
                            width: 20px;
                            height: 20px;

                            fill: $theme-color;
                        }
                    }
                }
            }
        }
    }
</style>