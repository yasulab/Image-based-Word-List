// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup(
{
	bottom:0
});

//
// create controls tab and root window
//
var mainWin = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff',
    url: 'mainWin.js'
});
var mainTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Home',
    window: mainWin
});

var learnWin = Titanium.UI.createWindow({
	title:'Learn Word',
	backgroundColor:'#fff',
	url: 'learnWin.js',
	word_index: 0
});
var learnTab = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title:'Learn',
	window: learnWin
});

// tab 3 - ChallengeMode
var challengeWin = Titanium.UI.createWindow({  
    title:'Quiz',
    backgroundColor:'#fff',
    url: 'challengeWin.js',
    used_word_list: []
});
var challengeTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Quiz',
    window: challengeWin
}); 

// tab 4 - Review
var reviewWin = Titanium.UI.createWindow({  
    title:'Review',
    backgroundColor:'#fff',
    url: 'yql.js'
});
var reviewTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Review',
    window:reviewWin
}); 

// tab 5 - Setting
var settingWin = Titanium.UI.createWindow({  
    title:'Setting',
    backgroundColor:'#fff',
    url: 'settingWin.js'
});
var settingTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Setting',
    window:settingWin
}); 

//
//  add tabs
//
tabGroup.addTab(mainTab);
tabGroup.addTab(learnTab);    
tabGroup.addTab(reviewTab);
tabGroup.addTab(challengeTab);
tabGroup.addTab(settingTab);

// open tab group
tabGroup.open();
