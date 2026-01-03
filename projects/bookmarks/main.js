var body = "";
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		createBoby(this);
	}
};

xmlhttp.open("GET", "reading.xml", true);
xmlhttp.send();

function createBoby(xml) {
	var xmlDoc = xml.responseXML;
	var childNodes = xmlDoc.getElementsByTagName("xbel")[0].childNodes

	for (var i = 0; i < childNodes.length; i++) {
		addElements(childNodes[i]);
	}

	document.body.innerHTML += body;

	addOnClicks();
}

function addElements(node) {
	if (node.nodeName == 'folder') {
		body += '<div>';

		body += '<div type="button" class="folder_title">';
		body += node.getElementsByTagName('title')[0].textContent;
		body += '</div>';

		body += '<div class="content">';

		for (var i = 0; i < node.childNodes.length; i++) {
			addElements(node.childNodes[i]);
		}

		body += '</div>';
		body += '</div>';
	}

	if (node.nodeName == 'bookmark') {
		body += '<a href="';
		body += node.attributes['href'].textContent;
		body += '">';
		body += '<div class="bookmark">';
		body += node.getElementsByTagName('title')[0].textContent;
		body += '</div>';
		body += '</a>';
	}
}

function addOnClicks() {
	var titles = document.getElementsByClassName("folder_title");

	for (var i = 0; i < titles.length; i++) {
		titles[i].addEventListener("click", function() {
			var content = this.nextElementSibling;
			
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "block";
			}
		});
	}
}