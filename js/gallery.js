var pictures={
    "link":[
        "img/a.jpg",
        "img/abandoned house.jpg",
        "img/background.jpg",
        "img/bread replica.jpg",
        "img/cat.jpg",
        "img/tree.jpg",
        "img/tree2.jpg",
        "img/water.jpg",
        "img/wood.jpg",
        "img/i live with pain.jpg",
        "img/iamin2.jpg",
        "img/iamin.png",
        "img/long legs.jpg",
        "img/nodumb.jpg",
        "img/not that long legs BjarneStroustrup.jpg",
        "img/programming.png",
        "img/crow.jpg",
    ]
}
var usedPicturesIndex=[];
function randPic(){
    var index=Math.floor(Math.random()*pictures.link.length);
    if(usedPicturesIndex.length==0){
        usedPicturesIndex[usedPicturesIndex.length]=index;
        return pictures.link[index];
    }
    while(true){
        index=Math.floor(Math.random()*pictures.link.length);
        let count=0;
        if(usedPicturesIndex.length==pictures.link.length)return "error";
        for(let i=0;i<usedPicturesIndex.length;i++){
            if(index!=usedPicturesIndex[i])count++;
        }
        if(count==usedPicturesIndex.length){
            usedPicturesIndex[usedPicturesIndex.length]=index;
            return pictures.link[index];
        }
    }
}
function createNotification(string,ms){
    var el=document.getElementsByClassName("notification")[0];
    el.innerHTML=string;
    el.style.display="block";
    for(let i=300;i<6000;i=i+600){
        setTimeout(function(){el.style.border="5px solid red"},i);
        setTimeout(function(){el.style.border="5px solid yellow"},i+300);
    }
    setTimeout(function(){el.style.display="none"},ms)
}
function addPicture(){
    var pic=randPic();
    if(pic=="error")return;
    var galCon=document.getElementsByClassName("gallery-con")[0];
    galCon.innerHTML+="<img id='"+usedPicturesIndex.length+"'>";
    document.getElementById(usedPicturesIndex.length).src=pic;
    
}
var maxPictures=0;
function setGallery(picNum){
    for(let i=0;i<picNum;i++){
        addPicture();
    }
    setOnClick(picNum);
    setOnHover(picNum);
    maxPictures=picNum;
}
function setOnClick(picNum){
    for(let i=1;i<=picNum;i++){
        document.getElementById(i).setAttribute("onclick","zoom("+i+")");
    }
}
function setOnHover(picNum){
    for(let i=1;i<=picNum;i++){
        document.getElementById(i).setAttribute("onmouseover","highlight("+i+","+0.4+")");
        document.getElementById(i).setAttribute("onmouseleave","highlight("+i+","+0+")");
    }
}
function zoom(id){
    var pic=document.getElementById(id).src;
    overlayOn();
    document.getElementById("overlayImage").innerHTML="<img src='"+pic+"'>";
    loadComments(id);
    document.getElementsByClassName("sendButton")[0].id="img"+id;
}
function highlight(id,intens){
    var pic=document.getElementById(id);
    pic.style.backgroundColor="rgba(0,0,0,"+intens+")";
}
function scrollToTop(){
    window.scroll(0,0);
}
function overlayOff(){
    document.getElementsByClassName("overlay")[0].style.display="none";
    document.getElementById("overlayImage").innerHTML="";
    window.removeEventListener('scroll',noScroll);
}
function overlayOn(){
    document.getElementsByClassName("overlay")[0].style.display="block";
    window.addEventListener('scroll',noScroll);
    lastScroll=window.scrollY;
    
}
window.onscroll = function(){
    if(window.pageYOffset>100){
        document.getElementById("scrollTop").style.display="block";
    }
    else{
        document.getElementById("scrollTop").style.display="none";
    }
}
var lastScroll=0;
function noScroll(){
    window.scrollTo(0,lastScroll);
}
var commentIndex=[1,2];
var commentNames=['Edmundas','Edmundas'];
var commentBodies=['Pirmoji nuotrauka iškart nuostabi 😳🔥👏🔥👏🔥!!','Ptfu! Eh kodėl šitai postinai🙄 😯 😦 😧 😮 😲 ???'];
function loadComments(index){
    document.getElementsByClassName("allComments")[0].innerHTML="";
    for(let i=0;i<commentIndex.length;i++){
        if(index==commentIndex[i]){
            addComment(i);
        }
    }
}
function sendComment(){
    var title=document.getElementById("commentSendName");
    var body=document.getElementById("commentSendBody");
    if(title.value==""||body.value=="")return;
    var index=document.getElementsByClassName("sendButton")[0].id;
    index=parseInt(index.substring(3,index.length));
    commentIndex[commentIndex.length]=index;
    commentNames[commentIndex.length-1]=title.value;
    commentBodies[commentIndex.length-1]=body.value;
    body.value="";
    loadComments(index);
}
function addComment(index){
    var string=`
    <div class="media">
        <div class="media-body comment">
            <p class="commentName">`+commentNames[index]+` <small>sako</small></p>
            <p class="commentBody">`+commentBodies[index]+`</p>
        </div>
    </div>
    `
    document.getElementsByClassName("allComments")[0].innerHTML+=string;
}
window.addEventListener("keydown",function(event){
    var index=document.getElementsByClassName("sendButton")[0].id;
    index=parseInt(index.substring(3,index.length));
    if((event.code=='Enter'||event.code=='ArrowLeft'||event.code=='ArrowRight'||event.code=="Escape")&&document.getElementsByClassName("overlay")[0].style.display=="block"){
        console.log(event.code);
        switch(event.code){
            case 'ArrowLeft':
                if(index==1)break;
                zoom(index-1);
                break;
            case 'ArrowRight':
                if(index==maxPictures)break;
                zoom(index+1);
                break;
            case 'Escape':
                overlayOff();
                break;
        }
    }
},true);