var PlayerClass = require('./Player.js');

(function(){

	var NotPlayerException = function(){};
	var TooManyPlayersException = function(){};

	var TennisClass = function(){
		this.players = [];
		this.points = [];
	};

	var isPlayer = function(player) {
		return player instanceof PlayerClass;
	}

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
	};

	if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports.TennisClass = TennisClass;
    module.exports.NotPlayerException = NotPlayerException;
    module.exports.TooManyPlayersException = TooManyPlayersException;
  }


})();