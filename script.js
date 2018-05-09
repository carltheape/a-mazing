$(function () {
  // Grab the template script
  var theTemplateScript = $("#address-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    "bkL" : `	
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>`,
				
	"bkT" : `	
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>`,
				
	"bkI" : `	
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:dimgrey"></div>`,
				
	"bkX" : `	
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:dimgrey"></div>`
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.content-placeholder').html(theCompiledHtml);

//show sidebar menu
$('.sidebar-button').click(function (e) {
	e.preventDefault();
	$('.sidebar-button').toggleClass("transparent");
	$('.sidebar').toggleClass("hide-left");
		if ($('.sidebar').hasClass( "hide-left" )) {
			$('.sidebar-button').html(">");
		}
		else{
			$('.sidebar-button').html("<");
	
		}
	
})


$('.pushDown').click(function (e) {
	e.preventDefault();
	console.log("click");
	
})
	
	
	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtu5whsrX1ciloDrTetjfkTBQrF1E3nmc",
    authDomain: "game-cc9fc.firebaseapp.com",
    databaseURL: "https://game-cc9fc.firebaseio.com",
    projectId: "game-cc9fc",
    storageBucket: "game-cc9fc.appspot.com",
    messagingSenderId: "474431507755"
  };
  firebase.initializeApp(config);
  
  let database = firebase.database();
  let rot = 0;
  
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(error);
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(uid);   

  } else {
    // User is signed out.
    // ...
  }
  // ...
});

$(document).mousemove(function(e){
    var uu = firebase.auth().currentUser.uid;
	// console.log('uu: ',uu);
    var x = e.pageX;
    var y = e.pageY;
    var rotate = rot;
    rot += 1;
    if (rot >= 360) {
    	rot = 0
    }
    
    database.ref(`position/${uu}`).update({x: x,
									  	   y: y,
									  	rotate: rotate});
});


var positionRef = firebase.database().ref(`position/`);
positionRef.on('value', function(snapshot) {
  
  // console.log(Object.keys(snapshot.val()));
  
for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
	
	if (!document.getElementById(Object.keys(snapshot.val())[i])) {
	  	var node = document.createElement("DIV");
		node.id = Object.keys(snapshot.val())[i];                 
		var textnode = document.createTextNode(node.id);        
		node.appendChild(textnode);                              
		document.getElementById("body").appendChild(node);
	} 
	  // console.log(Object.keys(snapshot.val())[i]);
	  
	  for (var users in snapshot.val()) {
	  var d = document.getElementById(Object.keys(snapshot.val())[i]);
	  	// console.log(snapshot.val()[users].x);
		  d.style.position = "absolute";
		  d.style.left = snapshot.val()[Object.keys(snapshot.val())[i]].x+'px';
		  d.style.top = snapshot.val()[Object.keys(snapshot.val())[i]].y+'px';
		  d.style.transform = `rotate(${snapshot.val()[Object.keys(snapshot.val())[i]].rotate}deg)`;	
	  // console.log(d.style.left, d.style.top)
	  }
  }  
  
});

//click to scroll...
$(function(){
  var curDown = false,
      curYPos = 0,
      curXPos = 0;
  $(window).mousemove(function(m){
    if(curDown === true){
     $(window).scrollTop($(window).scrollTop() + (curYPos - m.pageY)); 
     $(window).scrollLeft($(window).scrollLeft() + (curXPos - m.pageX));
    }
  });
  
  $(window).mousedown(function(m){
    curDown = true;
    curYPos = m.pageY;
    curXPos = m.pageX;
  });
  
  $(window).mouseup(function(){
    curDown = false;
  });
});


let tileL = `	<button class='rotate cw'>&#10227;</button>
				<button class='rotate ccw'>&#10226;</button>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>`;
				
let tileT = `	<button class='rotate cw'>&#10227;</button>
				<button class='rotate ccw'>&#10226;</button>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>`;
				
let tileI = `	<button class='rotate cw'>&#10227;</button>
				<button class='rotate ccw'>&#10226;</button>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:grey"></div>`;
				
let tileX = `	<button class='rotate cw'>&#10227;</button>
				<button class='rotate ccw'>&#10226;</button>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>
				<div class="inner" style="background-color:tan"></div>
				<div class="inner" style="background-color:grey"></div>`;

let tileBag = [];
let degArray = [0, 90, 180, 270];

for (var i = 0; i < 100; i++) {
	// console.log(i);
	if (i < 30) {
		tileBag.push(tileI);
	}
	else if (i >= 30 && i < 55) {
		tileBag.push(tileL);
	}
	else if (i >= 55 && i < 85) {
		tileBag.push(tileT);
	}
	else {
		tileBag.push(tileX)
	}
};
// var rand = tileBag[Math.floor(Math.random() * tileBag.length)];
// console.log(rand);

// console.log(tileBag[0]);
for (var i = 1; i < 10; i++) {
	for (var j = 1; j < 10; j++) {
		let randoTile = tileBag[Math.floor(Math.random() * tileBag.length)];
		let randoDeg = degArray[Math.floor(Math.random() * degArray.length)];
		tileBag.splice(randoTile, 1);
		
		if (!$(`.row${i} > .column${j}`).html()) {
			$(`.row${i} > .column${j}`).html(randoTile);
			$(`.row${i} > .column${j}`).css({'transform' : 'rotate('+ parseInt(randoDeg) +'deg)'});
		}
		
	}
}
// $(".row1 > .column1").html(tileL);

$('.cw').click(function () {
	rotate($(this), 90)
})

$('.ccw').click(function () {
	rotate($(this), -90)
})


    
var rotate = function(ele, deg){
	let degree;
	let parent = ele.closest( "td" )[0];
	// console.log(parent.style.transform);
	// console.log(ele.closest( "td" ));
	if (parent.style.transform == "" || parent.style.transform === 'rotate(0deg)') {
		degree = 0
	}
	else if (parent.style.transform === 'rotate(90deg)') {
		degree = 90
	}
	else if (parent.style.transform === 'rotate(180deg)') {
		degree = 180
	}
	else if (parent.style.transform === 'rotate(270deg)') {
		degree = 270
	}
	else if (parent.style.transform === 'rotate(360deg)') {
		degree = 0
	}
	else if (parent.style.transform === 'rotate(-90deg)') {
		degree = 270
	}
	// console.log(parent.style.transform);
	// console.log(degree, deg, parseInt(degree + deg));
	
	    $({degs: degree}).animate({degs: degree+deg}, {
        duration: 750,
        step: function(now){
            $(parent).css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
	
};
console.log(tileBag)
});