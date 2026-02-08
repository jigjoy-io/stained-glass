const path = require("path")
const rspack = require("@rspack/core")
const Dotenv = require("dotenv-webpack")
const { TsCheckerRspackPlugin } = require("ts-checker-rspack-plugin")
const { ModuleFederationPlugin, createModuleFederationConfig } = require("@module-federation/enhanced/rspack")

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]

module.exports = {
	entry: {
		main: path.join(__dirname, "../src/index.tsx"),
	},
	output: {
		publicPath: "auto",
	},
	mode: "development",
	target: "web",
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset",
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						sourceMap: true,
						jsc: {
							parser: {
								syntax: "typescript",
								tsx: true,
							},
							transform: {
								react: {
									runtime: "automatic",
								},
							},
						},
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["postcss-loader"],
				type: "css",
			},
		],
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: path.join(__dirname, "../index.html"),
		}),
		new Dotenv({
			path: "./.env",
			safe: true,
		}),
		new ModuleFederationPlugin(
			createModuleFederationConfig({
				name: "text_block_provider",

				exposes: {
					"./Text": "./src/text.tsx",
					"./TextIcon": "./src/text.icon.tsx",
				},
				shared: {
					react: {
						singleton: true,
						eager: true,
					},
					"react-dom": {
						singleton: true,
						eager: true,
					},
				},
			})
		),
		new TsCheckerRspackPlugin({
			typescript: {
				configOverwrite: {
					compilerOptions: {
						jsx: "react-jsx",
						allowJs: true,
					},
				},
			},
		}),
	],
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets },
			}),
		],
	},
	resolve: {
		extensions: [".jsx", ".tsx", ".ts", ".js", ".json"],
	},
	experiments: {
		css: true,
	},
}
