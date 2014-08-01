document.addEventListener("DOMContentLoaded", function() { 
	init(); 
});

//navigator.geolocation.getCurrentPosition(GetLocation);

var score = 0;
var limit = 0;
var active = false;
var refreshTime = 1;

//initializarea aplicatiei
function init(){
	console.log("am intrat in init");
	
	this.active = false;
	
	$('#info').hide(); 
	
	//document.getElementById("Run").checked = true;
	console.log($('.Options .toggle').length);
	$(".Options .toggle").click(
		function()
		{
			setSelected(this);
		}
	);
	
	$('#onBtn').click(
		function()
		{
			if ($(this).data('active') === true)
			{
				$(this).data('active', false);
				$(this).html('On');
				$('#info').hide();	
				onFunction();			
			}
			else
			{
				$(this).data('active', true);
				$(this).html('Off');
				$('#info').show();
				
				///Start
				onFunction();
			}			
		}
	);
	
	//document.getElementById('Walk').addEventListener('click', function() { setSelected(this); });
};

//obiectul punct care salveaza coorondatele
function punct(x,y){
	console.log("am intrat in punct");
	
	this.x = x;
	this.y = y;
};

//obiectul options care verifica salveaza optiunea selectata
var options = {
	run : false,
	walk : false,
	drive : false,
	
	setSelected : function(node){
		$('.active').removeClass('active');
		$(node).addClass('active');		
		
	},
	
	getSelected : function (){
		console.log("am intrat in options.getSelected");
		return $('.Options .active').attr('data-type');	
		
	},
};

//obiectul details care retine totalWalk, totalRun si totalDrive. 
var details = {
	totalWalk : 0,
	totalRun : 0,
	totalDrive : 0,
	
	reset : function (){
		console.log("am intrat in details.Reset");
		
		this.totalWalk = 0;
		this.totalRun = 0;
		this.totalDrive = 0;
	},	
};

//GetLocation returneaza coorodnatele dispozitivului
function GetLocation() {
	console.log("am intrat in GetLocation");
		
	return new punct(location.coords.latitude,location.coords.longitude);
};

//distance2Points distanta dintre 2 puncte
function distance2Points(p1,p2){
	console.log("am intrat in distance2Points");
		
	var x3 = (p1.x - p2.x) * (p1.x - p2.x);
	var y3 = (p2.y - p2.y) * (p1.y - p2.y);
	
	return Math.pow((x3 + y3), 1/2);
};

function addDistance(){
	console.log("am intrat in addDistance");
		
	return (Math.random(10) * 10 + 1);
};

//AdaugaScore - adauga puncte urilizatorului in functie de distanta parcursa si optiunea selectata 
function adaugaScore(distance){
	console.log("am intrat in adaugaScore");
		
	if (options.getSelected() == "Walk"){
		if (distance / 1000 > limit){
			this.limit ++;
			this.Score = Score + 2;
		}
	}
	
	if (options.getSelected() == "Run"){
		if (distance / 1000 > limit){
			this.limit ++;
			this.Score = Score + 3;
		}
	}
	
	if (options.getSelected() == "Drive"){
		if (distance / 5000 > limit){
			this.limit ++;
			this.Score = Score + 1;
		}
	}
};


//actiunea butonului ON;
function onFunction(){
	console.log("s-a apasat butonul on" + this.active);
		
	if (this.active == false){
		console.log("active=" + active);
		document.getElementById('info').style.visibility='visible';
		
		this.active = true;
		this.limit = 1;
		
		//Start gps and aplication 
		startTime(0,0,options.getSelected());
	} else {
		console.log("active=" + active);
		this.limit = 1;
		this.active = false;
		
		//hide details
		
  	 	document.getElementById("info").style.visibility='hidden';
		}
};
      
   
function startTime(distanceIn,timeIn,optionIn){
	setTimeout(function () {
		
		// se initializeaza varibaliele 
		var opt = optionIn;    
  	 	var distance = distanceIn; 
		var time = timeIn; 
		var speed;
		time = time + 1; 
		
		//verifica daca s-a modificat pozitia pe gps de la untimul refresh
		if (false){
			var p2 = GetLocation();		
			console.log(p.x + " " + p.y);
			distance = distance + distanta2Pc(p,p2);
			this.p = p2;
		}
	
		//se genereaza o distanta random pentru testare
		var d2 = addDistance();
		
		//se actualizeaza datele 
		distance = distance + d2; 
		aspeed = distance / time; 
		speed = d2/refreshTime;
		
		//verific daca trebuie adaugate puncte
		adaugaScore(distance);  
		
		//actualizez datele in interfata
		document.getElementById('Speed').value=("Speed: " + speed.toFixed(2) + " m/s"); 
		document.getElementById('AverageSpeed').value=("AverageSpeed: " + aspeed.toFixed(2) + " m/s"); 
		document.getElementById('Distance').value=("Distance: " + distance.toFixed(2)+ " m");    
		document.getElementById('Score').value=("Score: " + this.score);                          
    	
    	//daca butonul de on este inca activ si optiunea selecetata este tot aceeasi.
    	//modific distanta totala pentru actiunea selectata
    	if (active == true && opt == options.getSelected()) {
    		console.log("active true, option true" + active + " " + opt);
    		if (opt == "Walk"){
    			details.totalWalk = details.totalWalk + d2;
    			document.getElementById("DistanceOnAction").value = ("Walk distance today: " + details.totalWalk.toFixed(2));
    		} else if (opt == "Run") {
    			details.totalRun = details.totalRun + d2;
    			document.getElementById("DistanceOnAction").value = ("Run distance today: " + details.totalRun.toFixed(2));
    		}   else {
    			details.totalDrive = details.totalDrive + d2;
    			document.getElementById("DistanceOnAction").value = ("Drive distance today: " + details.totalDrive.toFixed(2));
    		}  
      	 	startTime(distance,time,opt);             
  	 	} else {
  	 		//daca butonul nu este activ se fac invizibile informatiile
  	 		if (!active){
  	 			console.log("active false, option true");
  	 			
  	 		} else {
  	 			console.log("active true, option false");
    		
  	 		// butonul este activ dar s-a schimbat optiunea
  	 				
			document.getElementById('Speed').value=("Speed: 0 m/s"); 
			document.getElementById('AverageSpeed').value=("AverageSpeed: 0 m/s"); 
			document.getElementById('Distance').value=("Distance: 0 m");
			
			if (opt == "Walk"){
				this.limit = 1;
    			document.getElementById("DistanceOnAction").value = ("Walk distance today: " + details.totalWalk.toFixed(2));
    			startTime(0,0,options.getSelected());
    		} else if (opt == "Run") {
    			this.limit = 1;
    			document.getElementById("DistanceOnAction").value = ("Run distance today: " + details.totalRun.toFixed(2));
    			startTime(0,0,options.getSelected());
    		}   else {
    			this.limit = 1;
    			document.getElementById("DistanceOnAction").value = ("Drive distance today: " + details.totalDrive.toFixed(2));
    			startTime(0,0,options.getSelected());
    		}     
  	 		}           
  	 	}             
  }, refreshTime * 1000);
}

function setSelected(node){
	options.setSelected(node);	
}
