function show(){
	document.getElementsByClassName('menu')[0].style.display='block';
}
function hide(){
	document.getElementsByClassName('menu')[0].style.display='none';
}
function createMenuEl(){
	var links=["imageGame.html","tables.html","form.html","snake.html","snakeKeyb.html"];
	var names=["Nuotraukos žaidimas","Spalvotas table","Anketa","🐍Gyvatės žaidimas","🐍Gyvatės žaidimas (klaviatūra)"];
	var insert="";
	for(i=0;i<links.length;i++){
		insert+="<a href=\""+links[i]+"\">"+names[i]+"</a><br>";
	}
	document.getElementById("menu").innerHTML=insert;
}