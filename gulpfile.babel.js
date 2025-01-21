import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import jade from 'gulp-jade';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import minify from 'gulp-minify';
import imagemin from 'gulp-imagemin';
import sitemap from 'gulp-sitemap';
import cachebust from 'gulp-cache-bust';
import tildeImporter from 'node-sass-tilde-importer';
import robots from 'gulp-robots';
import data from 'gulp-data';
import fs from 'fs';

const city = 'gdl';
let dest;

if (city === 'gdl') {
  dest = './public';
} else if (city === 'leon') {
  dest = './public-leon';
} else if (city === 'qrt') {
  dest = './public-qrt';
} else {
  dest = './public-otra';
}
// const { watch } = require('gulp')

sass.compiler = require('node-sass');

const siteurl = 'https://aadoccsa.com.mx';

const server = browserSync.create();

const postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1',
    },
  }),
];

const stylesDev = () => {
  return gulp
    .src('./src/scss/styles.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(
      sass({
        importer: tildeImporter,
        outputStyle: 'expanded',
        includePaths: ['./node_modules'],
      })
    )
    .on('error', sass.logError)
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/css`))
    .pipe(server.stream({ match: '**/*.css' }));
};

const stylesBuild = () => {
  return gulp
    .src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(
      sass({
        importer: tildeImporter,
        includePaths: ['./node_modules'],
      })
    )
    .pipe(
      postcss([
        cssnano({
          core: false,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1',
          },
        }),
      ])
    )
    .pipe(gulp.dest(`${dest}/css`));
};

const pugDev = () => {
  return gulp
    .src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync('./src/data/data.json'));
      })
    )
    .pipe(
      jade({
        pretty: true,
        basedir: './src/jade',
      })
    )
    .pipe(gulp.dest(`${dest}`));
};

const pugBuild = () => {
  return gulp
    .src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync('./src/data/data.json'));
      })
    )
    .pipe(
      jade({
        pretty: true,
        basedir: './src/jade',
      })
    )
    .pipe(gulp.dest(`${dest}`));
};

const scriptsDev = () => {
  return browserify('./src/js/es5/scripts.js')
    .transform(babelify, {
      global: true, // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(
      minify({
        ext: {
          src: '-min.js',
          min: '.js',
        },
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/css`));
};

const scriptsBuild = () => {
  return browserify('./src/js/es5/scripts.js')
    .transform(babelify, {
      global: true, // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(
      minify({
        ext: {
          src: '-min.js',
          min: '.js',
        },
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/js`));
};

const imagesDev = () => {
  return gulp.src('./src/img/**/**').pipe(gulp.dest(`${dest}/img`));
};

const imagesBuild = () => {
  return gulp
    .src('./src/img/**/**')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest(`${dest}/img`));
};

const assetsDev = () => {
  return gulp.src('./src/assets/**/**').pipe(gulp.dest(`${dest}/assets`));
};

const products = () => {
  return gulp.src('./src/productos/**/**').pipe(gulp.dest(`${dest}/productos`));
};

const assetsBuild = () => {
  return gulp.src('./src/assets/**/**').pipe(gulp.dest(`${dest}/assets`));
};

const sitemapTask = () => {
  return gulp
    .src('./public/**/*.html', {
      read: false,
    })
    .pipe(
      sitemap({
        siteUrl: siteurl, // remplazar por tu dominio
      })
    )
    .pipe(gulp.dest(`${dest}`));
};
const robotsTask = () => {
  return gulp
    .src(`${dest}/**/*.html`)
    .pipe(
      robots({
        useragent: '*',
        allow: [''],
        disallow: ['cgi-bin/'],
      })
    )
    .pipe(gulp.dest(`${dest}`));
};

const cache = () => {
  return gulp
    .src(`${dest}/*.html`)
    .pipe(
      cachebust({
        type: 'timestamp',
      })
    )
    .pipe(gulp.dest(`${dest}`));
};

const serverInit = (done) => {
  server.init({
    server: {
      baseDir: './public',
    },
  });
};

const watch1 = () => {
  console.log('watch');
  watch(['src/scss/**.**'], () => {
    stylesDev;
  });
};

gulp.task(
  'dev',
  gulp.series(
    stylesDev,
    scriptsDev,
    pugDev,
    imagesDev,
    assetsDev,
    products,
    (done) => {
      console.log(dest);
      server.init({
        server: {
          baseDir: dest,
        },
        notify: false,
        browser: '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
      });
      gulp.watch('./src/scss/**/**').on('change', gulp.series(stylesDev));
      gulp
        .watch('./src/jade/**/**')
        .on('change', gulp.series(pugDev, server.reload));
      gulp
        .watch('./src/js/**/**')
        .on('change', gulp.series(scriptsDev, server.reload));
      gulp.watch('./src/img/**/**', gulp.series(imagesDev, server.reload));
      gulp.watch('./src/assets/**/**', gulp.series(assetsDev, server.reload));
      done();
    }
  )
);

gulp.task(
  'build',
  gulp.series(
    stylesBuild,
    pugBuild,
    scriptsBuild,
    imagesBuild,
    assetsBuild,
    products,
    cache,
    sitemapTask,
    robotsTask
  )
);

exports.stylesDev = stylesDev;
exports.stylesBuild = stylesBuild;
exports.pugDev = pugDev;
exports.pugBuild = pugBuild;
exports.scriptsDev = scriptsDev;
exports.scriptsBuild = scriptsBuild;
exports.imagesDev = imagesDev;
exports.imagesBuild = imagesBuild;
exports.assetsDev = assetsDev;
exports.assetsBuild = assetsBuild;
exports.sitemapTask = sitemapTask;
exports.cache = cache;
exports.robotsTask = robotsTask;
exports.products = products;
// exports.dev = dev
