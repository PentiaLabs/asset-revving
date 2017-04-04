'use strict';

const Mustache = require('mustache');
const crypto = require('crypto');
const path = require('path');

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

	renaming( filename, contents, cacheHandlerPrefix ) {
		let renamed = path.basename(filename);

		if ( this.env === 'production' ) {
			let ext = path.extname(filename);
			let base = path.basename(filename, ext);

			let hash = crypto.createHash('md5').update( contents.toString() ).digest('hex');

			renamed = '' + base + cacheHandlerPrefix + hash + ext;
		}

		return renamed;
	}

	revving( file, contents, cacheHandlerPrefix ) {
		let template = this.templating();
		let rev = { file : this.renaming( file, contents, cacheHandlerPrefix ) };

		return {
			contents : Mustache.render(template, rev)
		}
	}
}

module.exports = AssetRevving;