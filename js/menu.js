function createMenuEl(){
	var links=["imageGame.html","tables.html","form.html","snake.html","snakeKeyb.html","bootstrapTest.html"];
	var names=["Nuotraukos žaidimas","Spalvotas table","Anketa","🐍Gyvatės žaidimas","🐍Gyvatė (klaviatūra)","Bootstrap Testas"];
	var insert="";
	for(i=0;i<links.length;i++){
		insert+="<a href=\""+links[i]+"\">"+names[i]+"</a><br>";
	}
	document.getElementsByClassName("dropdown-content")[0].innerHTML=insert;
}