// Config file for running Rollup in "normal" mode (non-watch)

import rollupGitVersion from 'rollup-plugin-git-version';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import gitRev from 'git-rev-sync';
import pkg from '../package.json';

let { version } = pkg;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
  release = true;
} else {
  release = false;
  const branch = gitRev.branch();
  const rev = gitRev.short();
  version += `+${branch}.${rev}`;
}

const banner = `/* @preserve
 * IndoorJS ${version}, a JS library for interactive indoor maps. https://mudin.github.io/indoorjs
 * (c) 2019 Mudin Ibrahim
 */
`;

const outro = `var oldI = window.I;
exports.noConflict = function() {
	window.I = oldI;
	return this;
}
// Always export us to window global (see #2364)
window.I = exports;`;


export default {
  input: 'src/Indoor.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'Indoor',
      banner,
      outro:outro,
      sourcemap: true,
      globals:{
        fabric:'fabric',
        impetus:'impetus',
        eventemitter2:'EventEmitter2',
        EventEmitter2:'eventemitter2'
      }
    },
    {
      file: 'dist/indoor.esm.js',
      format: 'es',
      banner,
      sourcemap: true
    }
  ],
  plugins: [
    commonjs({
      include: 'src/lib/panzoom.js'
    }),
    release ? json() : rollupGitVersion(),
    babel({
      exclude: 'node_modules/**'
    }),
    globals(),
    builtins()
  ]
};
