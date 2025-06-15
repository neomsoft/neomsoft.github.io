var body = "";

function loadXMLDoc() {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			createBoby(this);
		}
	};


	xmlhttp.open("GET", "reading.xml", true);
	xmlhttp.send();
}

function createBoby(xml) {
	var xmlDoc = xml.responseXML;
	var childNodes = xmlDoc.getElementsByTagName("xbel")[0].childNodes

	for (var i = 0; i < childNodes.length; i++) {
		addElements(childNodes[i]);
	}

	document.body.innerHTML += body;
}

function addElements(node) {
	if (node.nodeName == 'folder') {
		body += '<div class="folder">';

		for (var i = 0; i < node.childNodes.length; i++) {
			addElements(node.childNodes[i]);
		}

		body += '</div>';
	}

	if (node.nodeName == 'title') {
		body += '<h4>';
		body += node.textContent;
		body += '</h4>';
	}

	if (node.nodeName == 'bookmark') {
		body += '<div class="bookmark">';
		body += '<a class="button" href="';
		body += node.attributes['href'].textContent;
		body += '">';
		body += node.getElementsByTagName('title')[0].textContent;
		body += '</a>';
		body += '</div	>';
	}
}

loadXMLDoc();
