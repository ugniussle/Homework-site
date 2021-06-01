function createMenuEl(){
	var links=["imageGame.html","tables.html","form.html","snake.html","weather.html","galleryVue.html","crossword.html"];
	var names=["Nuotraukos žaidimas","Spalvotas table","Anketa","🐍Gyvatės žaidimas","Orai","Galerija (Vue)","Kryžiažodis"];
    
	var insert="";
	for(i=0;i<links.length;i++){
		insert+="<a class='link' href=\""+links[i]+"\">"+names[i]+"</a><br>";
	}
	document.getElementsByClassName("dropdown-content")[0].innerHTML=insert;
}
function createNav(){
	/*
	var links=["index.html","about.html","#","gallery.html"];
	var names=["Pagrindinis","Apie","Darbai","Galerija"];
	
	for(i=0;i<links.length;i++){
		insert+="<li><a id=\""+names[i]+"\" href=\""+links[i]+"\">"+names[i]+"</a></li>";
		if(names[i]=="Darbai"){
			
		}
	}
	insert+="<div class='dropdown-content'></div>";
	document.getElementsByClassName("navbar")[0].innerHTML=insert;
	document.getElementById("Darbai").className="dropdown dropd-button";*/
	var insert=
	`
	<div class="container-fluid nav-cont">
        <div class="row">
            <div class="item col-lg-3">
                <center>
                    <a class='link' href="index.html">Pagrindinis</a>
                </center>
            </div>
            <div class="item col-lg-3">
                <center>
                    <a class='link' href="about.html">Apie</a>
                </center>
            </div>
            <div class="dropdown item col-lg-3" style="padding:0px">
                <div class="dropd-button">
                    <center>
                        <p style="color:lightgrey">Darbai</p>
                    </center>
                </div>
            </div>
            <div class="item dropdown-content"></div>
            <div class="item col-lg-3">
                <center>
                    <a class='link' href="gallery.html">Galerija</a>
                </center>
            </div>
        </div>
    </div>
	`;
	document.getElementsByClassName("navbar-my")[0].innerHTML=insert;
	createMenuEl();
    markCurrent();
}
function markCurrent(){
    str=window.location.pathname;
    str=str.substring(str.lastIndexOf("/")+1);
    for(let i=0;i<document.getElementsByClassName("link").length;i++){
        if(document.getElementsByClassName("link")[i].getAttribute("href")==str){
            document.getElementsByClassName("link")[i].style="color:yellow;";
        }
    }
}