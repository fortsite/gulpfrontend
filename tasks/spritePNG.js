const gulp = require("gulp");
const buffer = require("vinyl-buffer");
const imagemin = require("gulp-imagemin");
const merge = require("merge-stream");

const spritesmith = require("gulp.spritesmith");

module.exports = function spritePNG() {
  // Генерируем спрайт
  const spriteData = gulp.src("src/assets/img/sprite/png/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      imgPath: "../img/sprite/sprite.png",
      cssName: "sprite.scss",
      padding: 5,
      cssVarMap: function (sprite) {
        sprite.name = "icon-" + sprite.name;
      },
    })
  );

  // Оптимизируем спрайт
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img/sprite/"));

  // Собираем SCSS
  const cssStream = spriteData.css.pipe(gulp.dest("src/assets/scss/utils/"));

  return merge(imgStream, cssStream);
};
