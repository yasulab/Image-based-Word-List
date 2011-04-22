// よく使うのでこのように再定義しておくと便利です。
var win	= Titanium.UI.currentWindow;
// get tab group object
var tabGroup = win.tabGroup;

var tangoLabel = Ti.UI.createLabel({
	text:"Image-based WordList!",
	top: -220,
	font:{fontSize:60,fontFamily:"Comic Zine OT"},
	width:"auto",
	textAlign:"center"
});
win.add(tangoLabel);


var learnBtn = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'./images/BUTT_grn_off.png',
	backgroundSelectedImage:'./images/BUTT_grn_on.png',
	top:160,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Learn Word'
});
learnBtn.addEventListener('click', function(e)
{
	//tabGroup.tabs[1].active = true;
	// tabGroup.setActiveTab(1);
	tabGroup.setActiveTab(1);
	// win.tab.open(learnWin);
	//	win.open(learnWin);
});
// add table view to the window
win.add(learnBtn);

var reviewBtn = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'./images/BUTT_yel_off.png',
	backgroundSelectedImage:'./images/BUTT_yel_on.png',
	top:220,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Review Word'
});
reviewBtn.addEventListener('click', function(e)
{
	tabGroup.setActiveTab(2);
});
win.add(reviewBtn);

var challengeBtn = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'./images/BUTT_red_off.png',
	backgroundSelectedImage:'./images/BUTT_red_on.png',
	top:280,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Quiz'
});
challengeBtn.addEventListener('click', function(e)
{
	tabGroup.setActiveTab(3);
});
win.add(challengeBtn);


