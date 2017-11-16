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
			template = '@inherits System.Web.Mvc.WebViewPage' + '\n' + '<link rel="stylesheet" type="text/css" href="{{{file}}}" />';
			break;

		case 'requirejs-dev':
			template = '@inherits System.Web.Mvc.WebViewPage' + '\n' + '<script data-main="{{{main}}}" src="{{{file}}}"></script>';
			break;

		case 'requirejs-production':
			template = '@inherits System.Web.Mvc.WebViewPage' + '\n' + '<script src="{{{file}}}"></script>';
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

			renamed = '' + base + ext + '?v=' + hash;
		}

		return renamed;
	}

	revving( file, contents, cacheHandlerPrefix ) {
		let assetPath = '';
		let renamed = this.renaming( file, contents, cacheHandlerPrefix );

		if ( this.env === 'production' ) {
			assetPath = '/dist/production/'
		}

		if ( this.env === 'development' ) {
			assetPath = '/dist/dev/'
		}

		let template = this.templating();
		let templateData = { file : '~' + assetPath + renamed };

		if (this.main) {
			templateData.main = assetPath + this.main;
		}

		return {
			contents : Mustache.render(template, templateData)
		}
	}
}

module.exports = AssetRevving;
