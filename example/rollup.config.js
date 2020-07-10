import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import html from '@open-wc/rollup-plugin-html';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: './src/main.js',
  plugins: [
    resolve(),
    babel({ babelHelpers: 'inline' }),
    copy({
      targets: [
        {
          src: 'node_modules/p5/lib/p5.min.js',
          dest: 'dist',
        },
      ],
    }),
    html({
      template: `<!DOCTYPE html>
      <html>
        <head>
        <meta charset="utf-8" />
        <title>P5 Playground</title>
        <style>body,html {margin:0;}</style>
        <script src="p5.min.js"></script>
        </head>
        <body></body>
      </html>`,
    }),
    !isProd && serve('dist'),
    !isProd && livereload(),
  ],
  output: {
    format: 'es',
    dir: 'dist',
  },
};
