const gulp = require("gulp");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify-es").default;

// Работа со скриптами

module.exports = function script() {
  return gulp
    .src("./src/assets/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(gulpif(argv.prod, uglify().on("error", notify.onError())))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/assets/js"))
    .pipe(browserSync.stream());
};

// module.exports = function script() {
//   return gulp
//     .src("src/assets/js/*.js")
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(
//       babel({
//         presets: ["@babel/preset-env"],
//       })
//     )
//     .pipe(gulpif(argv.prod, uglify()))
//     .pipe(gulp.dest("dist/assets/js/"));
// };
