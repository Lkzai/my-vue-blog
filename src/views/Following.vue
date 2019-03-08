<template>
    <div class="following-wrap" ref="followingWrapRef">
        <div class="following">
            <a :href="`https://github.com/${follower.login}`" class="following-item" v-for="follower in this.$store.state.following">
                <div class="follower-item-left">
                    <img class="following-avatar" :src="follower.avatar_url"/>
                </div>
                <div class="following-item-right">
                    <div class="following-username">{{follower.login}}</div>
                    <div class="following-bio">{{follower.bio === null ? '暂无简介' : follower.bio}}</div>
                    <div class="following-extra">
                        <span class="following-extra-item">博客{{follower.public_gists}}</span>
                        <span class="following-extra-item">粉丝{{follower.following}}</span>
                        <span class="following-extra-item">关注{{follower.following}}</span>
                    </div>
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
        this.$tips('正在请求', 'loading');
        this.$ajax.get(`https://api.github.com/users/${this.$store.state.user.login}/following?time=${new Date().getTime()}`).then((res) => {
          res.data.forEach((item)=>{
            this.$ajax.get(item.url).then((res)=>{
              this.$store.commit('SET_FOLLOWING',res.data);
              this.$tips('请求成功', 'correct', 2000);
            })
          })
        }).catch(()=>{
          this.$tips('请求失败', 'wrong', 2000);
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

            .following-item {
                position: relative;
                display: flex;
                align-items: center;
                margin-left: 15px;
                padding: 15px 0;
                @include border(bottom,rgba(0,0,0,.2));
                .follower-item-left {
                    width: 50px;
                    height: 50px;

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
                    .following-bio {
                        margin-top: 2px;
                        color: #999;
                        font-size: 13px;
                    }
                    .following-extra {
                        margin-top: 2px;
                        color: #555;
                        font-size: 12px;
                        .following-extra-item {
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
</style>