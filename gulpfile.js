let project_folder = require("path").basename(__dirname),
    source_folder = "src",
    path = {
        build: {
            html: project_folder + "/",
            css: project_folder + "/css/",
            js: project_folder + "/js/",
            img: project_folder + "/img/",
        },
        src: {
            pug: [source_folder + "/*.pug", "!" + source_folder + "/_*.pug"],
            css: source_folder + "/sass/style.sass",
            js: source_folder + "/js/script.js",
            img: source_folder + "/img/**/*.{jpg,png,svg,gif,webp,mp4}",
        },
        clean: "./" + project_folder + "/",
    };

let { src, dest, parallel, series } = require('gulp'),
    fs = require('fs'),
    gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    scss = require('gulp-sass'),
    gulpGroupCssMediaQueries = require('gulp-group-css-media-queries'),
    imagemin = require('gulp-imagemin'),
    pug = require('gulp-pug');

function html() {
    return src(path.src.pug)
        .pipe(pug({
            pretty: true,
        }))
        .pipe(dest(path.build.html))
}

function css() {
    return src(path.src.css)
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(gulpGroupCssMediaQueries())
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [
                    {
                        removeViewBox: false
                    }
                ],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.img))
}

function clean(params) {
    return del(path.clean)
}

let build = series(clean, parallel(images, js, css, html));

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;