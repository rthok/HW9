/* 
    Author : Ravy Thok                                      
    Email : ravy_thok@student.uml.edu                             
    School : UMass Lowell                                        
    Course : COMP 4610 - GUI Programming I                       
    Assignment :  No.9: Implementing a Bit of Scrabble with Drag-and-Drop    
    Filename: myjavascript.js
 */



//Creating the Scrabble tiles
var tiles = [];
tiles["A"] = {"value": 1, "pieces": 9, "inplay": 9, image: "A.jpg"};
tiles["B"] = {"value": 3, "pieces": 2, "inplay": 2, image: "B.jpg"};
tiles["C"] = {"value": 3, "pieces": 2, "inplay": 2, image: "C.jpg"};
tiles["D"] = {"value": 2, "pieces": 4, "inplay": 4, image: "D.jpg"};
tiles["E"] = {"value": 1, "pieces": 12, "inplay": 12, image: "E.jpg"};
tiles["F"] = {"value": 4, "pieces": 2, "inplay": 2, image: "F.jpg"};
tiles["G"] = {"value": 2, "pieces": 3, "inplay": 3, image: "G.jpg"};
tiles["H"] = {"value": 4, "pieces": 2, "inplay": 2, image: "H.jpg"};
tiles["I"] = {"value": 1, "pieces": 9, "inplay": 9, image: "I.jpg"};
tiles["J"] = {"value": 8, "pieces": 1, "inplay": 1, image: "J.jpg"};
tiles["K"] = {"value": 5, "pieces": 1, "inplay": 1, image: "K.jpg"};
tiles["L"] = {"value": 1, "pieces": 4, "inplay": 4, image: "L.jpg"};
tiles["M"] = {"value": 3, "pieces": 2, "inplay": 2, image:"M.jpg"};
tiles["N"] = {"value": 1, "pieces": 6, "inplay": 6, image: "N.jpg"};
tiles["O"] = {"value": 1, "pieces": 8, "inplay": 8, image: "O.jpg"};
tiles["P"] = {"value": 3, "pieces": 2, "inplay": 2, image: "P.jpg"};
tiles["Q"] = {"value": 10, "pieces": 1, "inplay": 1, image: "Q.jpg"};
tiles["R"] = {"value": 1, "pieces": 6, "inplay": 6, image: "R.jpg"};
tiles["S"] = {"value": 1, "pieces": 4, "inplay": 4, image: "S.jpg"};
tiles["T"] = {"value": 1, "pieces": 6, "inplay": 6, image: "T.jpg"};
tiles["U"] = {"value": 1, "pieces": 4, "inplay": 4, image: "U.jpg"};
tiles["V"] = {"value": 4, "pieces": 2, "inplay": 2, image: "V.jpg"};
tiles["W"] = {"value": 4, "pieces": 2, "inplay": 2, image: "W.jpg"};
tiles["X"] = {"value": 8, "pieces": 1, "inplay": 1, image: "X.jpg"};
tiles["Y"] = {"value": 4, "pieces": 2, "inplay": 2, image: "Y.jpg"};
tiles["Z"] = {"value": 10, "pieces": 1, "inplay": 1, image: "Z.jpg"};


//Array to hold the tiles in the players hand.
var currentLetters = [];

//Holds player's total score so far
var TotalScore = 0;

//Hold the word score before player plays or submit the word
var WordScore = 0;

//Runs when webpage is loaded buildRack() function runs
$(document).ready(function(){

    //Builds the initial playerRack
    buildRack();

    //Make the gameboard able to accept the players tiles.
    $("#boardSpace").droppable({ drop: tileDropped, out: tileRemoved });


});

function buildRack(){
    
    var tileImage, id, title;
    var tilesMAX = 7;
    var count = 1;

    $('#Letters div').empty();

    for( var i = 0; count <= tilesMAX; i++){
        
        var newTile = String.fromCharCode(65 + randomLetter());
        
        //console.log("newTile:"+ newTile);

        //Check if tile has any remaining and check if there is any tiles left in the board
        //If no tiles left then quit trying to add.
        if( tiles[newTile]["inplay"] !== 0){
            currentLetters[count] = {"letter" : newTile,
                                    "value" : tiles[newTile]["value"],
                                    "image" : tiles[newTile] ["image"]};
            
            //subtract number of tiles pieces still in play
            tiles[newTile]["inplay"]--;

            id = "tile" + count;
            title = currentLetters[count][ "letter" ];
            tileImage = currentLetters[count]["image"];
            
            //console.log("appending tile: " + newTile);
            //append the newTile onto player_LettersHolder
            //However I can't seem to get it to show up
            $('#player_LettersHolder').append("<div class='draggable'>"
                                    + "<img id='tile" + newTile
                                    + " class = letterTiles"
                                    + " src= '" + tileImage + "'></div>");
            count++;
        }
        //console.log("count: " + count);
        
        $(".droppable").droppable({accept: ".draggable",snap: ".boardspace", snapMode: "inner"});
        
        $(".draggable").draggable({revert: 'invalid',snap: ".droppable",snapMode: "inner"});
        
    }
    //console.log("updateScore");
    updateScore();
}

// function picks a random letter by chosing a random number 
// between 1-27

function randomLetter(){
    return Math.floor((Math.random() * 26));
}


// function calculate the wordscore as tile being dropped on the board
function tileDropped(event, ui){

    if($(this).attr("title") === 'doubleletter'){
        WordScore += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if($(this).attr("title") === 'regular'){
        WordScore += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if($(this).attr("title") === 'tripleword'){

        WordScore = ((WordScore + tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ) * 3 );
    }

    updateScore();
}

// function calculate wordScore when tiles are removed from board
function tileRemoved(event, ui){

    if($(this).attr("title") === 'doubleletter'){
        WordScore -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if($(this).attr("title") === 'regular'){
        WordScore -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if($(this).attr("title") === 'tripleword'){
        WordScore = (( WordScore / 2) - (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ));
    }
    updateScore();
}


//rest all scores and letters
function reset(){

    $("#submitwordButton").prop("disabled",false);
    $('#noTileLeft').remove();

    TotalScore = 0;
    WordScore = 0;
    
    updateScore();
    buildRack();
}

// updates the wordscore and totalscore
function updateScore(){

    $('#wordScore').text(WordScore);
    
    TotalScore = TotalScore + WordScore;
    $('#totalScore').text(TotalScore);

}