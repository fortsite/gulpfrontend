const gulp = require("gulp");
const htmlValidator = require("gulp-w3c-html-validator");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");
const webphtml = require("gulp-webp-html");
// Преобразуем Pug в HTML

module.exports = function pug2html() {
  return gulp
    .src("src/views/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(plumber.stop())
    .pipe(gulpif(argv.prod, htmlValidator()))
    .pipe(webphtml())
    .pipe(gulp.dest("dist"));
};
