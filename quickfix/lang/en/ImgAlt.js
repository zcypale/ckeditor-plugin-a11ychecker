/**
 * @todo: At the end this file will be minified.
 *
 * This file is generated from QuickFix source file in quickfix/ImgAlt.js with addition of lang property, taken from
 * quickfix/lang/en.js.
 */

( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( 'QuickFix', function( QuickFix ) {

		var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;

		/**
		 * Fixes the image with missing alt attribute.
		 *
		 * @constructor
		 */
		function ImgAlt( issue ) {
			QuickFix.call( this, issue );
		}

		/**
		 * Maximal count of characters in the alt. It might be changed to `0` to prevent
		 * length validation.
		 *
		 * @member CKEDITOR.plugins.a11ychecker.quickFix.AttributeRename
		 * @static
		 */
		ImgAlt.altLengthLimit = 100;

		ImgAlt.prototype = new QuickFix();
		ImgAlt.prototype.constructor = ImgAlt;

		ImgAlt.prototype.display = function( form ) {
			form.setInputs( {
				alt: {
					type: 'text',
					label: 'Alternative text',
					value: this.issue.element.getAttribute( 'alt' ) || ''
				}
			} );
		};

		ImgAlt.prototype.fix = function( formAttributes, callback ) {
			this.issue.element.setAttribute( 'alt', formAttributes.alt );

			if ( callback ) {
				callback( this );
			}
		};

		ImgAlt.prototype.validate = function( formAttributes ) {
			var ret = [],
				proposedAlt = formAttributes.alt + '';


			if ( !proposedAlt ) {
				ret.push( 'Alternative text can not be empty' );
			}

			// Test if the alt has only whitespaces.
			if ( proposedAlt.match( emptyWhitespaceRegExp ) ) {
				ret.push( 'Alternative text can not only contain whitespace characters' );
			}

			// Testing against exceeding max length.
			if ( ImgAlt.altLengthLimit && proposedAlt.length > ImgAlt.altLengthLimit ) {
				ret.push( 'Alternative text is too long. It should be up to ' + ImgAlt.altLengthLimit +
					' characters while your has ' + proposedAlt.length + '.' );
			}

			return ret;
		};

		ImgAlt.prototype.lang = {
			altLabel: 'Alternative text',
			errorTooLong: 'Alternative text is too long. It should be up to {limit} characters while your has {length}.',
			errorWhitespace: 'Alternative text can not only contain whitespace characters',
			errorEmpty: 'Alternative text can not be empty'
		};

		CKEDITOR.plugins.a11ychecker.quickFixes.add( 'ImgAlt', ImgAlt );
	} );
}() );