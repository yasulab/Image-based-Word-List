// よく使うのでこのように再定義しておくと便利です。
var win	= Titanium.UI.currentWindow;

var word = "Sky"
// 一段Viewを間に挟むようにします。
var word_view	= Ti.UI.createView({
	top: 20,
	height:300,
	width:'auto',
	layout:'horizontal'
});

// move scroll view left
var left = Titanium.UI.createButton({
	top: 30,
	left: 20,
	//width:'auto',
	image:'./images/icon_arrow_left.png'
});
left.addEventListener('click', function(e)
{
	//if (i == 0) return;
	//i--;
	//scrollView.scrollToView(i);
});

// move scroll view right
var right = Titanium.UI.createButton({
	top: 30,
	right: 20,
	//width:50,
	image:'./images/icon_arrow_right.png'
});
right.addEventListener('click', function(e)
{
	//if (i == (scrollView.views.length-1)) return;
	//i++;
	//scrollView.scrollToView(scrollView.views[i]);
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

// label1 に表示位置の指定を追加します。
var label2 = Titanium.UI.createLabel({
	color:'#999',
	text: word,
	font:{fontSize:40,fontFamily:'Helvetica Neue'},
	height: 50,
	width:'auto',
	//top:20
});
word_view.add(flexSpace);
//word_view.add(left);
win.add(left);
word_view.add(label2);
//word_view.add(right);
win.add(right);
word_view.add(flexSpace);
win.add(word_view);

function getOrientation(o)
{  //Came from orientation.js, but we didn't need the buttons and such
	switch (o)
	{
		case Titanium.UI.PORTRAIT:
		{
			return 'portrait';
		}
		case Titanium.UI.UPSIDE_PORTRAIT:
		{
			return 'upside portrait';
		}
		case Titanium.UI.LANDSCAPE_LEFT:
		{
			return 'landscape left';
		}
		case Titanium.UI.LANDSCAPE_RIGHT:
		{
			return 'landscape right';
		}
		case Titanium.UI.FACE_UP:
		{
			return 'face up';
		}
		case Titanium.UI.FACE_DOWN:
		{
			return 'face down';
		}
		case Titanium.UI.UNKNOWN:
		{
			return 'unknown';
		}
	}
}

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{

	// get orienation from event object
	var orientation = getOrientation(e.orientation);
});


Ti.App.fireEvent("show_indicator");

var navActInd = null;
if (Titanium.Platform.name == 'iPhone OS') {
	navActInd = Titanium.UI.createActivityIndicator();
	navActInd.show();
	Titanium.UI.currentWindow.setRightNavButton(navActInd);
}

// add table view to the window
//Titanium.UI.currentWindow.add(tableview);

Titanium.Yahoo.yql('select * from flickr.photos.search where text="'+word+'" limit 10', function(e)
{
	var images = [];
	var data = e.data;
	if (data == null)
	{
		Titanium.UI.createAlertDialog({
			title: 'Error querying YQL',
			message: 'No data could be retrieved using YQL' }).show();
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
	if(navActInd){
		navActInd.hide();
	}
	Ti.App.fireEvent("hide_indicator");
	
	var scrollImgView = Titanium.UI.createScrollableView({
		views:images,
		showPagingControl:true,
		pagingControlHeight:30,
		maxZoomScale:2.0,
		currentPage:1,
		bottom:90,
		height:200
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

var scrollUsageView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	bottom:0,
	height:90,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var usageView = Ti.UI.createView({
	backgroundColor:'#336699',
	borderRadius:10,
	width:300,
	height:2000,
	top:10
});
var button = Titanium.UI.createButton({
	title:'Scroll to Top',
	height:40,
	width:200,
	bottom:10
});
usageView.add(button);
button.addEventListener('click', function()
{
	scrollUsageView.scrollTo(0,0);
});

var button2 = Titanium.UI.createButton({
	title:'Add to Scroll View',
	height:40,
	width:200,
	bottom:90
});
scrollUsageView.add(button2);
button2.addEventListener('click', function()
{
	var view = Ti.UI.createView({
		backgroundColor:'red',
		borderRadius:10,
		width:300,
		height:300,
		top:2020
	});
	scrollUsageView.add(usageView);
});
scrollUsageView.add(usageView);
win.add(scrollUsageView);
