//var mocha  = require('mocha');
var expect = require('expect.js');
var PlayerClass = require('../src/Player.js');
var TennisContainer = require('../src/Tennis.js');
var TennisClass = TennisContainer.TennisClass;

describe('Tennis',function() {

	beforeEach(function() {
		tennis = new TennisClass();
		player1 = new PlayerClass().addPlayer('Rafa');
		player2 = new PlayerClass().addPlayer('Boris');
  });

	it('Tennis match have to be 2 players', function() {
		tennis.addPlayer(player1).addPlayer(player2);
		expect(tennis.players.length).to.be(2);
	});

	it('Tennis match throws exception when adds a non objetct', function() {		
		expect(function(){ tennis.addPlayer(1); }).to.throwException(function (e) { 
  		expect(e).to.be.a(TennisContainer.NotPlayerException);
		});
	});

	it('Tennis match throws exception when adds more than two players', function() {
		expect(function(){ 
			tennis.addPlayer(player1).addPlayer(player1).addPlayer(player1); 
		}).to.throwException(function (e) { 
  		expect(e).to.be.a(TennisContainer.TooManyPlayersException);
		});
	});

	it('Player adds points', function(){
		tennis.addPlayer(player1).addPlayer(player2).addPoints(player1);
		expect(tennis.points[player1.name]).to.be(1);		
	});

	it('Show correct scoreboard', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player2);
		expect(tennis.showScoreboard()).to.be('30 - 15');		

	});

	it('Match must have a winner', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player1).addPoints(player1);		

		expect(tennis.winner.name).to.be('Rafa');
	});	

	it('Both players have 40 points: deuce', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player1)
			.addPoints(player2).addPoints(player2).addPoints(player2);

		expect(tennis.showScoreboard()).to.be('Deuce');		

	});

	it('Player have advantage', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player1)
			.addPoints(player2).addPoints(player2).addPoints(player2)
			.addPoints(player1);

		expect(tennis.showScoreboard()).to.be('Advantage Rafa');		

	});

	it('Deuce after advantage', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player1)
			.addPoints(player2).addPoints(player2).addPoints(player2)
			.addPoints(player1).addPoints(player2);

		expect(tennis.showScoreboard()).to.be('Deuce');		

	});

	it('Win after advantage', function(){
		tennis.addPlayer(player1).addPlayer(player2)
			.addPoints(player1).addPoints(player1).addPoints(player1)
			.addPoints(player2).addPoints(player2).addPoints(player2)
			.addPoints(player1).addPoints(player2)
			.addPoints(player1).addPoints(player1);

		expect(tennis.winner.name).to.be('Rafa');

	});	

});