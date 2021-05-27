function overlayOn(id){
    document.getElementsByClassName("overlay")[0].style.display="block";
    document.getElementsByClassName("sendButton")[0].id=id;
    document.getElementsByClassName("overlay")[0].style.display="block";
    for(i=0;i<overlApp.comments.length;i++){
        var comment = document.getElementsByClassName("media")[i];
        if(comment.dataset.commentnum==id){
            comment.style.display='block'
        }
    }
    document.getElementById("overlayImage").innerHTML=""
}
function overlayOff(){
    document.getElementsByClassName("overlay")[0].style.display="none";
    document.getElementById("overlayImage").innerHTML="";
    for(i=0;i<overlApp.comments.length;i++){
        var comment = document.getElementsByClassName("media")[i];
        comment.style.display='none'
    }
}
Vue.component('Images', {
    props: ['image'],
    template: '<img :id="image.id" onclick="var num=this.id;overlayOn(num)" :src="image.text">'
})
Vue.component('comments',{
    props:['comment'],
    template:`
        <div class="media" v-show=0 :data-commentNum="comment.id">
            <div class="media-body comment">
                <p class="commentName">{{comment.title}}<small> sako</small></p>
                <p class="commentBody">{{comment.text}}</p>
            </div>
        </div>
        `
})
function shuffle(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}