//var mocha  = require('mocha');
var expect = require('expect.js');
var PlayerClass = require('../src/Player.js');

describe('Players',function() {
	it('Player adds correctly', function() {
		//var t = new Tennis();
		var player = new PlayerClass().addPlayer('Rafa');
		expect(player.name).to.be('Rafa');
	});

});