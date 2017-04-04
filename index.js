'use strict';

const Mustache = require('mustache');

class AssetRevving {
	constructor( opts ) {
		this.mode = opts.mode;
		this.env = opts.env;
		this.main = opts.main;
	}

	templating( ) {
		let template = '';

		switch ( this.mode ) {
		case 'css': 
			template = '<link rel="stylesheet" type="text/css" href="{{file}}" />';
			break;

		case 'requirejs-dev':
			template = '<script data-main="{{main}}" src="{{file}}"></script>';
			break;

		case 'requirejs-production':
			template = '<script src="{{file}}"></script>';
			break;

		default:
			throw('Incorrect mode passed in:', this.mode );
		}

		return template;
	}

	renaming( filename ) {
		let renamed = filename;

		if ( this.env === 'production' ) {
            // TODO: do revving...
		}

		return renamed;
	}

	revving( file ) {
		let template = this.templating();
		let rev = { file : this.renaming( file ) };

		return Mustache.render(template, rev);
	}
}

module.exports = AssetRevving;