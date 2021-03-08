function createTable(x){
    document.getElementById("tableDiv").innerHTML+="<table id=table style='border-collapse:collapse;border: 2px solid black;'>";
    for (i=0;i<x;i++){
        document.getElementById("table").innerHTML+="<tr id=tr"+i+">";
        for (j=0;j<x;j++){
            document.getElementById("tr"+i).innerHTML+="<td id=x"+i+"y"+j+"></td>";
            document.getElementById("x"+i+"y"+j).style="height:10px;width:10px;background-color:black;";
            createOnClick(i,j)
            resetMouseOver(i,j);
        }
        document.getElementById("table").innerHTML+="</tr>";
    }
    document.getElementById("tableDiv").innerHTML+="</table>";
}

var snakeLength=0;
var snakePos=[];

function startGame(x,y){  //start the game
    removeOnClick();
    snakeLength=1;
    snakePos[0]='x'+x+'y'+y;
    move(x,y);
    genFood();
}
function move(x,y){ //snake move function
    pos=snakePos.length-1;
    if(snakeLength==0){ // dont do anything if game is not started
        return 1;
    }
    for(i=0;i<snakeLength;i++){ //check for collision
        if(snakePos[i]==('x'+x+'y'+y)&&pos!=0){
            gameEnd();
            document.getElementById("loseCond").innerHTML="Paskutinis žaidimas pralaimėtas dėl :"+"suvalgei save";
            return 0;
        };
    }
    if(pos+1<snakeLength){ //move snake when its not full length
        snakePos[pos+1]='x'+x+'y'+y;
        setGreenColor(snakePos[pos+1]);
    }
    else if(pos+1==snakeLength){ //move snake when full length
        setBlackColor(snakePos[0]);
        for(i=0;i<snakeLength-1;i++){
            snakePos[i]=snakePos[i+1];
        }
        snakePos[pos]='x'+x+'y'+y;
        setGreenColor(snakePos[pos]);
    }
    //else if(pos+1>snakeLength)alert("wtf"); //only for bugs
}
function gameEnd(){  //reset everything to fresh state
    
    for(i=0;i<60;i++){
        for(j=0;j<60;j++){
            setBlackColor('x'+i+'y'+j);
            resetMouseOver(i,j);
            createOnClick(i,j);
        }
    }
    if(snakeLength!=0)
        document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-1);
    snakePos=[];
    snakeLength=0;
}
function genFood(){ //generate yellow square
    var x=Math.floor(Math.random()*60);
    var y=Math.floor(Math.random()*60);
    var coords='x'+x+'y'+y;
    for(i=0;i<snakePos.length;i++){
        if(coords==snakePos[i]){
            x++;
            y++;
            if(x>60)x-=60;
            if(y>60)y-=60;
            coords='x'+x+'y'+y;
        }
    }
    document.getElementById("x"+x+"y"+y).setAttribute("onmouseover",'move('+x+','+y+');eatFood('+x+','+y+')');  //set eatFood function on square
    document.getElementById("x"+x+"y"+y).style="height:10px;width:10px;background-color:yellow";  //set yellow square
}
function eatFood(x,y){
    document.getElementById("x"+x+"y"+y).setAttribute("onmouseover",'move('+x+','+y+')'); //unset eatFood function on square
    snakeLength++;
    genFood();
    document.getElementById("score").innerHTML="Taškai: "+(snakeLength-1);
}



function removeOnClick(){
    for(i=0;i<60;i++)
        for(j=0;j<60;j++)
            document.getElementById("x"+i+"y"+j).setAttribute("onclick",'');
}
function createOnClick(x,y){
    document.getElementById("x"+x+"y"+y).setAttribute("onclick",'startGame('+x+','+y+')');
}
function resetMouseOver(x,y){
    document.getElementById("x"+x+"y"+y).setAttribute("onmouseover",'move('+x+','+y+')');
}
function setGreenColor(id){
    document.getElementById(id).style="height:10px;width:10px;background-color:green";
}
function setBlackColor(id){
    document.getElementById(id).style="height:10px;width:10px;background-color:black";
}