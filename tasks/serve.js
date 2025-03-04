const gulp = require("gulp");

const imageMinify = require("./imageMinify");
const svgSprite = require("./spriteSVG");
const pngSprite = require("./spritePNG");
const styles = require("./styles");
const pug2html = require("./pug");
const script = require("./scripts");

const server = require("browser-sync").create();

// Запуск сервера а также слежка за файлами

module.exports = function serve(cb) {
  server.init({
    server: "dist",
    notify: false,
    open: true,
    cors: true,
  });

  gulp
    .watch(
      "src/assets/img/*/*.{gif,png,jpg,svg,webp}",
      gulp.series(imageMinify)
    )
    .on("change", server.reload);
  gulp
    .watch("src/assets/img/sprite/svg/*.svg", gulp.series(svgSprite))
    .on("change", server.reload);
  gulp
    .watch("src/assets/img/sprite/png/*.png", gulp.series(pngSprite))
    .on("change", server.reload);
  gulp
    .watch("src/assets/scss/**/*.scss", gulp.series(styles))
    .on("change", server.reload);
  gulp
    .watch("src/assets/js/**/*.js", gulp.series(script))
    .on("change", server.reload);
  gulp.watch("src/views/**/*.pug", gulp.series(pug2html));
  gulp.watch("dist/*.html").on("change", server.reload);

  return cb();
};
