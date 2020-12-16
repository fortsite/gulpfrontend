const gulp = require("gulp");
const script = require("./tasks/scripts");
const fonts = require("./tasks/fonts");
const vendors = require("./tasks/vendorsJS");
const imageMinify = require("./tasks/imageMinify");
const styles = require("./tasks/styles");
const clean = require("./tasks/clean");
const pug2html = require("./tasks/pug");
const spriteSVG = require("./tasks/spriteSVG");
const serve = require("./tasks/serve");
const spritePNG = require("./tasks/spritePNG");

const dev = gulp.parallel(
  pug2html,
  script,
  vendors,
  styles,
  imageMinify,
  spriteSVG,
  spritePNG,
  fonts
);

exports.default = gulp.series(clean, dev, serve);
