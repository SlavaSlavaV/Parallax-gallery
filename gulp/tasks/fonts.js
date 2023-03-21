import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// Ищем файлы .otf и конвертируем в .ttf 
export const otfToTtf = () => {
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}

// Ищем файлы .ttf и конвертируем в .woff, .woff2
export const ttfToWoff = () => {
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

// Подключение шрифтов в стили

export const fontsStyle = () => {
	let fontsFile = `${app.path.srcFolder}/scss/fonts.sass`;
	
	fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
		// Проверяем существует ли файл шрифтов
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет создаём его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей, есл style==italic нужно изменить "style:" в файле scss/fonts.sass
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontFamily = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						switch (fontWeight.toLowerCase()) {
							case 'thin':
								fontWeight = 100;
								break;
							case 'thinitalic':
								fontWeight = 100;
								break;
							case 'extralight':
								fontWeight = 200;
								break;
							case 'extralightitalic':
								fontWeight = 200;
								break;
							case 'light':
								fontWeight = 300;
								break;
							case 'lightitalic':
								fontWeight = 300;
								break;
							case 'medium':
								fontWeight = 500;
								break;
							case 'mediumitalic':
								fontWeight = 500;
								break;
							case 'semibold':
								fontWeight = 600;
								break;
							case 'semibolditalic':
								fontWeight = 600;
								break;
							case 'bold':
								fontWeight = 700;
								break;
							case 'bolditalic':
								fontWeight = 700;
								break;
							case 'extrabold':
								fontWeight = 800;
								break;
							case 'extrabolditalic':
								fontWeight = 800;
								break;
							case 'black':
								fontWeight = 900;
								break;
							case 'blackitalic':
								fontWeight = 900;
								break;
							default: 
								fontWeight = 400;
						}
						fs.appendFile(fontsFile, `@font-face \n\tfont-family: ${fontFamily}\n\tfont-display: swap\n\tfont-weight: ${fontWeight}\n\tfont-style: normal\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff")\n\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл уже существует, выводим сообщение 
				console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() {}
}