function Player(name, id){
// Player object has a name of some sort. 
this.name=name;
this.id=id;
this.position=0.0; 
this.dx=0.0;
}

Player.prototype.tryHarder = function(){
	this.dx +=0.5;
}

function Game(){

	this.players=[];
	this.intervalId = 0;
}



Player.prototype.step = function(){
	//This will help the players to increment a certain amount
	this.position += this.dx;
}

Player.prototype.render = function(){
	// // job is to display information about the player or the game. First approach to separate the console and DOM. 
	
	// console.log(this);
	//This is refactored to below:
	// We need someay to get it to move across
	$("#"+this.id).css("left", this.position + "px")

}

Game.prototype.add_players = function(player1, player2){
// need some sort of container that gives us flexibility to add multiple players. No need to be in the base of the Game, but something else to add and modify players. 
this.players.push(player1);
this.players.push(player2);
};

Game.prototype.onKeyUp = function(key){
// what is our driver code? What's our methodology?
	if (key === 80){
		this.players[0].tryHarder();

	}
	else if(key == 81){
		this.players[1].tryHarder();
	}
	
};
Game.prototype.finishIfWinner = function(){
	if(this.checkForWin()){
	clearInterval(this.intervalId)
	}
}

Game.prototype.checkForWin= function(){
	var winnerIsFound = false;
	for(var i = 0; i < this.players.length; i++){
		if(this.players[i].position >= 600){
			winnerIsFound = true;
		}
	}
	return winnerIsFound; 
}

Game.prototype.render = function(){
	console.log(this.players[0].render());
	console.log(this.players[1].render());
	console.log(this);
	// this allows us to render and see what the players are doing within the game, as well as what's happening in the Game overall. 
}



$(document).ready(function(){


	var player1 = new Player("Banana", "player1");
	var player2 = new Player("Kiwi", "player2" );

	var game = new Game();
	game.add_players(player1, player2);
	game.intervalId = setInterval(function(){
		for(var i = 0; i < game.players.length; i++){
			game.players[i].step();
			game.players[i].render();
		}
		game.finishIfWinner();
	}, 20)


	Game.prototype.stepPlayers = function(){
		console.log(this);
		console.log(this.players)
		for(var i = 0; i < this.players.length; i ++){
			this.players[i].step();
		}
	}

	$(document).on('keyup', function(event){
		game.onKeyUp(event.which);
		game.render(); 
		game.checkForWin();
	});

});

// What information is useful and necessary in the front end vs the backend?
// Keep JS OO by making a console viewer and a DOM viewer. If made effectiely, we can render things separately. 
// render function is like a controller. We can use it to tell what should appear. 
