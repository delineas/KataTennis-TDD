//var mocha  = require('mocha');
var expect = require('expect.js');
var PlayerClass = require('../src/Player.js');
var TennisContainer = require('../src/Tennis.js');
var TennisClass = TennisContainer.TennisClass;

describe('Tennis',function() {

	beforeEach(function() {
		tennis = new TennisClass();
  });

	it('Tennis match have to be 2 players', function() {
		//var t = new Tennis();
		var player1 = new PlayerClass().addPlayer('Rafa');
		var player2 = new PlayerClass().addPlayer('Boris');
		tennis.addPlayer(player1).addPlayer(player2);
		expect(tennis.players.length).to.be(2);
	});

	it('Tennis match throws exception when adds a non objetct', function() {
					
		expect(function(){ tennis.addPlayer(1); }).to.throwException(function (e) { 
  		expect(e).to.be.a(TennisContainer.NotPlayerException);
		});
	});

	it('Tennis match throws exception when adds more than two players', function() {
		var player1 = new PlayerClass().addPlayer('Rafa');
					
		expect(function(){ 
			tennis.addPlayer(player1).addPlayer(player1).addPlayer(player1); 
		}).to.throwException(function (e) { 
  		expect(e).to.be.a(TennisContainer.TooManyPlayersException);
		});
	});

	it('Player adds points', function(){
		var player1 = new PlayerClass().addPlayer('Rafa');
		var player2 = new PlayerClass().addPlayer('Boris');

		tennis.addPlayer(player1).addPlayer(player2).addPoints(player1);
		expect(tennis.points[player1.name]).to.be(1);		
	});

});