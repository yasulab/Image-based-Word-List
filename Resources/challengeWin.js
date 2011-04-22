function debug(msg){
	var debugDialog = Titanium.UI.createAlertDialog({
		title:"debug",
		message: msg
	});
	debugDialog.show();
}

function moveNextWin()
{
	//for(i=0;i<used_word_list.length;i++){
	//	debug(used_word_list[i]);
	//}
	var nextWin = Titanium.UI.createWindow({  
    	title:'Challenge',
    	backgroundColor:'#fff',
    	url: 'challengeWin.js',
    	used_word_list: used_word_list
	});
	win.tab.open(nextWin);
}
function shuffle(list) {
  var i = list.length;

  while (--i) {
  	Ti.API.info("shuffle");
    var j = Math.floor(Math.random() * (i + 1));
    if (i == j) continue;
    var k = list[i];
    list[i] = list[j];
    list[j] = k;
  }

  return list;
}
function getCorrectAnswer(){
	var correctAnswer = words[Math.floor(Math.random()*words.length)];
	while(win.used_word_list.indexOf(correctAnswer, 0) != -1){
		//Ti.API.info("gca("+win.used_word_list.indexOf(correctAnswer, 0)+"): picked word is " + correctAnswer);
		correctAnswer= words[Math.floor(Math.random()*words.length)];
	}
	return correctAnswer;
}
function getWrongAnswer(correctAnswer){
	var wrongAnswer = words[Math.floor(Math.random()*words.length)];
	while(wrongAnswer == correctAnswer){
		Ti.API.info("gwa");
		wrongAnswer = words[Math.floor(Math.random()*words.length)];
	}
	return wrongAnswer;
}

// よく使うのでこのように再定義しておくと便利です。
var win	= Titanium.UI.currentWindow;
var words = ["Sky", "Lion", "Apple", "Sun", "Book"];

var	ca = getCorrectAnswer();
var used_word_list = win.used_word_list;
used_word_list.push(ca);
var	wa1 = getWrongAnswer(ca);
var	wa2 = getWrongAnswer(ca);
var	wa3 = getWrongAnswer(ca);
var	answers = [ca, wa1, wa2, wa3];
answers = shuffle(answers);
var word = ca;
var correctAnswer = ca;



var answerNav = Titanium.UI.createButton(
	{
		title:'Answer'
	}
);
answerNav.addEventListener('click', function(e)
{
	//moveNextWin();
	//TODO: Create Kotae Awase
});
var rightNav = Titanium.UI.createButton(
	{
		title:'Next'
	}
);
rightNav.addEventListener('click', function(e)
{
	moveNextWin();
});
if (win.used_word_list.length < words.length-1){
	win.rightNavButton = rightNav;
}else{
	win.rightNavButton = answerNav;
}
//win.titleControl = rightNav;
win.backButtonTitle = 'Prev';


Ti.App.fireEvent("show_indicator");
Titanium.Yahoo.yql('select * from flickr.photos.search where text="'+word+'" limit 10', function(e)
{
	var images = [];
	var data = e.data;
	if (data == null)
	{
		Titanium.UI.createAlertDialog({
			title: 'Error querying YQL',
			message: "Sorry, we were not able to get any image from the web for the network problem." }).show();
		Ti.App.fireEvent('hide_indicator');
		return;
	}
	
	for (var c=0;c<data.photo.length;c++)
	{
		var photo = data.photo[c];
		// form the flickr url
		var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg';
		Ti.API.info("flickr url = "+url);
		var image;
		image = Ti.UI.createImageView({
			image : url,
			height:150,
			width:150,
			//left:10,
			//defaultImage:'../modules/ui/images/photoDefault.png'
		});
		images[c] = image;
	}
	//tableview.setData(images);
	/*
	if(navActInd){
		navActInd.hide();
	}
	*/
	Ti.App.fireEvent("hide_indicator");
	
	var scrollImgView = Titanium.UI.createScrollableView({
		views:images,
		showPagingControl:true,
		pagingControlHeight:30,
		maxZoomScale:2.0,
		currentPage:0,
		top:20,
		height:190
	});
	
	var i=1;
	var activeView = images[0];
	
	scrollImgView.addEventListener('scroll', function(e)
	{
		activeView = e.view;  // the object handle to the view that is about to become visible
		i = e.currentPage;
		Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
	});
	scrollImgView.addEventListener('click', function(e)
	{
		Ti.API.info('ScrollImgView received click event, source = ' + e.source);
	});
	scrollImgView.addEventListener('touchend', function(e)
	{
		Ti.API.info('ScrollImgView received touchend event, source = ' + e.source);
	});

	//view.add(scrollImgView);
	win.add(scrollImgView);
});

var rowdata = {
	title:'My Partial HTML', 
	//hasChild:true, 
	//partial:true, 
	url:'http://www.twigraphy.org/eitango/api?word='+word
};// e.rowData;
var w = Ti.UI.createWindow();
w.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

//var rand = Math.floor(Math.random()*5);
//var words = ["Sky", "Lion", "Apple", "Sun", "Book"];

var label = Titanium.UI.createLabel({
	bottom: 120,
	color:'#999',
	text: "This image is",
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	height: 30,
	width:'auto',
});

var a = Titanium.UI.createAlertDialog({
	title:'Your answer is ',
	message:'test'
});
var answer0 = Titanium.UI.createButton({
	title: answers[0],
	height:35,
	width:130,
	bottom:75,
	left:20
});
answer0.addEventListener('click', function()
{
	if(answers[0]==correctAnswer){
		a.message='correct!';
	}else{
		a.message='wrong!';
	}
	a.show();
});
var answer1 = Titanium.UI.createButton({
	title: answers[1],
	height:35,
	width:130,
	bottom:75,
	right:20
});
answer1.addEventListener('click', function()
{
	if(answers[1]==correctAnswer){
		a.message='correct!';
	}else{
		a.message='wrong!';
	}
	a.show();
});
var answer2 = Titanium.UI.createButton({
	title: answers[2],
	height:35,
	width:130,
	bottom:25,
	left:20
});
answer2.addEventListener('click', function()
{
	if(answers[2]==correctAnswer){
		a.message='correct!';
	}else{
		a.message='wrong!';
	}
	a.show();
});
var answer3 = Titanium.UI.createButton({
	title: answers[3],
	height:35,
	width:130,
	bottom:25,
	right:20
});
answer3.addEventListener('click', function()
{
	if(answers[3]==correctAnswer){
		a.message='correct!';
	}else{
		a.message='wrong!';
	}
	a.show();
});

win.add(label);
win.add(answer0);
win.add(answer1);
win.add(answer2);
win.add(answer3);


