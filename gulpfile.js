// Фрилансер по жизни - IT и фриланс https://www.youtube.com/watch?v=jU88mLuLWlk&t=3432s

// Основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаём значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
};

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { grid } from './gulp/tasks/grid.js';

// Наблюдатель за изменениями в файлах
function watcher () {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
} // ели хотим изменять файлы автоматически на сервере то для каждого наблюдателя заменить: 
  // пример - вместо (... ,html) записать (..., gulp.series(html, ftp)).

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Построение сценириев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks); 
const deployZip = gulp.series(reset, mainTasks, zip); 
const deployFTP = gulp.series(reset, mainTasks, ftp);
const clean = gulp.series(reset); 

// Экспорт сценариев
export { grid };      // comand "npm run grid" - package.json "scripts"
export { dev };				// comand "npm run dev" - package.json "scripts"
export { build };     // comand "npm run build" - package.json "scripts"
export { deployZip }; // comand "npm run zip" - package.json "scripts"
export { deployFTP }; // comand "npm run deploy" - package.json "scripts"
export { clean }; // comand "npm run clean" - package.json "scripts"

// Выполнение сценария по умолчанию
gulp.task('default', dev);