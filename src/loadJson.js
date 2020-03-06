function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");

	xobj.onreadystatechange = function () {
		if (xobj.readyState === 4 && xobj.status === "200") {
			// Required use of an anonymous callback as .open will NOT return
			// a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		} else {
			callback("[{\"Nothing\"}]");
		}
	};

	xobj.open('GET', 'picks_content.json', true);
	// Maybe you require use of an unknown origin.
	/*xobj.setRequestHeader("Access-Control-Allow-Origin","*");*/
	xobj.send(null);
};

loadJSON(function (response) {
	// Parse JSON string into object
	//document.getElementById("demo").innerHTML = JSON.parse(response);
	// Parse JSON array string into object
	//document.getElementById("demo").innerHTML = JSON.stringify(response);
	var obj = JSON.parse(response);
	var text = "Json file contains " + obj.Events.length + " events.<br>";
	text += "<h2>" + obj.Heading + "</h2>";
	var i;
	for (i = 0; i < obj.Events.length; i++) {
		//text += "<br>Event#  " + (i + 1);
		text += "<p>" + obj.Events[i].title;
		text += " " + obj.Events[i].badges;
		text += "<br>" + obj.Events[i].description;
		if (obj.Events[i].links !== "")
			text += obj.Events[i].links;
		if (obj.Events[i].sponsor !== "")
			text += "<br>" + obj.Events[i].sponsor;
		text += "</p>";
	}
	//document.getElementById("post").innerHTML = text;
	return text
});
