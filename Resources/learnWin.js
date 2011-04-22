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

// よく使うのでこのように再定義しておくと便利です。
var win	= Titanium.UI.currentWindow;
//win.hideTabBar();
var words = ["Sky", "Lion", "Apple", "Sun", "Book"];
var word = words[win.word_index];
// 一段Viewを間に挟むようにします。
var word_view	= Ti.UI.createView({
	top: 20,
	height:300,
	width:'auto',
	layout:'horizontal'
});

var rightNav = Titanium.UI.createButton(
	{
		title:'Next'
	}
);
rightNav.addEventListener('click', function(e)
{
	var nextWin = Titanium.UI.createWindow({  
    	title:'Learn tango!',
    	backgroundColor:'#fff',
    	url: 'learnWin.js',
    	word_index: win.word_index + 1
	});
	win.tab.open(nextWin);
});
if (win.word_index < words.length-1){
	win.rightNavButton = rightNav;
}
//win.titleControl = rightNav;
win.backButtonTitle = 'Prev';

// Check Box Label
var checkBoxLabel = Titanium.UI.createLabel({
	top: 20,
	right: 0,
	color:'#999',
	text: "Learned?",
	font:{fontSize:10,fontFamily:'Helvetica Neue'},
	height: 'auto',
	width:'auto',
});
win.add(checkBoxLabel);

// Check Box
var checkBox = Titanium.UI.createButton({
	top: 35,
	right: 15,
	height:20,
	width:20,
	image: './images/checkBox_off.png'
});
var checkBoxFlag = false;
checkBox.addEventListener('click', function(e)
{
	if (checkBoxFlag){
		checkBox.image = './images/checkBox_off.png';
		checkBoxFlag = false;
	}else{
		checkBox.image = './images/checkBox_on.png';
		checkBoxFlag = true;
	}
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

// label1 に表示位置の指定を追加します。
var word_label = Titanium.UI.createLabel({
	color:'#999',
	text: word,
	font:{fontSize:40,fontFamily:'Helvetica Neue'},
	height: 50,
	width:'auto',
	//top:20
});
word_view.add(flexSpace);
//word_view.add(left);
//win.add(left);
word_view.add(word_label);
//word_view.add(right);
win.add(checkBox);
word_view.add(flexSpace);
win.add(word_view);


//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{
	// get orienation from event object
	var orientation = getOrientation(e.orientation);
});

Ti.App.fireEvent("show_indicator");

/*
var navActInd = null;
if (Titanium.Platform.name == 'iPhone OS') {
	navActInd = Titanium.UI.createActivityIndicator();
	navActInd.show();
	Titanium.UI.currentWindow.setRightNavButton(navActInd);
}
*/

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
		top:70,
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

var webview = Ti.UI.createWebView(
	{
		height: 110,
		width: 'auto',
		bottom: 0
	});

	//
	// handle other cases
	//
	if (rowdata.url)
	{
		webview.url = rowdata.url;
	}
	else
	{
		webview.html = rowdata.innerHTML;
	}
	if (rowdata.scale)
	{
		// override the default pinch/zoom behavior of local (or remote) webpages
		// and either allow pinch/zoom (set to true) or not (set to false)
		webview.scalesPageToFit = true;
	}
	
	if (rowdata.username)
	{
		webview.setBasicAuthentication(rowdata.username, rowdata.password);
	}
	//if (rowdata.partial)
	//{
		//webview.height = 90;
		//webview.bottom = 0;
	//}
	
	// test out applicationDataDir file usage in web view
	var f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images', 'apple_logo.jpg');
	var f2 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'apple_logo.jpg');
	f2.write(f1);
	
	webview.addEventListener('load',function(e)
	{
		Ti.API.debug("webview loaded: "+e.url);
		if (rowdata.evaljs)
		{
			alert("JS result was: "+webview.evalJS("window.my_global_variable")+". should be 10");
		}
		if (rowdata.evalhtml)
		{
			alert("HTML is: "+webview.html);
		}
		Ti.App.fireEvent('image', {path:f2.nativePath});
	});
	if (rowdata.bgcolor)
	{
		webview.backgroundColor = rowdata.bgcolor;
	}
	if (rowdata.border)
	{
		webview.borderRadius=15;
		webview.borderWidth=5;
		webview.borderColor = 'red';
	}
	
	if (rowdata.controls)
	{
		// test web controls
		var bb2 = Titanium.UI.createButtonBar({
			labels:['Back', 'Reload', 'Forward'],
			backgroundColor:'#003'
		});
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		w.setToolbar([flexSpace,bb2,flexSpace]);
		webview.addEventListener('load',function(e)
		{
			Ti.API.debug("url = "+webview.url);
			Ti.API.debug("event url = "+e.url);
		});
		bb2.addEventListener('click',function(ce)
		{
			if (ce.index == 0)
			{
				webview.goBack();
			}
			else if (ce.index == 1)
			{
				webview.reload();
			}
			else
			{
				webview.goForward();
			}
		});
	}
	
	w.add(webview);
	
	function hideToolbar(e)
	{
		Ti.API.info('received hidetoolbar event, foo = ' + e.foo);
		if (Titanium.Platform.name == 'iPhone OS') {
			w.setToolbar(null,{animated:true});
		} else {
			if (toolbar != null) {
				w.remove(toolbar);
			}
		}
	}
	// hide toolbar for local web view
	Ti.App.addEventListener('webview_hidetoolbar', hideToolbar);
	
	w.addEventListener('close',function(e)
	{
		Ti.API.info("window was closed");
		
		// remove our global app event listener from this specific
		// window instance when the window is closed
		Ti.App.removeEventListener('webview_hidetoolbar',hideToolbar);
	}
);

// add table view to the window
win.add(webview);
