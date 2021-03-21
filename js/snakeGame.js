var dim; //dimensions of table
function createTable(x){
    dim=x;
    if(dim<5||dim>50)return 1;
    document.getElementById("tableDiv").innerHTML+="<table onmouseleave='gameEndOnMouseLeave();' id='table' style='border-collapse:collapse;cellpadding:0px;background-color:black'>";
    for (let i=0;i<dim;i++){
        document.getElementById("table").innerHTML+="<tr id=tr"+i+">";
        for (let j=0;j<dim;j++){
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
var snakePos=[];  //snake element array
function startGame(x,y){
    removeOnClick();
    snakeLength=3;
    snakePos[0]='x'+x+'y'+y;
    move(x,y);
    if(document.getElementById("timeCheck").checked)timer();
    else genFood();
}
var time;  //timeout object
function timer(){
    var id=genFood();
    time=setTimeout(unsetFood,parseInt(document.getElementById("timeValue").value)*1000,id);
}
function unsetFood(id){
    resetMouseOver(getXFromId(id),getYFromId(id));
    setBlackColor(id);
    timer();
}
function move(x,y){ //snake move function
    pos=snakePos.length-1;
    if(snakeLength==0||'x'+x+'y'+y==snakePos[pos])return 1;
    for(let i=0;i<pos;i++){ //check for collision
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
        for(let i=0;i<pos;i++) snakePos[i]=snakePos[i+1];  // shift array to left
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
    var xDiff=getYFromId(snakePos[pos])-getYFromId(snakePos[pos-1]);
    var yDiff=getXFromId(snakePos[pos-1])-getXFromId(snakePos[pos]); // x and y switched because x is rows and y is columns
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
function rotate(rot,id){ document.getElementById(id).style.transform="rotate("+rot+"deg)"; }
function gameEnd(){  //reset everything to a fresh state
    for(let i=0;i<dim;i++){
        for(let j=0;j<dim;j++){
            setBlackColor('x'+i+'y'+j);
            resetMouseOver(i,j);
            createOnClick(i,j);
            if(document.getElementById("timeCheck").checked)clearTimeout(time);
        }
    }
    if(snakeLength!=0)
        document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-3);
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
    document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-3);
    document.getElementById('loseCond').innerHTML='Paskutinis žaidimas laimėtas!!!';
    document.getElementById('loseCond').style.color="red";
    gameEnd();
}
function genFood(){ //generate food square
    var coords;
    while(true){  //dont generate food on the snake
        coords='x'+Math.floor(Math.random()*dim)+'y'+Math.floor(Math.random()*dim);
        let count=0;
        for(let i=0;i<snakePos.length;i++){
            if(snakePos[i]!=coords)count++;
            else break;
        }
        if(count==snakePos.length)break;
    }
    
    var purpleValue=parseInt(document.getElementById("purpleValue").value,10);
    var x=getXFromId(coords);
    var y=getYFromId(coords);
    document.getElementById(coords).setAttribute("onmouseenter",';move('+x+','+y+');eatFood('+x+','+y+')');  //set eatFood function on square
    var squareDim=(window.innerHeight-350)/dim;
    document.getElementById(coords).style.backgroundSize=squareDim+'px '+squareDim+'px';
    if(snakeLength%(8+Math.floor(purpleValue/2))!=0)    //set banana
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakebanana.png')";
    else                                                //set powder
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakepowder.png')";
    console.log(coords);
    return coords;
}
function eatFood(x,y){
    resetMouseOver(x,y); //unset eatFood function on square
    var purpleValue=parseInt(document.getElementById("purpleValue").value,10);
    if(snakeLength%(8+Math.floor(purpleValue/2))!=0)
        snakeLength++;
    else snakeLength+=purpleValue;
    if(purpleValue<0||purpleValue>10){
        document.getElementById('loseCond').innerHTML='Paskutinis žaidimas pralaimėtas dėl: hax';
        gameEnd();
        return 1;
    }
    if(snakeLength>=dim*dim){
        gameEndWin();
        return 0;
    }
    if(document.getElementById("timeCheck").checked){
        clearTimeout(time);
        timer();
    }
    else genFood();
    document.getElementById("score").innerHTML="Taškai: "+(snakeLength-3);
}
function removeOnClick(){
    for(let i=0;i<dim;i++)
        for(let j=0;j<dim;j++)
            document.getElementById("x"+i+"y"+j).setAttribute("onclick",'');
}
function createOnClick(x,y) { document.getElementById("x"+x+"y"+y).setAttribute("onclick",'startGame('+x+','+y+')'); }  //add the start game function
function resetMouseOver(x,y){ document.getElementById("x"+x+"y"+y).setAttribute("onmouseenter",'move('+x+','+y+')'); }   //reset move function on tile
function setSnakeHead(id){
    var squareDim=(window.innerHeight-350)/dim;
    document.getElementById(id).style.backgroundImage="url('img/snake/snakehead.png')";
    document.getElementById(id).style.backgroundSize=squareDim+'px '+squareDim+'px';
}
function setSnakeBody(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snakebase.png')"; }
function setSnakeTail(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snaketail.png')"; }
function setBlackColor(id){
    document.getElementById(id).style="height:"+(window.innerHeight-350)/dim+"px;width:"+(window.innerHeight-350)/dim+"px;background-color:black;border:0px solid rgba(0,50,0,0.4);cellpadding:0px";
}
function getXFromId(id){return parseInt(id.substring(id.indexOf('x')+1,id.indexOf('y')),10); }
function getYFromId(id){return parseInt(id.substring(id.indexOf('y')+1,id.length),10); } 
//settings
function changeSize(){
    delTable();
    createTable(document.getElementById("size").value);
}