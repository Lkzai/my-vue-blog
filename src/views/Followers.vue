<template>
    <div class="followers-wrap" ref="followersWrapRef">
        <div class="followers">
            <a :href="`https://github.com/${follower.login}`" class="followers-item" v-for="follower in this.$store.state.followers">
                <div class="follower-item-left">
                    <img class="followers-avatar" :src="follower.avatar_url"/>
                </div>
                <div class="followers-item-right">
                    <div class="followers-username">{{follower.login}}</div>
                    <div class="followers-bio">{{follower.bio === null ? '暂无简介' : follower.bio}}</div>
                    <div class="followers-extra">
                        <span class="followers-extra-item">博客{{follower.public_gists}}</span>
                        <span class="followers-extra-item">粉丝{{follower.followers}}</span>
                        <span class="followers-extra-item">关注{{follower.following}}</span>
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
        this.$ajax.get(`https://api.github.com/users/${this.$store.state.user.login}/followers?time=${new Date().getTime()}`).then((res) => {
          res.data.forEach((item)=>{
            this.$ajax.get(item.url).then((res)=>{
              this.$store.commit('SET_FOLLOWERS',res.data);
                this.$tips('请求成功', 'correct', 2000);
            }).catch(()=>{
              this.$tips('请求失败', 'wrong', 2000);
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
        key: 'followers',
        value: this.$refs.followersWrapRef.scrollTop
      });
      next();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$refs.followersWrapRef.scrollTop = vm.$store.state.scrollTops.followers;
        vm.lastScrollTop = vm.$store.state.scrollTops.followers;
      })
    }
  }
</script>

<style lang="scss" scoped>
    .followers-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        overflow: auto;
        padding-top: 102px;
        .followers {
            position: relative;

            @include border(top,rgba(0,0,0,.2));
            .followers-item {
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
                    .followers-avatar {
                        width: 100%;
                        height: 100%;
                    }
                }
                .followers-item-right {
                   .followers-bio {
                       margin-top: 2px;
                       color: #999;
                       font-size: 13px;
                   }
                    .followers-extra {
                        margin-top: 2px;
                        color: #555;
                        font-size: 12px;
                        .followers-extra-item {
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
</style>