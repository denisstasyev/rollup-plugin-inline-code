# rollup-plugin-inline-code

[![NPM version](https://img.shields.io/npm/v/rollup-plugin-inline-code.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-inline-code) [![NPM downloads](https://img.shields.io/npm/dm/rollup-plugin-inline-code.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-inline-code) [![Svelte v3](https://img.shields.io/badge/rollup-blueviolet.svg)](https://rollupjs.org/) ![Coverage](./coverage/badge-lines.svg) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Rollup plugin for inline scripts into code

## :rocket: Features

This Rollup plugin is like [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) plugin for Webpack

- Easy to use (simple configuration)
- Fully customizable: you can adjust it for yourself :t-rex:
- Suitable for inline JavaScript, TypeScript, SVG files (and any assets)
- Typescript code highlighting works :fire:
- Tests with Node.js 12, 14, 16

## Install

```bash
npm i rollup-plugin-inline-code
```

## Usage

Start by updating your **rollup.config.js** file

**rollup.config.js**

```javascript
import inlineCode from 'rollup-plugin-inline-code'

export default {
  input: ...,
  output: ...,
  plugins: [inlineCode()],
}
```

Then modify the import with the prefix `inline!`

**Any JavaScript or TypeScript file of your project**

```javascript
import html from 'common-tags/lib/html' // Optional template literal tag function to remove spaces inside HTML-like string

import INLINE_SCRIPT from 'inline!./src/assets/inline.js'
import INLINE_SVG from 'inline!./src/assets/sample.svg'

...

return html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ...
    </head>
    <body>
      <!-- Inline Script -->
      <script>
        ${INLINE_SCRIPT}
      </script>

      <!-- Inline SVG -->
      ${INLINE_SVG}

      ...
    </body>
  </html>
`
...
```

This [rollup-plugin-inline-code](https://github.com/denisstasyev/rollup-plugin-inline-code) replaces `INLINE_SCRIPT` and `INLINE_SVG` with file contents, success :confetti_ball:

## TypeScript syntax highlighting

You can simply fix the code highlighting when importing into Typescript files. To do this, you need to declare a global module

**src/typings/global.d.ts**

```typescript
declare module 'inline!*' {
  const inlineCode: string
  export default inlineCode
}
```

Then you need to modify **tsconfig.json** to set global typings path with the `typeRoots` option

**tsconfig.json**

```json
{
  "compilerOptions": {
    ...
    "typeRoots": ["node_modules/@types", "src/typings/global.d.ts"]
	...
  },
  ...
}
```

That's it, restart your TypeScript server and see no import errors :tada:

P.S. To restart the TypeScript server in VSCode, you need to open search (`Cmd+P` on MacOS) and then type `TypeScript: Restart TS server` with any open TypeScript file

## API

### Parameters

| Name   | Type   | Default   | Description                         |
| ------ | ------ | --------- | ----------------------------------- |
| prefix | string | `inline!` | Custom prefix to detect inline code |

To use parameters, pass them in **rollup.config.js** as shown below

**rollup.config.js**

```javascript
...
plugins: [inlineCode({ prefix: 'myCustomPrefix!' })]
...
```

## License

MIT &copy; [Denis Stasyev](https://github.com/denisstasyev)
