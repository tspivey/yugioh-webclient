import StayDown from 'staydown';
var staydown;
$(document).ready(function () {
	var target = document.getElementById('output');
	staydown = new StayDown({
		target: target
	});
	output("Connecting...");
	try {
		var sock = new WebSocket('wss://allinaccess.com:1235');
		sock.onopen = function(e) {
			output("Connected.");
		}
		sock.onerror = function(e) {
			output("Error connecting.");
		}
		sock.onmessage = function(e) {
			if (e.data.startsWith('\x01')) {
				process(JSON.parse(e.data.substring(1)));
				return;
			}
			var lines = e.data.split('\n');
			console.log(lines);
			for (var i = 0; i < lines.length; i++) {
				output(lines[i]);
			}
		}
	}
	catch (e) {
		alert("Error connecting.");
	}
	$('#inputbox').keydown(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			var msg = $('#inputbox').val();
			sock.send(msg);
			$('#inputbox').val('');
		}
	});
});

function output(msg) {
	var e = document.createElement('p');
	e.innerText = msg;
	staydown.append(e);
}

function process(msg) {
}
