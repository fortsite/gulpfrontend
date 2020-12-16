const gulp = require("gulp");
const buffer = require("vinyl-buffer");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sink = require("gulp-clone").sink();

// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return gulp
    .src([
      "src/assets/img/**/*.{gif,png,jpg,svg}",
      "!src/assets/img/sprite/**/*",
    ])

    .pipe(buffer())

    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(sink)
    .pipe(webp())
    .pipe(sink.tap())

    .pipe(gulp.dest("dist/assets/img/"));
};
