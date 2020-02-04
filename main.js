let game = document.getElementById('game');

let ctx = game.getContext('2d');

game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size)
}


function Crawler(x, y, color, width, height){
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// Create main Character
let trump = new Crawler(100, 300, 'hotpink', 50, 50);

// create array and push pipes into it
let pipes = [];
function createPipes() {
    let tPipe1 = new Crawler(263, 0, 'black', 80, 200);
    pipes.push(tPipe1);
    let tPipe2 = new Crawler(526, 0, 'black', 80, 250);
    pipes.push(tPipe2);
    var tPipe3 = new Crawler(790, 0, 'black', 80,100);
    pipes.push(tPipe3);
    let bPipe1 = new Crawler(263, 650, 'black', 80, -340);
    pipes.push(bPipe1);
    let bPipe2 = new Crawler(526, 650, 'black', 80, -290);
    pipes.push(bPipe2);
    let bPipe3 = new Crawler(790, 650, 'black', 80, -440);
    pipes.push(bPipe3);
    
    
    // loop thru array and render pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].render();
    }

}



// Render main character
trump.render();


function movementHandler(e) {
    switch (e.keyCode) {
        case(87):
        trump.y -=15;
        break;
        case (65):
        trump.x -=15;
        break;
        case (83):
        trump.y +=15;
        break;
        case(68):
        trump.x +=15;

    }
}

document.addEventListener('keydown', movementHandler);
// Call function that makes all pipes
createPipes();
let pipeCopy = pipes;
function gameLoop() {
    
    ctx.clearRect(0, 0, game.width, game.height);
    trump.render();
    pipes.forEach((pipe, i) => {
        // pipes[i].update(); can use this to call a function (that you have to write) to update your pipes every loop of the game and make them move from right to left

    pipes[i].x--;
    if(pipes[i].x == 110){
        let newPipe = new Crawler(790, 0, 'black', 80,100);
        
        pipes.push(newPipe);
    }

    if(pipes[i].x == 110){
        let newPipe = new Crawler(790, 650, 'black', 80, -440);
        
        pipes.push(newPipe);
    }
    
        
    pipe.render();
    })
}

let runGame = setInterval(gameLoop, 20);



