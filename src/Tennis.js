var _ = require('underscore');
var PlayerClass = require('./Player.js');

var NotPlayerException = function(){};
var TooManyPlayersException = function(){};

var TennisClass = function(){

	var that = this;
	this.players = [];
	this.points = [];
	this.matchDeuce = false;
	this.advantage = '';
	this.winner = [];

	var isPlayer = function(player) {
		return player instanceof PlayerClass;
	};

	var setMatchDeuce = function() {
		var pointsPlayer = [];
		_.each(that.players, function(player){
			pointsPlayer.push(that.points[player.name]);
		});
		if(pointsPlayer[0] == 3 && pointsPlayer[1] == 3)
			that.matchDeuce = true;
		return that.matchDeuce;

	};

	var translatePoints = function(player){
		var pointsPlayer = that.points[player.name];
		var pointsTennis = [0, 15, 30, 40, 'game'];
		if(pointsPlayer < pointsTennis.length) {
			return pointsTennis[pointsPlayer];
		}
	};

	TennisClass.prototype.addPlayer = function(player){
		if(!isPlayer(player))
			throw new NotPlayerException();
		else if(this.players.length == 2)
			throw new TooManyPlayersException();
		else {
			this.players.push(player);
			this.points[player.name] = 0;
		}

		return this;
	};

	TennisClass.prototype.addPoints = function(player){
		this.points[player.name] += 1;
		setMatchDeuce();
		if(this.matchDeuce && this.points[player.name] == 4) {
			if(this.advantage === '') {
				this.advantage = player.name;
			}
			else if(this.advantage !== '') {
				if(this.advantage == player.name) {
					this.winner = player;
				}
				this.advantage = '';
			}
			this.points[player.name] -= 1;
		}
		else if(this.points[player.name] == 4)
			this.winner = player;
		return this;
	};

	TennisClass.prototype.showScoreboard = function(){
		var scores = [];
		var scoreboard = '';
		_.each(this.players, function(player){
			var pointsTrans = translatePoints(player);
			scores.push(pointsTrans);
		});
		scoreboard = scores.join(' - ');
		if(this.matchDeuce && this.advantage === '') {
			scoreboard = 'Deuce';
		}
		else if(this.advantage !== '') {
			scoreboard = 'Advantage '+this.advantage;
		}
		return scoreboard;
	};
};

if (typeof module !== 'undefined' && 'exports' in module) {
  module.exports.TennisClass = TennisClass;
  module.exports.NotPlayerException = NotPlayerException;
  module.exports.TooManyPlayersException = TooManyPlayersException;
}