function visibility(id,action){ //change visibility of one cell
	var cell=document.getElementById(id);
	console.log("clicked "+id);
	if(action=="show"){
		cell.style.backgroundColor='transparent';
	}
	if(action=="hide"){
		cell.style.backgroundColor='black';
	}
}


function visibilityAll(action){ //change visibility of all cells
	var row=["tda","tdb","tdc"];
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			visibility(id,action);
		}
	}
}


function setAllDimension(att,value){
	var row=["tda","tdb","tdc"];
	var col=["1","2","3"];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			var id=row[i]+col[j];
			var cell=document.getElementById(id);
			if(att=="width"){
				cell.style.width=value+"px";
				console.log(id+" cell width "+value);
			}
			if(att=="height"){
				cell.style.height=value+"px";
				console.log(id+" cell height "+value);
			}
		}
	}	
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function fixImage(imglink){   //fix image dimensions
	var image=new Image();
	image.src=imglink;
	await sleep(100);
	var height=image.naturalHeight;
	var width=image.naturalWidth;
	
	if(height>=width&&height>800&&width!=0){ //make image dimensions smaller
		var ratio=height/width;
		width=800;
		height=width*ratio;
		height=Math.trunc(height);
	}
	else if(width>800&&height!=0){
		var ratio=width/height;
		height=800;
		width=height*ratio;
		width=Math.trunc(width);
	}
	while(width%3!=0){  //make dimensions divisible by 3(no gaps)
		width--;
	}
	while(height%3!=0){
		height--;
	}
	console.log('height'+height+' '+'width'+width);
	var table=document.getElementById("gameTable");
	table.style.width=width;
	table.style.height=height;
	setAllDimension("height",(height/3));
	setAllDimension("width",(width/3));
	visibilityAll('hide');
}
function changeImg(link){  //change image
	var set="url("+link+")";
	var table = document.getElementById("gameTable");
	table.style.backgroundImage = set;
}