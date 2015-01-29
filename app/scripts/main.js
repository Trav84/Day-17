/* jshint devel:true */
$(document).ready(function(){
	getMessages();

	//setInterval(getMessages, 1000);

	var userName = prompt('Please enter your name.');

	setUserName(userName);

	function setUserName(name) {
		$('#userName').html('@'+name);
	}

	function getMessages() {
		$.get(
			'https://stark-hamlet-3153.herokuapp.com/chats.json',
			function(chat) {
				render(chat);
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
		var messageRow = _.template('<div class="row"><span>@<%= username %>:  </span> <span><%= message %></span> <span class="tStamp"> <%= time_stamp%> </span> </div>');
		for(var i=0; i<chat.length; i++) {
			$('#message-board').append(messageRow(chat[i]));
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
		userName = prompt('Please enter your name.');
		setUserName(userName);
	});
	
});