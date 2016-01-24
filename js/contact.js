function contact_toggle(a) {
	if (a.tagName !== 'A') { var a = a.parentElement; }
	var i = a.getElementsByTagName("i")[0];
	var className = i.getAttribute("class");
	var position_icon = className.indexOf("animated_contact_icon");
	if (position_icon === -1) {
		i.className += " animated_contact_icon";
	} else {
		i.className = className.substring(0, position_icon - 1);
	}
}

addLoadEvent(function() {
	var ids = ["lista_1", "lista_2"];
	for (var _id = 0; _id < ids.length; _id++) {
		var lista = document.getElementById(ids[_id]).getElementsByTagName("li");
		console.log("Contact (" + _id + "): " + lista.length);
		for (var i = 0; i < lista.length; i++) {
			var li = lista[i];
			li.className = "contact_list_item";
			var a = li.getElementsByTagName("a")[0];
			a.className = "contact_hyperlink";
			a.addEventListener('mouseover', function(event) { contact_toggle(event.target || event.srcElement); });
			a.addEventListener('mouseout', function(event) { contact_toggle(event.target || event.srcElement); });
			var ic = a.getElementsByTagName("i")[0];
			ic.className = ic.className + " contact_icon";
		}
	}
});