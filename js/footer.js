function footer_toggle(i) {
	var className = i.getAttribute("class");
	var position_icon = className.indexOf("animated_footer_icon");
	console.log(i.tagName, className);
	if (position_icon === -1) {
		i.className += " animated_footer_icon";
	} else {
		i.className = className.substring(0, position_icon - 1);
	}
}

addLoadEvent(function() {
	var lista = document.getElementsByClassName("footer-social")[0].getElementsByTagName("li");
	console.log("Footer: " + lista.length);
	for (var i = 0; i < lista.length; i++) {
		var li = lista[i];
		var a = li.getElementsByTagName("a")[0];
		a.className = "footer_hyperlink";
		a.addEventListener('mouseover', function(event) { footer_toggle(event.target || event.srcElement); });
		a.addEventListener('mouseout', function(event) { footer_toggle(event.target || event.srcElement); });
	}
});