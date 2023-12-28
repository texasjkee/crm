const { override, addBabelPreset, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
    addBabelPreset("@emotion/babel-preset-css-prop"),
    addWebpackAlias({
        ["@components"]: path.resolve(__dirname, "./components"),
        ["@ui"]: path.resolve(__dirname, "./components/common/ui/*"),
        ["@api"]: path.resolve(__dirname, "./api/*"),
    })
);
