
(function(){

	var PlayerClass = function(){

	};

	PlayerClass.prototype.addPlayer = function(playerName){
		this.name = playerName;
		return this;
	};

	if (typeof module !== 'undefined' && 'exports' in module)
    module.exports = PlayerClass;

})();