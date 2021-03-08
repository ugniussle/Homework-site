function show(){
	document.getElementsByClassName('menu')[0].style.display='block';
	console.log('hover');
}
function hide(){
	document.getElementsByClassName('menu')[0].style.display='none';
	console.log('away');
}
function createMenuEl(){
	var links=["imageGame.html","tables.html","form.html","snake.html"];
	var names=["Nuotraukos žaidimas","Spalvotas table","Anketa","Snake žaidimas"];
	var insert="";
	for(i=0;i<links.length;i++){
		insert+="<a href=\""+links[i]+"\">"+names[i]+"</a><br>";
	}
	document.getElementById("menu").innerHTML=insert;
}