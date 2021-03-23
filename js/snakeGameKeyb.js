var dim; //dimensions of table
function createTable(x){
    dim=x;
    if(dim<5||dim>50)return 1;
    document.getElementById("tableDiv").innerHTML+="<table id='table' style='border-collapse:collapse;cellpadding:0px;background-color:black'>";
    for (let i=0;i<dim;i++){
        document.getElementById("table").innerHTML+="<tr id=tr"+i+">";
        for (let j=0;j<dim;j++){
            document.getElementById("tr"+i).innerHTML+="<td id=x"+i+"y"+j+"></td>";
            setBlackColor("x"+i+"y"+j);
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
var moveLoopObj;
var snakeSpeed;
window.addEventListener("keydown",function(event){
    if(event.code=='Enter'||event.code=='ArrowLeft'||event.code=='ArrowRight'||event.code=='ArrowUp'||event.code=='ArrowDown'){
        let x,y,id;
        if(snakeLength>0){
            id=snakePos[snakePos.length-1];
            x=getXFromId(id);
            y=getYFromId(id);
        }
        switch(event.code){
            case 'Enter':
                if(snakeLength==0)startGame();
                moveLoopObj=setTimeout(moveLoop,snakeSpeed);
                break;
            case 'ArrowLeft':
                clearTimeout(moveLoopObj);
                move(x,y-1);
                moveLoopObj=setTimeout(moveLoop,snakeSpeed);
                break;
            case 'ArrowRight':
                clearTimeout(moveLoopObj);
                move(x,y+1);
                moveLoopObj=setTimeout(moveLoop,snakeSpeed);
                break;
            case 'ArrowUp':
                clearTimeout(moveLoopObj);
                move(x-1,y);
                moveLoopObj=setTimeout(moveLoop,snakeSpeed);
                break;
            case 'ArrowDown':
                clearTimeout(moveLoopObj);
                move(x+1,y);
                moveLoopObj=setTimeout(moveLoop,snakeSpeed);
                break;
        }
        
    }
},true);
function startGame(){
    console.log('startgame');
    snakeSpeed=parseInt(document.getElementById("snakeSpeed").value,10);
    if(snakeSpeed>1000||snakeSpeed<100){
        gameEnd();
        return 0;
    }
    snakeLength=3;
    snakePos[0]='x'+Math.floor(dim/2)+'y'+Math.floor(dim/2);
    snakePos[1]='x'+Math.floor(dim/2)+'y'+(Math.floor(dim/2)-1);
    snakePos[2]='x'+Math.floor(dim/2)+'y'+(Math.floor(dim/2)-2);
    if(document.getElementById("wallCheck").checked)
        for(let i=0;i<parseInt(document.getElementById("wallValue").value);i++)
            genWall();
    else document.getElementById("wallValue").value=0;
    if(document.getElementById("timeCheck").checked)timer();  //start timer mode
    else if(document.getElementsByClassName('food').length==0)genFood();
    
}
function moveLoop(){
    var x=getXFromId(snakePos[snakePos.length-1]);
    var y=getYFromId(snakePos[snakePos.length-1]);
    switch(getRotation(snakePos.length-1)){
        case -90:
            y--;
            break;
        case 0:
            x--;
            break;
        case 90:
            y++;
            break;
        case 180:
            x++;
            break;
    }
    move(x,y);
    moveLoopObj=setTimeout(moveLoop,snakeSpeed);
}
function move(x,y){ //snake move function
    if(x>(dim-1)||y>(dim-1)||x<0||y<0)gameEnd();
    pos=snakePos.length-1;
    if(snakeLength==0||'x'+x+'y'+y==snakePos[pos])return 1;
    if(document.getElementById('x'+x+'y'+y).className=='food'){
        document.getElementById('x'+x+'y'+y).className="";
        console.log('moveto: x'+x+'y'+y+' eatfood');
        eatFood();
    }
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
    document.getElementById(snakePos[0]).style.transform.value = document.getElementById(snakePos[1]).style.transform.value;  //set tail rotation
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
function gameEndWin(){
    document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-3);
    document.getElementById('loseCond').innerHTML='Paskutinis žaidimas laimėtas!!!';
    document.getElementById('loseCond').style.color="red";
    gameEnd();
}
function genFood(){ //generate food square
    var coords=getRandomId();
    var purpleValue=parseInt(document.getElementById("purpleValue").value,10);
    document.getElementById(coords).className='food';  //set food class
    var squareDim=(window.innerHeight-350)/dim;
    document.getElementById(coords).style.backgroundSize=squareDim+'px '+squareDim+'px';
    if(snakeLength%(8+Math.floor(purpleValue/2))!=0)    //set banana
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakebanana.png')";
    else                                                //set powder
        document.getElementById(coords).style.backgroundImage="url('img/snake/snakepowder.png')";
    return coords;
}
function hitWall(){
    document.getElementById("loseCond").innerHTML='Paskutinis žaidimas pralaimėtas dėl: įpuolei į sieną'
    gameEnd();
}
function eatFood(){
    clearTimeout(clockObj);
    var purpleValue=parseInt(document.getElementById("purpleValue").value,10);
    if(snakeLength%(8+Math.floor(purpleValue/2))!=0)
        snakeLength++;
    else snakeLength+=purpleValue;
    if(purpleValue<0||purpleValue>10){
        document.getElementById('loseCond').innerHTML='Paskutinis žaidimas pralaimėtas dėl: hax';
        gameEnd();
        return 1;
    }
    if(snakeLength+parseInt(document.getElementById("wallValue").value,10)>=dim*dim){
        gameEndWin();
        return 0;
    }
    if(document.getElementById("timeCheck").checked){
        clearTimeout(time);
        timer();
    }
    else if(document.getElementsByClassName('food').length==0) genFood();
    document.getElementById("score").innerHTML="Taškai: "+(snakeLength-3);
}
function setSnakeHead(id){
    var squareDim=(window.innerHeight-350)/dim;
    document.getElementById(id).style.backgroundImage="url('img/snake/snakehead.png')";
    document.getElementById(id).style.backgroundSize=squareDim+'px '+squareDim+'px';
}
function setSnakeBody(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snakebase.png')"; }
function setSnakeTail(id){ document.getElementById(id).style.backgroundImage="url('img/snake/snaketail.png')"; }
function setBlackColor(id){
    document.getElementById(id).style="height:"+(window.innerHeight-350)/dim+"px;width:"+(window.innerHeight-350)/dim+"px;background-color:black;cellpadding:0px";
}
function getXFromId(id){return parseInt(id.substring(id.indexOf('x')+1,id.indexOf('y')),10); }
function getYFromId(id){return parseInt(id.substring(id.indexOf('y')+1,id.length),10); } 
function getRandomId(){ //get random id (not on the snake)
    var id;
    while(true){  //dont generate tile on the snake (or food, or obstacles)
        id='x'+Math.floor(Math.random()*dim)+'y'+Math.floor(Math.random()*dim);
        let count=0;
        let tile=document.getElementById('x'+getXFromId(id)+'y'+getYFromId(id));
        for(let i=0;i<snakePos.length;i++){
            if(snakePos[i]!=id)count++;
            else break;
        }
        if(count==snakePos.length)return id;
    }
}
function gameEnd(){  //reset everything to a fresh state
    console.log('gameEnd');
    clearTimeout(moveLoopObj);
    clearTimeout(clockObj);
    for(let i=0;i<dim;i++){
        for(let j=0;j<dim;j++){
            setBlackColor('x'+i+'y'+j);
            if(document.getElementById("timeCheck").checked)clearTimeout(time);
            document.getElementById("clock").innerHTML="";
        }
    }
    if(snakeLength!=0)
        document.getElementById("record").innerHTML="Paskutinio žaidimo taškai: "+(snakeLength-3);
    snakePos=[];
    snakeLength=0;
    document.getElementById("score").innerHTML="Taškai: 0";
}
//settings
function changeSize(){
    delTable();
    createTable(document.getElementById("size").value);
}
var time;  //timeout object (for timed food)
var clockObj; //clock object
function timer(){
    var id=genFood();
    time=setTimeout(unsetFood,parseInt(document.getElementById("timeValue").value)*1000,id);
    clock(parseInt(document.getElementById("timeValue").value*1000,10));
}
function clock(ms){
    if(ms<0)clearTimeout(Clock);
    document.getElementById("clock").innerHTML="Maistas pradings už: "+ms/1000+"s";
    clockObj=setTimeout(clock,100,ms-100);
}
function unsetFood(id){
    //resetMouseOver(getXFromId(id),getYFromId(id));
    setBlackColor(id);
    timer();
}