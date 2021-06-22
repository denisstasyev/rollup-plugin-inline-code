// Babel is used to transpile Jest test files from TypeScript into JavaScript

module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript'
	],
	plugins: [
		// Babel doesn't use .tsconfig.json file, "babel-plugin-module-resolver" implements "baseUrl" option
		["module-resolver", {
			"root": ["."],
			"alias": {
				"src": "./src",
			}
		}]
	]
}
