const { src, dest, parallel, watch } = require('gulp');
const $ = require('./modules.js');
const uglify = $.composer($.uglifyes, $.composer);

const path = {
  src: './src',
  dist: './dist',
};

function html() {
  return src([`${path.src}/pug/*.pug`, `!${path.src}/pug/**/_*.pug`])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe(dest(`${path.src}/before_compression/html`))
    .pipe(
      $.minifyHTML({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(dest(path.dist))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true,
      })
    );
}

function css() {
  return src(`${path.src}/scss/*.scss`)
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(dest(`${path.src}/before_compression/css`))
    .pipe(
      $.rename({
        suffix: '.min',
      })
    )
    .pipe($.minifyCSS())
    .pipe(dest(`${path.dist}/css`))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true,
      })
    );
}

function js() {
  return src(`${path.src}/js/**/*.js`, { sourcemaps: true })
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      $.rename({
        suffix: '.min',
      })
    )
    .pipe(uglify())
    .pipe(dest(`${path.dist}/js`, { sourcemaps: true }))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true,
      })
    );
}

function img() {
  return src(`${path.src}/images/**/**`)
    .pipe($.changed(`${path.dist}/images/`))
    .pipe(
      $.imagemin([
        $.pngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        $.mozjpeg({ quality: 85, progressive: true }),
        $.imagemin.svgo(),
        $.imagemin.optipng(),
        $.imagemin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(dest(`${path.dist}/images/`));
}

function bs() {
  $.browserSync.init({
    server: {
      baseDir: path.dist,
    },
    notify: true,
    xip: false,
  });
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.bs = bs;
exports.img = img;

exports.default = parallel([html, css, js, img, bs], () => {
  watch(`${path.src}/pug/**`, html);
  watch(`${path.src}/scss/**`, css);
  watch(`${path.src}/js/**`, js);
  watch(`${path.src}/images/**`, img);
});
