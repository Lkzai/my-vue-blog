module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      //全局变量scss
      sass: {
        data: `
          @import "@/assets/styles/helpers/_variable.scss";
          @import "@/assets/styles/helpers/_mixin.scss";
        `
      }
    }
  }
};
