import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scrollTops: {},
    user: JSON.parse(sessionStorage.getItem("user")) || {},
    blogs: [],
    details: {},
    token: sessionStorage.getItem("token") || '',
    followers: [],
    following: [],
  },
  mutations: {
    SET_SCROLLTOPS(state, value) {
      state.scrollTops[value.key] = value.value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_BLOGS(state, value) {
      state.blogs = value;
    },
    SET_TOKEN(state, value) {
      state.token = value;
    },
    ADD_BLOG(state, value) {
      state.blogs.unshift(value);
    },
    DELETE_BLOG(state, value) {
      state.blogs.forEach((blog,index)=>{
        if(blog.id === value) {
          state.blogs.splice(index,1);
        }
      })
    },
    SET_DETAILS(state, value) {
      Vue.set(state.details, value.key, value.value)
    },
    DELETE_DETAILS(state,value) {
      Vue.delete(state.details, value)
    },
    SET_FOLLOWERS(state, value) {
      state.followers.push(value);
    },
    SET_FOLLOWING(state, value) {
      state.following.push(value);
    },
  },
  actions: {}
})
