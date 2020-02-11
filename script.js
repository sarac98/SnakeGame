var cvs = document.getElementById("kanvas");
var ctx = cvs.getContext("2d");
var p= document.getElementById("score");
var score=0;
var polje=30;
var zmija=[];
var speed=100;
var newHead;
var zid=document.getElementById("krozzid");
var bezprolaza=document.getElementById("bezprolaza");
var kont=document.getElementById("kont");
var label=document.getElementById("lb");
var skor=document.getElementById("skor");
skor.style.visibility='hidden';
label.style.visibility='hidden';
var json={
    "igraci":[
        {"username":"Predrag", "score":"2000"}, 
        {"username":"Ana", "score":"1960"}, 
        {"username":"Marko", "score":"1800"},
        {"username":"Jovana","score":"1700"},
        {"username":"Srdjan","score":"1600"},
        {"username":"Mita","score":"1300"},
        {"username":"Zoran","score":"1200"},
        {"username":"Natasa","score":"800"},
        {"username":"Jovan","score":"600"},
        {"username":"Aleksndara","score":"500"},
        {"username":"Aca","score":"400"},
        {"username":"Sonja","score":"300"},
        {"username":"Marina","score":"200"},
        {"username":"Milica","score":"150"},
        {"username":"Pera","score":"0"},
        {"username":"Paja","score":"0"},
      ]
}
var proveri=true;
function Skor()
{
    if(proveri==true)
    {
    skor.style.visibility='visible';
    proveri=false;
    }
    else{
        skor.style.visibility='hidden';
        proveri=true;
    }
    document.getElementById("skor").innerHTML="";
    for (let i = 0; i < json.igraci.length; i++) {
        {
        document.getElementById("skor").innerHTML+=(i+1)+". "+
        json.igraci[i].username+":"+json.igraci[i].score+"<br>";
        }
    }
}




var igra;
p.innerHTML="Score: "+score;
var voce={
    x : Math.floor(Math.random()*20)*polje,
    y : Math.floor(Math.random()*20)*polje
}

zmija[0]={
    x : 10*polje,
    y : 10*polje
}
var d;

var gameover=new Image();
gameover.src="download.jpg";
var mapa=new Image();
mapa.src="Capture.png";

var hrana=new Image();
hrana.src="food.png"
/*function Mapa()
{
    for(var i=0;i<(polje+10);i++)
    for(var j=0;j<(polje+10);j++)
    {
    ctx.strokeRect(i*polje,j*polje,polje,polje);
    ctx.strokeStyle = "black";
    }
}*/
var prik=true;
function Opcije()
{
    
    if(prik==true)
    {
    label.style.visibility='visible';
    prik=false;
    }
    else{
        label.style.visibility='hidden';
        prik=true;
    }
}
function Kretanje(event)
{
    if(event.keyCode==37&&d!="RIGHT")
     d="LEFT";
    else if(event.keyCode==38&& d!="DOWN")
    d="UP";
    else if(event.keyCode==39&&d!="LEFT")
    d="RIGHT";
    else if(event.keyCode==40&& d!="UP")
    d="DOWN";
}


document.addEventListener("keydown",Kretanje);
function BezProlaza()
{
    if(newHead.x>=600 || newHead.y>=600 || newHead.x<0 || newHead.y<0)
   {
    clearInterval(igra);
    ctx.drawImage(gameover,135,200);    
   }
}
function Prolazi()
{
    
    
    if(newHead.x>=600)
    newHead.x=-30;
    else if(newHead.x<0)
    newHead.x=600;
    else if(newHead.y>600)
    newHead.y=-30;
    else if(newHead.y<0)
    newHead.y=600;
    
}

function SamSebe()
{
    for(var i=0;i<zmija.length;i++)
    {
        if(i>0)
        if(zmija[i].x==newHead.x&&zmija[i].y==newHead.y)
        {
          clearInterval(igra);
          ctx.drawImage(gameover,135,200);  
        }
    } 
}

function Draw()
{
    
    
    ctx.drawImage(mapa,0,0);
    for(var i=0;i<zmija.length;i++)
    {
        if(i==0)
        {
        
        ctx.fillStyle="black";
        }
        else ctx.fillStyle="green";

        ctx.fillRect(zmija[i].x,zmija[i].y,polje,polje);
    }
    //console.log(zmija.length);
    ctx.drawImage(hrana,voce.x,voce.y);
    var zmijaX=zmija[0].x;
    var zmijaY=zmija[0].y;
    if(d == "LEFT")
    zmijaX-=polje;
    if(d =="UP")
    zmijaY-=polje;
    if(d == "RIGHT")
    zmijaX+=polje;
    if(d == "DOWN")
    zmijaY+=polje;
    if(zmijaX == voce.x && zmijaY == voce.y)
    {
        score+=10;
        speed-=20;
        p.innerHTML="Score: "+score;
        voce={
                    x : Math.floor(Math.random()*20)*polje,
                    y : Math.floor(Math.random()*20)*polje
                    }
        for(var i=0;i<zmija.length;i++)
        {
            if(zmija[i].x==voce.x&&zmija[i].y==voce.y)
            {
                voce={
                    x : Math.floor(Math.random()*20)*polje,
                    y : Math.floor(Math.random()*20)*polje
                    }
            }
        }    
    }
    else
    {
    
zmija.pop();
    }
   newHead={
        x : zmijaX,
        y : zmijaY
   }
    zmija.unshift(newHead); 
    //BezProlaza();
    //Prolazi();
     SamSebe(); 
    if(zid.checked)
    {
        BezProlaza();
    }
    else 
    {
        Prolazi();
    }
}

igra=setInterval(Draw,speed);
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
function postaviBoju()
{
 var trenutno=new Data();
 var izabranaBoja=document.getElementById("selekt").value;
 if(izabranaBoja!="Izberiboju")
 {
 document.bgColor=izabranaBoja;
 document.cookie="color"+izabranaBoja+ ";expires"+addMinutes(trenutno,1)+";";
 }
}
window.onload=function()
{
    if(document.cookie.length!=0)
    {
        var niz=document.cookie.split("=");
        document.bgColor=niz[1];
        document.getElementById("selekt").value=niz[1];
        }
}




