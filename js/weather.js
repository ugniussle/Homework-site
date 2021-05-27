function setData(){
    var city=document.getElementById("input").value;
    fetch('/weather',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            city:city
        })
    }).then(res=>res.json()).then(data=>{
        console.log(data);
        var el=document.getElementsByClassName("tempature")[0];
        el.innerHTML="Tikroji temperatūra: ";
        el.innerHTML+=data.temp+"°C<br>";
        el.innerHTML+="Jaučiasi kaip: ";
        el.innerHTML+=data.feels_like+"°C";
        el.style.display="block";
    })

}