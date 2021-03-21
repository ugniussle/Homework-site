var dim; //dimensions of table
function createTable(x){
    dim=x;
    if(dim<5||dim>50)return 1;
    document.getElementById("tableDiv").innerHTML+="<table onmouseleave='gameEndOnMouseLeave();' id='table' style='border-collapse:collapse;cellpadding:0px;background-color:black'>";
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
function startGame(x,y){
    removeOnClick();
    snakeLength=3;
    snakePos[0]='x'+x+'y'+y;
    move(x,y);
    genFood();
}
function move(x,y){ //snake move function
    pos=snakePos.length-1;
    if(snakeLength==0||'x'+x+'y'+y==snakePos[pos])return 1;
    for(i=0;i<pos;i++){ //check for collision
        if((snakePos[i]==('x'+x+'y'+y))&&(pos!=0)){
            gameEnd();
            document.getElementById("loseCond").innerHTML="Paskutinis žaidimas pralaimėtas dėl: suvalgei save";
            return 0;
        }
    }
    if(pos+1<snakeLength){ //move snake when it is not full length
        snakePos[pos+1]='x'+x+'y'+y;
        setSnakeHead(snakePos[pos+1]);
        if(pos+1==1)setSnakeTail(snakePos[pos]);
        else if(pos+1>1)setSnakeBody(snakePos[pos]);
        rotate(getRotation(pos+1),snakePos[pos+1]);
    }
    else if(pos+1==snakeLength){ //move snake when it is full length
        setBlackColor(snakePos[0]);
        for(i=0;i<pos;i++) snakePos[i]=snakePos[i+1];  // shift array to left
        snakePos[pos]='x'+x+'y'+y;
        setSnakeHead(snakePos[pos]);
        if(pos>1)setSnakeBody(snakePos[pos-1]);
        if(snakeLength>1)setSnakeTail(snakePos[0]);
        else setSnakeHead(snakePos[0]);
        rotate(getRotation(pos),snakePos[pos]);
    }
    document.getElementById(snakePos[0]).style.transform.value=document.getElementById(snakePos[1]).style.transform.value;
}
function getRotation(pos){
    var x1=getYFromId(snakePos[pos]);
    var y1=getXFromId(snakePos[pos]);
    var x2=getYFromId(snakePos[pos-1]);
    var y2=getXFromId(snakePos[pos-1]);  // x and y switched because x is rows and y is columns
    var xDiff=x1-x2;
    var yDiff=y2-y1;
    console.log(xDiff+' '+yDiff);
    switch(xDiff){
        case -1:
            switch(yDiff){
                case -1: return 180;
                case 0: return -90;
                case 1: return 0;
                default: return 0;
            }
        case 0:
            switch(yDiff){
                case -1: return 180;
                case 1: return 0;
                default: return 0;
            }
        case 1:
            switch(yDiff){
                case -1: return 180;
                case 0: return 90;
                case 1: return 0;
                default: return 0;
            }
        default:
            if(xDiff>1)return 90;
            else return -90;
    }
}
function rotate(rot,id){
    document.getElementById(id).style.transform="rotate("+rot+"deg)";
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
    document.getElementById("score").innerHTML="Taškai: 0";
}
function gameEndOnMouseLeave(){  //set the lose condition(and end the game)
    if(snakeLength!=0) document.getElementById('loseCond').innerHTML='Paskutinis žaidimas pralaimėtas dėl: išėjei iš lango';
    else return 0;
    gameEnd();
}
function gameEndWin(){
    document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-1);
    document.getElementById('loseCond').innerHTML='Paskutinis žaidimas laimėtas!!!';
    document.getElementById('loseCond').style.color="red";
    gameEnd();
}
function genFood(){ //generate food square
    var coords;
    var check=1;
    while(check){  //dont generate food on the snake
        coords='x'+Math.floor(Math.random()*dim)+'y'+Math.floor(Math.random()*dim);
        var count=0;
        for(i=0;i<snakePos.length;i++){
            if(snakePos[i]!=coords)count++;
            else break;
        }
        if(count==snakePos.length)break;
    }
    console.log(coords);
    var squareDim=(window.innerHeight-450)/dim;
    var x=getXFromId(coords);
    var y=getYFromId(coords);
    document.getElementById(coords).setAttribute("onmouseenter",';move('+x+','+y+');eatFood('+x+','+y+')');  //set eatFood function on square
    document.getElementById(coords).style.height=squareDim;
    document.getElementById(coords).style.width=squareDim;
    document.getElementById(coords).style.backgroundRepeat='no-repeat';
    document.getElementById(coords).style.backgroundSize=squareDim+'px '+squareDim+'px';
    if(snakeLength%8!=0)    //set banana
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakebanana.png')";
    else                   //set powder
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakepowder.png')";
}
function eatFood(x,y){
    resetMouseOver(x,y); //unset eatFood function on square
    var purpleValue=document.getElementById("purpleValue").value;
    purpleValue=parseInt(purpleValue,10);
    if(snakeLength%(5+Math.floor(purpleValue/2))!=0)
        snakeLength++;
    else if (snakeLength%(5+Math.floor(purpleValue/2))==0&&purpleValue>0&&purpleValue<=10) snakeLength+=purpleValue;
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
}
function removeOnClick(){
    for(i=0;i<dim;i++)
        for(j=0;j<dim;j++)
            document.getElementById("x"+i+"y"+j).setAttribute("onclick",'');
}
function createOnClick(x,y) { document.getElementById("x"+x+"y"+y).setAttribute("onclick",'startGame('+x+','+y+')'); }  //add the start game function
function resetMouseOver(x,y){ document.getElementById("x"+x+"y"+y).setAttribute("onmouseenter",'move('+x+','+y+')'); }   //reset move function on tile
function setSnakeHead(id){ 
    var squareDim=(window.innerHeight-450)/dim;
    document.getElementById(id).style.height=squareDim;
    document.getElementById(id).style.width=squareDim;
    document.getElementById(id).style.backgroundImage="url('img/snake/snakehead.png')";
    document.getElementById(id).style.backgroundRepeat='no-repeat';
    document.getElementById(id).style.backgroundSize=squareDim+'px '+squareDim+'px';
}
function setSnakeBody(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snakebase.png')"; }
function setSnakeTail(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snaketail.png')"; }
function setBlackColor(id){
    document.getElementById(id).style="height:"+(window.innerHeight-450)/dim+"px;width:"+(window.innerHeight-450)/dim+"px;background-color:black;border:0px solid rgba(0,50,0,0.4);cellpadding:0px";
}
function getXFromId(id){return parseInt(id.substring(id.indexOf('x')+1,id.indexOf('y')),10); }
function getYFromId(id){return parseInt(id.substring(id.indexOf('y')+1,id.length),10); } 


//settings

function changeSize(){
    delTable();
    createTable(document.getElementById("size").value);
}