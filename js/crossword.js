/*class Word{
    constructor(name,desc,x,y){
        this.name=name
        this.length=name.length
        this.xPos=x
        this.yPos=y
        this.description=desc
    }
    isMatchingLetter(otherWord){
        return true
    }
}
class Board{
    constructor(){
        this.words=new Word
    }
}
async function getWord(){
    let res=await fetch("https://random-words-api.vercel.app/word")
    let data = await res.json()
    let ret=[]
    ret[0]=data[0].word
    ret[1]=data[0].definition
    return ret
}*/
var words=["word","width","disc","reset"];
var pos=["x0y0","x0y0","x0y2","x2y0"];
var direction=["right","down","right","down"];
var descriptions=["a composition of letters"];
var selectDirection;
/*async function genWords(){
    for(i=0;i<10;i++){
        getWord()
            .then(ret=>{
                words[words.length]=ret[0]
                descriptions[descriptions.length]=ret[1]
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
}*/

function genBoard(size1,size2){
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
    addWords()
}
function addWords(){
    for(i=0;i<words.length;i++){
        var x=getX(pos[i]),y=getY(pos[i]);
        for(j=0;j<words[i].length;j++){
            var id='x'+x+'y'+y;
            var el = document.getElementById(id)
            el.innerHTML=`<input
             type='text' 
             maxlength='1' 
             size='1' 
             data-needed-letter="${words[i][j]}"
             id="in${id}"
             class="input"
             >`
            //el.dataset.neededLetter=words[i][j]
            if(direction[i]=='right')x++
            else y++
            
        }
    }
    addEvListeners()
}
function getX(id){return parseInt(id.substring(id.indexOf('x')+1,id.indexOf('y')),10); }
function getY(id){return parseInt(id.substring(id.indexOf('y')+1,id.length),10); } 
function addEvListeners(){
    //var x=getX(pos[i]),y=getY(pos[i]);
    var els=document.getElementsByClassName("input")
    for(i=0;i<els.length;i++){  //chack words
        var id=els[i].id;
        var el=document.getElementById(id)
        el.addEventListener("keyup",checkWords,false)
    }
    for(i=0;i<words.length;i++){
        var x=getX(pos[i]),y=getY(pos[i]);
        for(j=0;j<words[i].length;j++){
            var id='inx'+x+'y'+y;
            var el = document.getElementById(id)
            if(direction[i]=='right')x++
            else y++
            if(j+1<words[i].length){
                el.setAttribute("onfocus","focusThat(this.id)")
            }
        }
    }
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
            selectDirection=null
        }
        /*else{
            for(j=0;j<words[i].length;j++){
                document.getElementById('inx'+x+'y'+y).style.border="2px solid black"
                if(direction[i]=='right')x++
                else y++
            }
        }*/
    }
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
function focusThat(id){
    console.log(id)
    //if(document.getElementById("in"+id)==null)return 1
    //document.getElementById("in"+id).focus();
    var s = id.substring(id.indexOf('x'),id.length)
    var x=getX(s),y=getY(s);
    for(i=0;i<words.length;i++){
        if(s==pos[i]){
            if(selectDirection==null&&direction[i]=="right"){
                selectDirection="right"
            }
            else if(selectDirection==null&&direction[i]!="right"){
                selectDirection="down"
            }
        }
        if(selectDirection=="right"){
            x++
            var selectedId="inx"+x+"y"+y;
            document.getElementById(id).setAttribute("onkeyup","document.getElementById('"+selectedId+"').focus()")
            console.log("focus to ",selectedId)
            return
        }
        else if(selectDirection=="down"){
            y++
            var selectedId="inx"+x+"y"+y;
            document.getElementById(id).setAttribute("onkeyup","document.getElementById('"+selectedId+"').focus()")
            console.log("focus to ",selectedId)
            return
        }
    }
}