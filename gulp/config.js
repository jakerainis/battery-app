var dest = './build';
var src = './app';

module.exports = {
	app: './app',
	build: './build',
	browserSync: {
		server: {
			// We're serving the src folder as well for sass sourcemap linking
			baseDir: [dest, src]
		},
		notify: false, //hide the annoying notification
		files: [
			dest + '/**',
			// Exclude Map files
			'!' + dest + '/**.map'
		]
	},
	compass: {
		src: src + '/styles/sass/**/*.{sass,scss}',
		dest: dest + '/styles',
		settings: {
			bundleExec: true,
			css: dest + '/styles',
			debug: false,
			// font: src + '/fonts',
			// image: src + '/images',
			relative: false,
			require: ['breakpoint', 'sass-globbing', 'susy', 'normalize-scss'],
			sass: src + '/styles/sass',
			sourcemap: true,
			style: 'compressed'
		}
	},
	fonts: {
		src: src + '/fonts/**',
		dest: dest + '/fonts'
	},
	images: {
		src: src + '/images/**/*',
		dest: dest + '/images'
	},
	markup: {
		src: src + '/**/*.html',
		dest: dest
	},
	scripts: {
		all: src + '/scripts/**/*.js',
		modules: src + '/scripts/modules',
		src: src + '/scripts/app.js',
		dest: dest + '/scripts',
		libsSrc: src + '/scripts/libs/**/*.js',
		libsDest: dest + '/scripts/libs/'
	}
};
