// create table view data object
var words = ["Sky", "Lion", "Apple", "Sun", "Book"];
var data = [];
for(i=0;i<words.length;i++){
	data.push({
		title: words[i],
		hasChild:false
	});
}
/*
var data = [
	{
		title:'YQL + Flickr', hasChild:false,
	 	//test:'./yql_flickr.js'
	 }
];
*/
// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

