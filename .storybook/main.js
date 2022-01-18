const path = require("path");
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/addon-knobs",
		"@storybook/addon-docs",
    // { name: "@storybook/addon-docs", options: { configureJSX: true } },
    "@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    // config.devtool = "source-map";
		// config.module.rules.push({
		// 	test: /\.(ts|tsx)$/,
		// 	use: [
		// 		{
		// 			loader: require.resolve("react-docgen-typescript-loader"),
		// 		},
		// 	],
		// });
		// config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
      // '@shared': path.resolve(__dirname, '../src/shared')
    }
		return config;
	},
}
