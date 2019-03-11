<template>
    <main class="main">
        <div class="sociality-wrap">
            <div class="sociality">
                <nav class="sociality-nav">
                    <router-link class="sociality-nav-item" to="/sociality" :class="{'sociality-nav-item-active': $route.name == 'followers'}">粉丝 {{$store.state.user.followers}}</router-link>
                    <router-link class="sociality-nav-item" to="/sociality/following" :class="{'sociality-nav-item-active': $route.name == 'following'}">关注 {{$store.state.user.following}}</router-link>
                </nav>
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        </div>
    </main>
</template>

<script>
  export default {
    name: "sociality"
  }
</script>

<style lang="scss" scoped>
    .sociality-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        padding-top: 46px;

        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .sociality {
            .sociality-nav {
                position: relative;
                z-index: 2;
                display: flex;
                margin: 15px 0;
                padding: 0 15px;
                .sociality-nav-item {
                    position: relative;
                    flex: 1;

                    height: 26px;
                    line-height: 26px;

                    font-size: 14px;
                    text-align: center;

                    color: rgba(0,0,0,.2);

                    @include border(both,rgba(0,0,0,.2));
                    &.sociality-nav-item-active {
                        color: #000;
                        @include border(both,#000);
                    }
                }
            }
        }
    }
</style>