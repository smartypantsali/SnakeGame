/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*VARIABLES*/

// snake starting coordinates
var snakeXC = 3; 
var snakeYC = 3; 

// size of map
var height = 20; 
var width = 20;

// speed of snake
var interval = 100;

// size increase of snake per munch
var increment = 1; 
 
//game variables
// set initial length to 0
var length = 0;
// create arrays for snake tail
var tailXC = [snakeXC]; 
var tailYC = [snakeYC]; 
// fruit variables
var fruitXC;
var fruitYC;
// boolean for game to continue
var running = false;
// boolean for game to end
var gameOver = false;
// variables for direction: up = 0, down = 2, left = 3, right = 1
var direction;  
//
var interval;
// score starts off from zero
var score = 0; 
//temporary direction (this fixes users pressing keys too quickly and turning into themselves) 
var tempdir = direction; 
 
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*GAME AUTO*/

//Game start
function Run(){ 
    GameStart(); 
    interval = setInterval(GameUpdate, interval); 
} 
// Adds Map, snake and fruit onload 
function GameStart(){
    CreateMap(); 
    CreateSnake(); 
    CreateFruit();
} 

//check if game is running
function GameUpdate(){ 
    if(running && !gameOver){ 
        Update(); 
    }else if(gameOver){ 
        clearInterval(interval); 
    } 
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*OBJECTS*/

// CREATE MAP
function CreateMap(){  
    document.write("<table>"); 
 document.write("<tr>");
    for( var y = 0; y < height; y++){          
        for( var x = 0; x < width; x++){ 
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");             
        } 
        document.write("</tr>"); 
    } 
   document.write("</table>");   
} 

// CREATE SNAKE  
function CreateSnake(){ 
    Set(snakeXC, snakeYC, "snake"); 
} 

// GET X,Y FOR MAP
function Get(x,y){ 
    return document.getElementById(x+"-"+y); 
} 
 
// SET attributes for x,y values
function Set(x,y,value){ 
    if(x != null && y != null) 
        Get(x,y).setAttribute("class", value); 
} 

function GetType(x,y){ 
    return Get(x,y).getAttribute("class"); 
} 

// returns random number between the specified values
function Rand(min,max){ 
    return Math.floor(Math.random() * (max - min) + min); 
} 

//CREATE FRUIT 
function CreateFruit(){ 
    var ateFruit = false; 
    while(!ateFruit){ 
         fruitXC = Rand(1,width-1); 
         fruitYC = Rand(1,height-1); 
        if(GetType(fruitXC, fruitYC) == "blank"){
            ateFruit = true; } 
    } 
    Set(fruitXC, fruitYC, "fruit"); 
} 
 

// Functionality for the snake by pressing the keys by adding event listener

window.addEventListener("keypress", function Key(push){ 
    //if W is press snake moves up
    var keyNo = push.keyCode;
    if(direction != 2 && (keyNo == 119 || keyNo == 87 || keyNo == 38)) 
        tempdir = 0; 
    //if S is press snake moves down 
    else if(direction != 0 && (keyNo == 115 || keyNo == 83 || keyNo == 40)) 
        tempdir = 2; 
    //if A is press snake moves left 
    else if(direction != 1 && (keyNo == 97 || keyNo == 65 || keyNo == 37)) 
        tempdir = 3; 
    //if D is press snake moves right
    else if(direction != 3 && (keyNo == 100 || keyNo == 68 || keyNo == 39)) 
        tempdir = 1; 
    if(!running) 
        running = true; 
    else if(keyNo == 32) 
        running = false; 
}); 
 
// updates game while running
function Update(){ 
    direction = tempdir; 
    //Ensures that the fruit is displayed 
    Set(fruitXC, fruitYC, "fruit"); 
    //update the tail 
    UpdateTail(); 
    //sets the last segment of the tail to blank  before snake is moved
    Set(tailXC[length], tailYC[length], "blank"); 
    //updates the position of the snake according to the direction 
    if(direction == 0) 
        snakeYC--; 
    else if(direction == 2) 
        snakeYC++; 
    else if(direction == 3) 
        snakeXC--; 
    else if(direction == 1) 
        snakeXC++; 
    //draws the head of the snake on the tail 
    Set(snakeXC, snakeYC, "snake"); 
    //checks for collisions with self 
    for(var i = tailXC.length-1; i >=0; i--){ 
        if(snakeXC == tailXC[i] && snakeYC == tailYC[i]){ 
            gameOver = true; 
            break; 
        } 
    } 
    //checks for collision with wall 
    if(snakeXC == -1 || snakeXC == width || snakeYC == -1 || snakeYC == height) 
        gameOver = true; 
    //checks for collisions with fruit 
    else if(snakeXC == fruitXC && snakeYC == fruitYC){ 
        //adds 4 to the score 
        score+=5; 
        //creates new fruit, which automatically replaces the old one 
        CreateFruit(); 
        //adds the set increment to the length of the snake making it longer 
        length+=increment; 
    } 
    //set 
    document.getElementById("score").innerHTML = "Score: "+ score; 
} 
 
function UpdateTail(){ 
    for(var i = length; i > 0; i--){ 
        tailXC[i] = tailXC[i-1]; 
        tailYC[i] = tailYC[i-1]; 
    } 
    tailXC[0] = snakeXC; 
    tailYC[0] = snakeYC; 
} 

Run();