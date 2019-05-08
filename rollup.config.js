import pkg from "./package.json"
import resolve from "rollup-plugin-node-resolve"
import { uglify } from "rollup-plugin-uglify"

const year = new Date().getFullYear()
const banner = `/*\nFlexivue ${pkg.version}\nCopyright © ${year} ${pkg.author} <cenxky@gmail.com>\n*/`

const uglifyOptions = {
  mangle: false,
  compress: false,
  output: {
    beautify: true,
    indent_level: 2,
    comments: /Copyright/
  }
}

export default {
  input: pkg.module,
  output: {
    file: "dist/flexivue.umd.js",
    format: "umd",
    name: "Flexivue",
    banner
  },
  context: "window",
  plugins: [
    resolve(),
    uglify(uglifyOptions)
  ],
  external: ['Vue']
}
