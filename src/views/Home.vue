<template>
    <main class="main">
        <div class="home-wrap" ref="homeWrapRef" @scroll="onScroll">
            <div class="home" ref="homeRef">
                <transition name="fade">
                    <div class="home-tips" v-if="!loading && $store.state.blogs.length === 0">
                        <p class="home-tips-text">点击发表博客</p>
                        <svg class="home-tips-icon" slot="header">
                            <use xlink:href="#icon-arraw"></use>
                        </svg>
                    </div>
                </transition>
                <card v-for="blog in $store.state.blogs"
                      :key="blog.id"
                      :avatar="blog.owner.avatar_url"
                      :author="blog.owner.login"
                      :time="$util.getDateDiff(blog.created_at)"
                      :des="blog.description"
                      :comments="blog.comments"
                      @on-main-click="clickCardMain(blog)"
                      @on-header-right-lick="clickCardHeaderRight(blog.id)"
                ></card>
            </div>
        </div>
        <svg class="btn-add" :class="{'btn-add-hide': addHide}" @click="editDialogShow=true">
            <use xlink:href="#icon-add"></use>
        </svg>
        <my-dialog v-model="editDialogShow" :before-close="beforeEditDialogClose" :confirm-text="addDialogConfirmText">
            <svg class="dialog-header-logo" slot="header">
                <use xlink:href="#icon-write"></use>
            </svg>
            <span slot="header">发表博客</span>
            <my-input class="edit-header" v-model="desValue" :label="desLabel" :placeholder="desPlaceholder"
                      ref="desInputRef"></my-input>
            <my-textarea :label="detailLabel" v-model="detailValue" :placeholder="detailPlaceholder"
                         ref="detailTextareaRef"></my-textarea>
        </my-dialog>
        <my-dialog v-model="deleteDialogShow" :before-close="beforeDeleteDialogClose">
            <svg class="dialog-header-logo" slot="header">
                <use xlink:href="#icon-delete"></use>
            </svg>
            <span slot="header">删除博客</span>
            <div class="logout-main">确定要删除吗？</div>
        </my-dialog>
    </main>
</template>

