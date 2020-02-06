let game = document.getElementById('game');

let ctx = game.getContext('2d');




game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size)
}


function Crawler(x, y, color, width, height, src){
    this.x = x;
    this.y = y;
    this.color = color;
    this.src = src;
    this.img = document.createElement("img");
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        if (this.src) {
            this.img.src = this.src
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
// Create main Character
let trump = new Crawler(100, 300, "white", 90, 90, "trump.png");

// create array and push pipes into it
let pipes = [];
function createPipes() {
    // alternate top and bottom pipe, even indecies are top, odd are bottom

    let tPipe1 = new Crawler(263, 0, 'black', 80, 200, "nan.jpeg");
    pipes.push(tPipe1);
    let bPipe1 = new Crawler(263, 650, 'black', 80, -340, "nan.jpeg");
    pipes.push(bPipe1);
    let tPipe2 = new Crawler(526, 0, 'black', 80, 250, "nan.jpeg");
    pipes.push(tPipe2);
    let bPipe2 = new Crawler(526, 650, 'black', 80, -290, "nan.jpeg");
    pipes.push(bPipe2);
    var tPipe3 = new Crawler(790, 0, 'black', 80,100, "nan.jpeg");
    pipes.push(tPipe3);
    let bPipe3 = new Crawler(790, 650, 'black', 80, -440, "nan.jpeg");
    pipes.push(bPipe3);
    let tPipe4 = new Crawler(1053, 0, 'black', 80,300, "nan.jpeg");
    pipes.push(tPipe4);
    let bPipe4 = new Crawler(1053, 650, 'black', 80, -240, "nan.jpeg");
    pipes.push(bPipe4);
    
    
   
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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
let pipeCopy = [...pipes];

function lost() {
//stop game
clearInterval(runGame);
 // have words come on top
 let lost = document.getElementById("lost")
 lost.textContent = "IMPEACHED!!!";
 
}


 function gameStart() {
   let start =  document.getElementById("start").addEventListener("click");
 }


function gameLoop() {


    
    ctx.clearRect(0, 0, game.width, game.height);
    trump.render();
    pipes.forEach((pipe, i) => {
        // pipes[i].update(); can use this to call a function (that you have to write) to update your pipes every loop of the game and make them move from right to left

        // moves pipe left
        
        pipes[i].x--;

        // checks to see that the pipes width is passed 0
        if(pipes[i].x + pipes[i].width < 0){
            
            
           // checks if even
            if (i%2 === 0){
                // lets the pipe start outside the canvas
                let newTopPipe = new Crawler(990, 0, 'black', 80, getRndInteger(200, 300), "nan.jpeg");
                pipes[i] = newTopPipe;
            }
            
            // checks if odd
            if (i%2 != 0) {
                // lets the pipe start outside the canvas
                let newBottomPipe = new Crawler(990, 650, 'black', 80, getRndInteger(-300, -170), "nan.jpeg");
                pipes[i] = newBottomPipe; 
            }
        }
            
        pipe.render();
        if (hitD(pipe, i)){
            lost(); 
        }
        
    })
    //console.log(pipes.length)
}

function hitD(currPipe, index){
    // if trump x is = to pipe x 
    if (trump.x === currPipe.x) {
        if (index % 2 === 0) {
            if (trump.x < currPipe.x + currPipe.width
                && trump.x + trump.width > currPipe.x
                && trump.y < currPipe.y + currPipe.height
                && trump.y + trump.height > currPipe.y){
                 console.log("in conditional");  
                return true;
            }
            
        } else if (index % 2 != 0) {
            if (trump.y >= currPipe.y + currPipe.height && trump.y <= 555) {
                 console.log("testing is this even working");
                return true;
            }
        }
        return false;
    }
          

    
                

    }   

    




let runGame = setInterval(gameLoop, 5);



