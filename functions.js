// dropdown menu

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownFunc() {
  document.getElementById("Dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//         game

function visibility(id,action){ //change visibility of one cell
	if(action=="hide"){
		document.getElementById(id).style.display='none';
	}
	if(action=="show"){
	document.getElementById(id).style.display='block';
	}
}
function visibilityAll(action){ //change visibility of all cells
	var row=["a","b","c"];
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			visibility(id,action);
		}
	}
}
function setAllAttribute(att,value){ //set an attribute of the black squares
	var row=["a","b","c"];
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			document.getElementById(id).setAttribute(att,value);
		}
	}
}
/*
function setAllElement(att,value){
	var row=["a","b","c"];
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			if(att=="width")document.getElementById(id).style.width=value;
			if(att=="height")document.getElementById(id).style.height=value;
		}
	}
}
*/

function fixImage(){   //fix image dimensions
	visibilityAll('show');
	var img=document.getElementById("baseImg");
	console.log(img);
	console.dir(img);
	var height=img.naturalHeight;     //image height
	var width=img.naturalWidth;       //image width
	console.log(height);
	console.log(width);
	while(height>1000||width>1000){  //shrink image to atleast 1000px
		if(height%2==1)height-=1;
		if(width%2==1)width-=1;
		height/=2;
		width/=2;
	}
	var gridHeight=height/3; // dimensions of grid element
	var gridWidth=width/3;
	while(gridHeight%3!=0){  // shrink image further until dimensions are 
		height++;             // divisible by 3
		gridHeight=height/3;
	}
	while(gridWidth%3!=0){
		width++;
		gridWidth=width/3;
	}
	console.log(gridHeight);
	console.log(gridWidth);
	var set=width+"px "+height+"px"; //set game image
	console.log(set);
	document.getElementById("tb").style.backgroundSize = set; 
	setAllAttribute('height',gridHeight); //set grid size
	setAllAttribute('width',gridWidth);
	var row=["tda","tdb","tdc"];//set table cell size
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			document.getElementById(id).setAttribute("height",gridHeight);
			document.getElementById(id).setAttribute("width",gridWidth);
		}
	}

}
function changeImg(link){
	document.getElementById("baseImg").setAttribute("src",link);
	var set="url("+link+")";
	document.getElementById("tb").style.backgroundImage = set;
}