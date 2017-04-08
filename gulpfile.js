var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfigProd = require('./webpack.config.js');
var cache = require('gulp-cache');
var packageFile = require('package')('.');
var exec = require('child_process').exec;
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var lessBaseImport = require('gulp-less-base-import');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var path = require('path');
var oss = require('gulp-oss');
var gzip = require("gulp-gzip");
var del = require('del');
// var sentryRelease = require('gulp-sentry-release')('./package.json', {
//     DOMAIN: 'http://pxzsh5.onetalent.cn', // prefix domain in the `name` param when upload file. Leave blank to use path. Do not add trailing slash
// 	API_URL: 'https://app.getsentry.com/api/0/projects/onetalent-tech/onetalent-pxzs/',
// 	API_KEY: '338eda0257714ebe8bbedcc9516ab571',
// 	debug: true ,
// 	versionPrefix: '',
// });

var BUILD_DIR = 'dist';
var SRC_DIR = 'src';
var TEST_DIR = 'test';
var IMG_SRC_DIR = 'images';
var IMG_DEST_DIR = 'images';
var COMPONENT_SRC_DIR = 'components';
var COMPONENT_DEST_DIR = 'components';
var JS_LIB_SRC_DIR = 'lib';
var JS_LIB_DEST_DIR = 'lib';

var IMAGE_TO_COMPRESS = '.jpg,.png,.svg,.gif';

gulp.task('clean', function(done) {
    del([path.join(BUILD_DIR, '**')]).then(function() {
        done();
    });
});

gulp.task('sentry:release', ['webpack'], function() {
    return gulp.src([path.join(BUILD_DIR, 'js/page', '*')], {base: '.'})
               .pipe(sentryRelease.release());
});

gulp.task('image compression', ['clean'], function() {
    return gulp.src([path.join(SRC_DIR, IMG_SRC_DIR, '**')])
          .pipe(cache(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()]
          }), {
              fileCache: new cache.Cache({cacheDirName: packageFile.name + '-cache'})
          }))
          .pipe(gulp.dest(path.join(BUILD_DIR, IMG_DEST_DIR)));
});

gulp.task('update img to oss', ['image compression'], function() {
    var config = require('./conf/prod');

    return gulp.src(path.join(BUILD_DIR, IMG_SRC_DIR, '**'))
           .pipe(gzip({append: false}))
           .pipe(cache(oss({
                    "key": config['@ALIYUN'].ACCESS_KEY_ID,
                    "secret": config['@ALIYUN'].ACCESS_KEY_SECRET,
                    "endpoint": 'http://' + config['@ALIYUN'].OSS_ENDPOINT
                }, {
                    headers: {
                      Bucket: config['@ALIYUN'].BUCKET,
                      ContentEncoding: 'gzip'
                    },
                    uploadPath: config['@ALIYUN'].APP_IMG_DIRECTORY + '/'
                }), {
                    fileCache: new cache.Cache({cacheDirName: packageFile.name + '-cache-oss-img'})
          }));
});

gulp.task('webpack', ['clean'], function(done) {
    return webpack(webpackConfigProd, function(err, stats) {
        var output = stats.toString();
        if(output.indexOf('ERROR') !== -1) {
            console.log(output);
            return done(new Error('webpack build failed'));
        }
        done();
    });
});

gulp.task('compile less', ['clean'], function() {
    var processors = [autoprefixer, cssnano({zindex: false, reduceIdents: false})];

    return gulp.src([path.join(SRC_DIR, '**/*.less')])
               .pipe(plumber())
               .pipe(lessBaseImport(webpackConfigProd.lessImportLoader.base))
               .pipe(less())
               .pipe(postcss(processors))
               .pipe(gulp.dest(path.join(BUILD_DIR)));
});
gulp.task('compile less once', [], function() {
    var processors = [autoprefixer, cssnano({zindex: false, reduceIdents: false})];

    return gulp.src([path.join(SRC_DIR, '**/*.less')])
               .pipe(plumber())
               .pipe(lessBaseImport(webpackConfigProd.lessImportLoader.base))
               .pipe(less())
               .pipe(postcss(processors))
               .pipe(gulp.dest(path.join(BUILD_DIR)));
});

