import del from 'del';

// Очистка папки dist
export const reset = () => {
	return del(app.path.clean);
}

