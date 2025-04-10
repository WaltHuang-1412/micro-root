const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // ✅ 加入 plugin

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "vue-micro";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "dist/index.html", // ✅ build 後的 HTML
            to: "404.html", // ✅ 複製成 404.html
            noErrorOnMissing: true,
            force: true,
          },
        ],
      }),
    ],
  });
};
