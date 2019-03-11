<template>
    <div class="following-wrap" ref="followingWrapRef">
        <div class="following">
            <a :href="`https://github.com/${follower.login}`" class="following-item"
               v-for="follower in $store.state.following">
                <div class="follower-item-left">
                    <img class="following-avatar" :src="follower.avatar_url"/>
                </div>
                <div class="following-item-right">
                    <div class="following-username">{{follower.login}}</div>
                    <svg class="following-arrow">
                        <use xlink:href="#icon-right"></use>
                    </svg>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Followers",
    created() {
      this.getFollowers()
    },
    methods: {
      getFollowers() {
        this.$tips('正在加载', 'loading');
        this.$ajax.get(`https://api.github.com/users/${this.$store.state.user.login}/following?time=${new Date().getTime()}`).then((res) => {
          this.$store.commit('SET_FOLLOWING', res.data);
        }).then(() => {
          this.$tips('加载成功', 'correct', 2000);
        }).catch(() => {
          this.$tips('加载失败', 'wrong', 2000);
        })
      }
    },
    //记住滚动位置
    beforeRouteLeave(to, from, next) {
      this.$store.commit('SET_SCROLLTOPS', {
        key: 'following',
        value: this.$refs.followingWrapRef.scrollTop
      });
      next();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$refs.followingWrapRef.scrollTop = vm.$store.state.scrollTops.following;
        vm.lastScrollTop = vm.$store.state.scrollTops.following;
      })
    }
  }
</script>

<style lang="scss" scoped>
    .following-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        overflow: auto;
        padding-top: 102px;

        .following {
            position: relative;

            @include border(top, rgba(0, 0, 0, .2));

            .following-item {
                position: relative;
                display: flex;
                align-items: center;

                padding-left: 15px;

                height: 50px;

                &:active {
                    background-color: #eee;
                }

                .follower-item-left {
                    width: 30px;
                    height: 30px;

                    margin-right: 15px;

                    border-radius: 50%;
                    border: 1px solid $border-color;
                    overflow: hidden;

                    .following-avatar {
                        width: 100%;
                        height: 100%;
                    }
                }

                .following-item-right {
                    position: relative;
                    display: flex;
                    flex: 1;
                    align-items: center;

                    padding-right: 9px;
                    @include border(bottom, rgba(0, 0, 0, .2));

                    .following-username {
                        padding: 15px 0;
                        flex: 1;
                    }

                    .following-arrow {
                        width: 20px;
                        height: 20px;

                        fill: $theme-color;
                    }
                }
            }
        }
    }
</style>