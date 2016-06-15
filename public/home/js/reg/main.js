define ( function ( require ) {
	
	require('jcookie');

	var Dialog = require('../common/dialog');
	var D = new Dialog();
	D.render();

	var Reg = require('./reg');
	var R = new Reg();
	R.render();

	var Music = require('../common/music');
	var M = new Music();
	M.render();

});