<script>
  import Card from '../components/Card'
  import Dialog from '../components/Dialog'
  import Input from '../components/Input'
  import Textarea from '../components/Textarea'

  export default {
    name: 'home',
    components: {
      'card': Card,
      'my-dialog': Dialog,
      'my-input': Input,
      'my-textarea': Textarea
    },
    data() {
      return {
        loading: false,
        addHide: false,
        lastScrollTop: 0,
        editDialogShow: false,
        desValue: '',
        detailValue: '',
        desLabel: '标题',
        detailLabel: '内容',
        desPlaceholder: '请输入标题',
        detailPlaceholder: '请输入内容',
        addDialogConfirmText: '发表',
        deleteDialogShow: false,
        currentId: '',
      }
    },
    created() {
      this.getBlogs();
    },
    methods: {
      clickCardHeaderRight(id) {
        this.currentId = id;
        this.deleteDialogShow = true;
      },
      beforeDeleteDialogClose(action,done) {
        if (action === 'on-confirm') {
          this.$tips('正在删除', 'loading');
          this.$ajax.delete(`https://api.github.com/gists/${this.currentId}?access_token=${this.$store.state.token}`).then(() => {
            this.$store.commit('DELETE_BLOG', this.currentId)
            this.$store.commit('DELETE_DETAILS', this.currentId)
          }).then(()=>{
            this.$tips('删除成功', 'correct', 2000);
            done();
          }).catch(() => {
            this.$tips('删除失败', 'wrong', 2000);
            done(false);
          })
        } else {
          done();
        }
      },
      onScroll(e) {
        if (e.target.scrollTop > this.lastScrollTop) {
          this.addHide = true
        }
        if (e.target.scrollTop < this.lastScrollTop) {
          this.addHide = false
        }
        //兼容IOS弹性滚动
        if (e.target.scrollTop <= 0) {
          this.addHide = false
        }
        if (e.target.scrollTop + this.$refs.homeWrapRef.offsetHeight - 46 >= this.$refs.homeRef.offsetHeight) {
          this.addHide = true
        }
        this.lastScrollTop = e.target.scrollTop;
      },
      clickCardMain(blog) {
        //提前获取des,author,avatar,time
        if (!this.$store.state.details[blog.id]) {
          this.$store.commit('SET_DETAILS', {
            key: blog.id,
            value: {
              description: blog.description,
              created_at: blog.created_at,
              owner: {
                login: blog.owner.login,
                avatar_url: blog.owner.avatar_url
              }
            }
          })
        }
        this.$router.push({
          name: 'detail',
          query: {
            id: blog.id
          }
        })
      },
      getBlogs() {
          this.$tips('正在加载', 'loading');
          this.loading = true;
          //加个时间戳防止发表博客后刷新页面使用了缓存
        this.$ajax.get(`https://api.github.com/users/${this.$store.state.user.login}/gists?time=${new Date().getTime()}`).then((res) => {
            this.$store.commit('SET_BLOGS', res.data);
        }).then(()=>{
          this.$tips('加载成功', 'correct', 2000);
          this.loading = false;
        }).catch(() => {
          this.$tips('加载失败', 'wrong', 2000);
          this.loading = false;
        })
      },
      beforeEditDialogClose(action, done) {
        if (action === 'on-confirm') {
          if (!(this.desValue && this.detailValue)) {
            done(false);
          } else {
            this.$tips('正在发表', 'loading');
            this.$ajax.post(`https://api.github.com/gists?access_token=${this.$store.state.token}`, {
              "description": this.desValue,
              "public": true,
              "files": {
                "blog": {
                  "content": this.detailValue
                }
              }
            }).then((res) => {
              this.$store.commit('ADD_BLOG', res.data)
              this.$store.commit('SET_DETAILS', {
                key: res.data.id,
                value: res.data
              });
            }).then(()=>{
              this.$tips('发表成功', 'correct', 2000);
              done();
              this.$refs.desInputRef.doExit()
              this.$refs.detailTextareaRef.doExit()
              this.$refs.homeWrapRef.scrollTop = 0;
              this.lastScrollTop = 0;
            }).catch(()=>{
              this.$tips('发表失败', 'wrong', 2000);
              done(false);
            })
          }
        } else {
          done();
        }
      }
    },
    //记住滚动位置
    beforeRouteLeave(to, from, next) {
      this.$store.commit('SET_SCROLLTOPS', {
        key: 'home',
        value: this.$refs.homeWrapRef.scrollTop
      });
      next();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$refs.homeWrapRef.scrollTop = vm.$store.state.scrollTops.home;
        vm.lastScrollTop = vm.$store.state.scrollTops.home;
      })
    }
  }
</script>

<style lang="scss" scoped>
    .home-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        padding-top: 46px;

        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .fade-enter-active, .fade-leave-active {
            transition: transform $quick-time $function;
        }
        .fade-enter, .fade-leave-to {
            transform: scale(0);
        }
        .home {
            .home-tips {
                position: absolute;
                bottom: 50px;
                left: 50%;
                .home-tips-text {
                    margin-left: 20px;

                    font-size: 16px;
                    color: $theme-color;
                }
                .home-tips-icon {
                    width: 68px;
                    height: 68px;

                    transform: rotate(180deg);
                }
            }
        }
    }

    .btn-add {
        position: absolute;
        bottom: 0;
        left: 50%;

        width: 46px;
        height: 46px;

        fill: $theme-color;

        transform: translate(-50%) scale(1);
        transition: transform $quick-time $function;

        user-select: none;

        &:active {
            transform: translate(-50%) scale(.7);
        }

        &.btn-add-hide {
            transform: translate(-50%) scale(0);
        }
    }
</style>
