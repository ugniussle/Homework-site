var dim;
function createTable(x){
    dim=x;
    document.getElementById("tableDiv").innerHTML+="<table onmouseleave='gameEndOnMouseLeave();' id='table' style='border-collapse:collapse;cellpadding:0px'>";
    for (i=0;i<dim;i++){
        document.getElementById("table").innerHTML+="<tr id=tr"+i+">";
        for (j=0;j<dim;j++){
            document.getElementById("tr"+i).innerHTML+="<td id=x"+i+"y"+j+"></td>";
            setBlackColor("x"+i+"y"+j);
            createOnClick(i,j)
            resetMouseOver(i,j);
        }
        document.getElementById("table").innerHTML+="</tr>";
    }
    document.getElementById("tableDiv").innerHTML+="</table>";
    return 0;
}
function delTable(){
    document.getElementById("tableDiv").innerHTML="";
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
            document.getElementById("loseCond").innerHTML="Paskutinis žaidimas pralaimėtas dėl: suvalgei save";
            return 0;
        };
    }
    if(pos+1<snakeLength){ //move snake when it is not full length
        snakePos[pos+1]='x'+x+'y'+y;
        setGreenColor(snakePos[pos+1]);
    }
    else if(pos+1==snakeLength){ //move snake when it is full length
        setBlackColor(snakePos[0]);
        for(i=0;i<pos;i++){
            snakePos[i]=snakePos[i+1];
        }
        snakePos[pos]='x'+x+'y'+y;
        setGreenColor(snakePos[pos]);
    }
    //else if(pos+1>snakeLength)alert("wtf"); //only for bugs
}
function gameEnd(){  //reset everything to a fresh state
    for(i=0;i<dim;i++){
        for(j=0;j<dim;j++){
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
function gameEndOnMouseLeave(){  //set the lose condition(and end the game)
    if(snakeLength!=0) document.getElementById('loseCond').innerHTML='Paskutinis žaidimas pralaimėtas dėl: išėjei iš lango';
    else return 1;
    gameEnd();
}
function gameEndWin(){
    document.getElementById('loseCond').innerHTML='Paskutinis žaidimas laimėtas!!!';
    document.getElementById('loseCond').style.color="red";
    gameEnd();
}
function genFood(){ //generate food square
    var coords;
    var check=1;
    while(check){
        var x=Math.floor(Math.random()*dim);
        var y=Math.floor(Math.random()*dim);
        coords='x'+x+'y'+y;
        var count=0;
        for(i=0;i<snakePos.length;i++){
            if(snakePos[i]!=coords)count++;
            else break;
        }
        if(count==snakePos.length)check=0;
    }
    document.getElementById("x"+x+"y"+y).setAttribute("onmouseover",'eatFood('+x+','+y+');move('+x+','+y+')');  //set eatFood function on square
    if(snakeLength%8!=0)
        document.getElementById("x"+x+"y"+y).style="height:"+630/dim+"px;width:"+630/dim+"px;background-color:yellow;border:1px solid black";  //set yellow square
    else document.getElementById("x"+x+"y"+y).style="height:"+630/dim+"px;width:"+630/dim+"px;background-color:purple;border:1px solid black";  //set purple square
}
function eatFood(x,y){
    resetMouseOver(x,y); //unset eatFood function on square
    var purpleValue=document.getElementById("purpleValue").value;
    purpleValue=parseInt(purpleValue,10);
    if(snakeLength%8!=0)
        snakeLength++;
    else if (snakeLength%8==0&&purpleValue>0&&purpleValue<=10) snakeLength+=purpleValue;
    else {
        document.getElementById('loseCond').innerHTML='Paskutinis žaidimas pralaimėtas dėl: hax';
        gameEnd();
        return 1;
    }
    if(snakeLength>=dim*dim){
        gameEndWin();
        return 0;
    }
    genFood();
    document.getElementById("score").innerHTML="Taškai: "+(snakeLength-1);
    document.getElementById("score").style.color='rgb('+(Math.random*256)+','+(Math.random*256)+','+(Math.random*256)+')';
}
function removeOnClick(){
    for(i=0;i<dim;i++)
        for(j=0;j<dim;j++)
            document.getElementById("x"+i+"y"+j).setAttribute("onclick",'');
}
function createOnClick(x,y) { document.getElementById("x"+x+"y"+y).setAttribute("onclick",'startGame('+x+','+y+')'); }
function resetMouseOver(x,y){ document.getElementById("x"+x+"y"+y).setAttribute("onmouseover",'move('+x+','+y+')'); }
function setGreenColor(id){ document.getElementById(id).style="height:"+630/dim+"px;width:"+630/dim+"px;background-color:green;border:1px solid black"; }
function setBlackColor(id){ document.getElementById(id).style="height:"+630/dim+"px;width:"+630/dim+"px;background-color:black;border:1px solid rgba(0,50,0,0.4);"; }

//settings

function changeSize(){
    delTable();
    createTable(document.getElementById("size").value);
}