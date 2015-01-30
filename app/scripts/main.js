/* jshint devel:true */
$(document).ready(function(){

	var lastId = 0;

	//getMessages();

	setInterval(getMessages, 1000);

	var userName = prompt('Please enter your username.');

	setUserName(userName);

	function setUserName(name) {
		$('#userName').html('@'+name);
	}

	function getMessages() {
		$.get(
			'https://stark-hamlet-3153.herokuapp.com/chats.json',
			function(chat) {
				render(chat);
				var elem = document.getElementById('message-board');
 				 elem.scrollTop = elem.scrollHeight;
			},
			'json'
			);
	}

	function postMessages() {
		$.post(
			'https://stark-hamlet-3153.herokuapp.com/chats',
			{	chat: {
					username: userName,
					message: $('#message-box').val(),
					roomname: 'one'
				}
			},
			'json'
		);
	}

	var render = function(chat) {
		var messageRow = _.template('<div class="row"><span class="nameDisplay">@<%= username %>: &nbsp </span> <span><%= message %></span> &nbsp <span id="tStamp"> <%= time_stamp %> </span> </div>');
		
		for(var i=0; i<chat.length; i++) {
			if(chat[i].id > lastId) {
				$('#message-board').append(messageRow(chat[i]));
				$('#message-board').emoticonize();
				lastId = chat[i].id;
			}
		}
	};

	$('#send-button').click(function() {
		postMessages();
		$('#message-box').val('');
	});

	// $(window).keyup(function(e) {
	// 	if(e.which === 13) {
	// 		postMessages();
	// 		$('#message-box').val('');
	// 	}
	// });

	$('#userName').click(function() {
		userName = prompt('Please enter your username.');
		setUserName(userName);
	});

	function playSound(soundfile) {
		document.getElementById("dummy").innerHTML=
		"<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
	}
	
});