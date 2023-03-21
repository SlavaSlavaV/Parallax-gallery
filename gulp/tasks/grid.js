// https://sass-lang.com/documentation/breaking-changes/slash-div
// npm install -g sass-migrator усанавливается один раз глобально если уже установлен то не нужно повторять
// comand - "sass-migrator division **/*.sass" для преобразования файла в новый стандарт

// Сетка
import smartgrid from 'smart-grid';

// Smart grid settings
let gridSettings = {
	outputStyle: 'sass', /* less || scss || sass || styl */
	columns: 12, /* number of grid columns */
	offset: '30px', /* gutter width px || % || rem */
	mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
	container: {
			maxWidth: '1400px', /* max-width оn very large screen */
			fields: '20px' /* side fields */
	},
	breakPoints: {
			xxl: {
					width: '1400px', /* -> @media (min-width: 1400px) */
			},
			xl: {
					width: '1200px', /* -> @media (min-width: 1200px) */
			},
			lg: {
					width: '992px'
			},
			md: {
					width: '768px'
			},
			sm: {
					width: '576px',
					fields: '15px' /* set fields only if you want to change container fields */
			},
			xs: {
					width: '0px'
			}
			/* 
			We can create any quantity of break points.

			some_name: {
					width: 'Npx',
					fields: 'N(px|%|rem)',
					offset: 'N(px|%|rem)'
			}
			*/
	}
};

export const grid = async () => {
	smartgrid('src/scss', gridSettings);

	return app.gulp.src(`${app.path.srcFolder}`);
} // comand "npm run grid" - package.json "scripts"