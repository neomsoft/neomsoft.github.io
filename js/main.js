var request = new XMLHttpRequest();
request.open('GET', 'https://api.coinmarketcap.com/v1/ticker/bitcoin/');

request.onload = function(e) {
	var response = JSON.parse(this.responseText);
	document.getElementById("course").innerHTML = Math.ceil(response[0].price_usd) + ' $';
}

request.send(null);