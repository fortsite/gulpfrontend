const gulp = require("gulp");

// Копируем все шрифты из папки dev в dist

module.exports = function fonts() {
  return gulp
    .src("src/assets/fonts/**/*.*")
    .pipe(gulp.dest("dist/assets/fonts"));
};
