import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; 
import webpcss from 'gulp-webpcss'; 
// import autoprefixer from 'gulp-autoprefixer'; 
// import groupCssMediaQueries from 'gulp-group-css-media-queries'; 
import autoprefixer  from 'autoprefixer';
import postCSS       from 'gulp-postcss';
import mqpacker      from 'css-mqpacker';
import sortCSSmq     from 'sort-css-media-queries'; 
import sourcemaps    from 'gulp-sourcemaps';


const sass = gulpSass(dartSass);

// export const scss = () => {
// 	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
// 	.pipe(app.plugins.plumber(
// 		app.plugins.notify.onError({
// 			title: "SCSS",
// 			message: "Error: <%= error.message %>"
// 		}))
// 	)
// 	.pipe(app.plugins.replace(/@img\//g, '../img/'))
// 		.pipe(sass({
// 			outputStyle: 'expanded'
// 		}))
// 		.pipe(
// 			app.plugins.if(
// 				app.isBuild,
// 				groupCssMediaQueries()
// 			)
// 		)
// 		.pipe(
// 			app.plugins.if(
// 				app.isBuild,
// 				webpcss(
// 					{
// 						webpClass: '.webp',
// 						noWebpClass: '.no-webp'
// 					}
// 				)
// 			)
// 		)
// 		.pipe(
// 			app.plugins.if(
// 				app.isBuild,
// 				autoprefixer({
// 					grid: true,
// 					overrideBrowserslist: ['last 5 versions'],
// 					cascade: true
// 				})
// 			)
// 		)
// 		.pipe(rename({
// 			basename: 'style'
// 		}))
//		// Закоментировать если не нужен - не сжатый файл стилей
// 		.pipe(app.gulp.dest(app.path.build.css))
// 		.pipe(
// 			app.plugins.if(
// 				app.isBuild,
// 				cleanCss({
// 					level: 2
// 				})
// 			)
// 		)
// 		.pipe(rename({
// 			extname: '.min.css'
// 		}))
// 		.pipe(app.gulp.dest(app.path.build.css))
// 		.pipe(app.plugins.browsersync.stream());
// }

export const scss = () => {
	let plugins = [
		autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true }),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		})
	];

	return app.gulp.src(app.path.src.scss)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "SCSS",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(
		app.plugins.if(
			app.isDev,
			sourcemaps.init({loadMaps: true})
		)
	)
	.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				postCSS(plugins)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
					{
						webpClass: '.webp',
						noWebpClass: '.no-webp'
					}
				)
			)
		)
		.pipe(rename({
			basename: 'style'
		}))
		// Закоментировать если не нужен - не сжатый файл стилей
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss({
					level: 2
				})
			)
		)
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(
			app.plugins.if(
				app.isDev,
				sourcemaps.write('.')
			)
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}