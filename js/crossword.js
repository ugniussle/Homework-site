async function getWord(){
    let res=await fetch("https://random-words-with-pronunciation.p.rapidapi.com/word", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "40afc0403fmshd3b95eb22fcf51fp1ecdb5jsnf871a1551991",
            "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com"
        }
    })
    let data = await res.json()
    let ret=[]
    console.log(data)
    ret[0]=data[0].word
    ret[1]=data[0].definition
    return ret
}
//var words=["word","width","disc","reset","tangerine"];
//var pos=["x0y0","x0y0","x0y2","x2y0","x2y4"];

//var direction=["right","down","right","down","right"];
var words=[],pos=[],direction=[]
var descriptions=[];
var selectDirection="";
var X,Y;
async function genWords(){
    for(i=0;i<2;i++){
        getWord()
        .then(ret=>{
            console.log(ret[0],ret[1])
        })
    }
}
function isGoodWord(x){
    let letters=[]
    for(i=0;i<words.length;i++){
        for(j=0;j<words[0].length;k++){
            if(words[i]);
        }
    }
}

function genBoard(size1,size2){
    genWords()
    var div = document.getElementById("boardDiv")
    div.innerHTML+="<table id='board' style='border-collapse:collapse;cellpadding:0px'>";
    var board = document.getElementById("board")
    for (let i=0;i<size2;i++){
        board.innerHTML+="<tr id=tr"+i+">";
        for (let j=0;j<size1;j++){
            document.getElementById("tr"+i).innerHTML+="<td id=x"+j+"y"+i+"></td>";
        }
        board.innerHTML+="</tr>";
    }
    div.innerHTML+="</table>";
    //genCrossword()
    //addWords()
}
function addWords(){
    for(i=0;i<words.length;i++){
        var x=getX(pos[i]),y=getY(pos[i]);
        for(j=0;j<words[i].length;j++){
            var id='x'+x+'y'+y;
            var el = document.getElementById(id)
            if(el.innerHTML=="")el.innerHTML=`<input
             type='text' 
             maxlength='1' 
             size='1' 
             data-needed-letter="${words[i][j]}"
             id="in${id}"
             class="input"
             >`
            if(direction[i]=='right')x++
            else y++
        }
    }
    addEvListeners()
}
function getX(id){return parseInt(id.substring(id.indexOf('x')+1,id.indexOf('y')),10); }
function getY(id){return parseInt(id.substring(id.indexOf('y')+1,id.length),10); }
function addEvListeners(){
    var els=document.getElementsByClassName("input")
    for(i=0;i<els.length;i++){
        var el=document.getElementById(els[i].id)
        el.tabIndex=1;
    }
    for(i=0;i<els.length;i++){  //all input elements loop
        var id=els[i].id;
        var el=document.getElementById(id)
        el.addEventListener("keyup",checkWords,false)
        el.setAttribute("onfocus","X=getX(this.id);Y=getY(this.id)")
        var cellId=id.substring(id.indexOf('x'),id.length)
        for(j=0;j<words.length;j++)
            if(cellId==pos[j])
                el.tabIndex=0;
    }
    
}
function genIndexes(){
    let count=1;
    for(i=0;i<pos.length;i++){
        var el = document.getElementById(`dec${pos[i]}`)
        if(typeof(el)=="undefined"||el==null){
            var div=document.getElementById(pos[i])
            div.innerHTML+=`<div id="dec${pos[i]}">${count}</div>`
            div=document.getElementById(`dec${pos[i]}`)             //need to calculate vw
            div.style.position="absolute"
            div.style.marginTop="-7.3vh"
            div.style.marginLeft="0.2vw"
            div.style.fontSize="20px"
            div.style.color="darkred"
            count++
        }
    }
    genDesc()
}
function genDesc(){
    var htmlRight="Į dešinę:<br>";
    var htmlDown="Į apačią:<br>";
    for(i=0;i<words.length;i++){
        var el=document.getElementById("dec"+pos[i])
        var inEl=document.getElementById("in"+pos[i])
        if(direction[i]=="right"&&isWordDisabled(i)==false){
            htmlRight+=el.innerHTML+". "+descriptions[i]+"<br>"
        }
        else if(direction[i]=="down"&&isWordDisabled(i)==false){
            htmlDown+=el.innerHTML+". "+descriptions[i]+"<br>"
        }
    }
    document.getElementById("description").innerHTML="Žodžių apibūdinimai:<br>"+htmlRight+htmlDown
}
function isWordDisabled(i){
    var x=getX(pos[i]),y=getY(pos[i]);
    var count=0
    for(j=0;j<words[i].length;j++){
        var id='inx'+x+'y'+y;
        var el = document.getElementById(id)
        if(el.disabled==true)count++
        if(direction[i]=='right')x++
        else y++
    }
    if(count==words[i].length)return true
    else return false
    
}
function checkWords(){
    for(i=0;i<words.length;i++){
        var x=getX(pos[i]),y=getY(pos[i]);
        var wordLen=words[i].length,count=0

        for(j=0;j<words[i].length;j++){
            var id='inx'+x+'y'+y;
            var el = document.getElementById(id)
            if(el.value==el.dataset.neededLetter)count++
            if(direction[i]=='right')x++
            else y++
        }
        var x=getX(pos[i]),y=getY(pos[i]);
        if(wordLen==count){
            for(j=0;j<words[i].length;j++){
                var id='inx'+x+'y'+y;
                var el = document.getElementById(id)
                el.style.border="2px solid green"
                el.setAttribute("disabled",true)
                if(direction[i]=='right')x++
                else y++
            }
            
        }
    }
    genDesc()
}
function solveAll(){
    var els=document.getElementsByClassName("input")
    for(i=0;i<els.length;i++){
        var el=els[i]
        el.value=el.dataset.neededLetter
    }
    checkWords()
}
function resetCross(){
    var els=document.getElementsByClassName("input")
    for(i=0;i<els.length;i++){
        var el=els[i]
        el.value=""
        el.style.border="2px solid black"
        el.removeAttribute("disabled",true)
    }
    checkWords()
}
function focus(back){
    var x=X,y=Y
    if(back==0){
        if(selectDirection=="right"){
            x++
            var id="inx"+x+"y"+y
            while(idExists(x,y)&&document.getElementById(id).disabled==true)
                id="inx"+(++x)+"y"+y
            if(idExists(x,y)) document.getElementById(id).focus()
        }
        else if(selectDirection=="down"){
            y++
            var id="inx"+x+"y"+y
            while(idExists(x,y)&&document.getElementById(id).disabled==true)
                id="inx"+x+"y"+(++y)
            if(idExists(x,y))
                document.getElementById(id).focus()
        }
        else if(selectDirection=="") alert("Pasirinkite kryptį")
    }
    else if(back==1){
        if(selectDirection=="right"){
            x--
            var id="inx"+x+"y"+y
            while(idExists(x,y)&&document.getElementById(id).disabled==true)
                id="inx"+(--x)+"y"+y
            if(idExists(x,y)) document.getElementById(id).focus()
            
        }
        else if(selectDirection=="down"){
            y--
            var id="inx"+x+"y"+y
            while(idExists(x,y)&&document.getElementById(id).disabled==true)
                id="inx"+x+"y"+(--y)
            if(idExists(x,y)) document.getElementById(id).focus()
        }
        else if(selectDirection=="") alert("Pasirinkite kryptį")
    }
}
function idExists(x,y){
    var el = document.getElementById(`inx${x}y${y}`)
    if(typeof(el)=="undefined"||el==null)return false
    else return true
}
document.addEventListener('keyup', function(event) {
    if(event.code == "ArrowDown") {
        selectDirection = "down"
        document.getElementsByClassName("direction")[0].innerHTML=`<i class="fas fa-arrow-down"></i>`
    }
    else if(event.code == "ArrowRight") {
        selectDirection = "right"
        document.getElementsByClassName("direction")[0].innerHTML=`<i class="fas fa-arrow-right"></i>`
    }
    else if(event.key=="Backspace"){
        focus(1)
    }
    else {
        var alph="abcdefghijklmnopqrstuvwxyz"
        for(i=0;i<alph.length;i++){
            if(event.key==alph[i]){
                focus(0)
                return
            }
        }
    }
});
function genCrossword(){
    for(let i=0;i<12;i++){
        for(let j=0;j<12;j++){
            let a=document.getElementById("x"+i+"y"+j)
            if(a.innerHTML=="")console.log(a.innerHTML)
        }
    }
    var inWords=["word","width","drive","reset","tangerine","desynchronize","sound","accent"]
    var inDescription=["A composition of letters","How wide something is","Storage media","Restore something to the initial state","Similar fruit to orange","stop being in sync (v)","what we hear","a different way that people speak"];
    if(words.length==0){
        words[0]=inWords[0]
        pos[0]="x6y6"
        direction[0]="right"
        descriptions[0]=inDescription[0]
        inWords.splice(0,1)
        inDescription.splice(0,1)
        addWords()
    }
    let asd=4
    while(asd>0){
        for(let i=0;i<inWords.length;i++){
            var matches
            for(let j=0;j<words.length;j++){
              //maybe switch loops to generate all possible matches for one word and then choose
                let word=words[j],inWord=inWords[i],p=pos[j],dir=direction[j]
                console.log(word,inWord,p,dir)
                matches=matchPos(word,inWord,p,dir,i)
                console.log(matches)
                matches=cullMatches(matches,word,inWord,dir)
                console.log(matches)
                if(matches.length>0){
                    var rand=Math.floor(Math.random()*(matches.length/6))*6
                    console.log(matches[rand+3],"added rand is",rand)
                    words[words.length]=matches[rand+3]
                    pos[pos.length]=matches[rand+0]
                    descriptions[descriptions.length]=inDescription[matches[5+rand]]
                    direction[direction.length]=matches[rand+4]
                    inWords.splice(matches[5+rand],1)
                    inDescription.splice(matches[5+rand],1)
                    break
                }
            }
            
            addWords()
            
        }
        asd--
    }
    genIndexes()
    genDesc()
}
function matchPos(word,checkWord,wordPos,dir,index){
    
    var x=getX(wordPos),y=getY(wordPos)
    var matches=[]
    for(let i=0;i<word.length;i++){
        for(j=0;j<checkWord.length;j++){
            if(checkWord[j]==word[i]){
                matches.push(`x${x}y${y}`,checkWord[j],j,checkWord)   //FIX POS
                
                if(dir=="right")matches.push("down")
                else matches.push("right")

                matches.push(index)
            }
        }
        if(dir=="right")x++
        else y++
    }
    
    return matches
}
function cullMatches(matches,word,checkWord,dir){
    if(dir=="right")dir="down"
    else dir="right"
    var newMatches=[]
    for(let i=0;i<matches.length;i=i+6){
        let pos=matches[i],matchedLetter=matches[i+1],matchPos=matches[i+2]
        var x=getX(pos),y=getY(pos)
        let check=0
        let Y,X
        if(dir=="right"){
            Y=y
            X=x-matchPos
        }
        else {
            Y=y-matchPos
            X=x
        }
        matches[i]=`x${X}y${Y}`
        for(let j=0;j<checkWord.length;j++){
            let pos="x"+X+"y"+Y
            console.log("checking",pos,"for",word,checkWord)
            let el=document.getElementById(pos)
            if(typeof(el)=="undefined"||el==null){
                console.log("break for",checkWord,"on",matches[i],"because el is undef")
                break
            }
            else if(el.innerHTML==""||el.innerHTML!=""){
                pos="in"+pos
                el=document.getElementById(pos)
                if(typeof(el)=="undefined"||el==null){
                    //console.log("pos is undefined")
                    check++
                }
                else{
                    if(el.dataset.neededLetter==matchedLetter){
                        //console.log("pos matches letters")
                        check++
                        console.log(el.dataset.neededLetter,matchedLetter)
                    }
                    else break
                }
            }
            if(dir=="right")X++
            else Y++
        }
        if(check!=checkWord.length){
            matches.splice(i,6)
        }
        else{
            newMatches.push(matches[i+0],matches[i+1],matches[i+2],matches[i+3],matches[i+4],matches[i+5])
            console.log("adding",checkWord,"because",check,'=',checkWord.length)
        }
    }
    return newMatches
}