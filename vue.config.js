const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Rename Subtitle",
        appId: "me.jongwoo.rename-subtitle",
        win: {
          icon: "public/icon.png",
        },
      },
    },
  },
});