gulp.task('compile ts', ['clean'], function() {
    return tsProject
    .src() 
    .pipe(tsProject())
    .js
    .pipe(gulp.dest(path.join(BUILD_DIR)));
});
gulp.task('compile ts once', [], function() {
    return tsProject
    .src() 
    .pipe(tsProject())
    .js
    .pipe(gulp.dest(path.join(BUILD_DIR)));
});

gulp.task('compile tests', ['clean'], function() {
    return gulp.src(path.join(TEST_DIR, '**/*.babel'))
               .pipe(babel())
               .pipe(gulp.dest(path.join(BUILD_DIR, TEST_DIR)));
});

gulp.task('move lib', ['clean'], function() {
    return gulp.src(path.join(SRC_DIR, JS_LIB_SRC_DIR, '*')).pipe(gulp.dest(path.join(BUILD_DIR, JS_LIB_DEST_DIR)));
});
gulp.task('move lib once', [], function() {
    return gulp.src(path.join(SRC_DIR, JS_LIB_SRC_DIR, '*')).pipe(gulp.dest(path.join(BUILD_DIR, JS_LIB_DEST_DIR)));
});

gulp.task('watch webpack', [], function() {
    try {
        var action = function() {
            exec('webpack --watch -d --config webpack.dev.config.js', function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if(err) {
                    console.log(err);
                    action();
                }
            });
        };
        action();
    } catch(e) {
        console.log(e);
    }
});

gulp.task('watch ts', ['compile ts once'], function() {
    gulp.watch([path.join(SRC_DIR, '**/*.{ts,tsx}')], ['compile ts once']);
});

gulp.task('watch less', ['compile less once'], function() {
    gulp.watch(path.join(SRC_DIR, '**/*.less'), ['compile less once']);
});

function watchThingsOnlyMove(src, dest) {
    gulp.src(src).pipe(gulp.dest(dest));

    gulp.watch((src), function() {
        gulp.src(src).pipe(gulp.dest(dest));
    });
}

gulp.task('move img', [], function() {
      return gulp.src(path.join(SRC_DIR, IMG_SRC_DIR, '**')).pipe(gulp.dest(path.join(BUILD_DIR, IMG_DEST_DIR)));
});

gulp.task('watch lib', ['move lib once'], function() {
    gulp.watch(path.join(SRC_DIR, JS_LIB_SRC_DIR, '**'), ['move lib once']); 
});
gulp.task('watch img', ['move img'], function() {
    gulp.watch(path.join(SRC_DIR, IMG_SRC_DIR, '**'), ['move img']);
});

// gulp.task('default', ['clean', 'image compression', 'update img to oss', 'compile ts', 'webpack', 'compile less', 'move lib']);
// gulp.task('default', ['clean', 'move img', 'compile ts', 'webpack', 'compile less', 'move lib']);
gulp.task('default', ['clean', 'compile ts', 'webpack', 'compile less', 'move lib']);
gulp.task('dev', ['watch webpack', 'watch ts', 'watch lib', 'watch img', 'watch less']);
gulp.task('test', ['babel', 'compile less', 'compile tests'], function() {
    return gulp.src(path.join(BUILD_DIR, TEST_DIR, 'spec.js'), {read: false})
               .pipe(mocha());
});
gulp.task('cov', [], function(done) {
    exec('istanbul cover _mocha dist/test/spec.js -- -R spec', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        if(err !== null) {
            console.error('code coverage failed!');
            process.exit(1);
        } else {
            done();
            exec('open coverage/lcov-report/index.html');
        }
    });
});
