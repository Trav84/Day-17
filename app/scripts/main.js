/* jshint devel:true */
$(document).ready(function(){

	var lastId = 0;
	var nameIcons = ['url(../images/icon1.png)', 'url(../images/icon2.png)', 'url(../images/icon3.png)', 'url(../images/icon4.png)', 'url(../images/icon5.png)', 'url(../images/icon6.jpeg)', 'url(../images/icon7.png)'];
	var unicornFacts = [
		"Genghis Khan reportedly decided not to conquer India after meeting a unicorn, which bowed down to him; he viewed it as a sign from his dead father and turned his army back.",
		"Unicorns cannot grow wings",
		"You cannot be granted immortality from devouring a unicorn.",
		"Unicorns can purify water better than any filtering system in the United States.",
		"Dragons will not eat unicorns, but the two, when introduced to each other, were never comfortable around each other.",
		"The King James version of the Old Testament contains nine references to unicorns, thanks to a mistranslation of the Hebrew word re’em. The original word was likely the Assyrian rimu (auroch), an extinct species of wild ox.",
		"Unicorns prefer sour skittles over original skittles!"
		];

	getMessages();

	var userName = prompt('Please enter your username.');

	setUserName(userName);

	function setUserName(name) {
		var randomNum = Math.floor(Math.random() * nameIcons.length);

		if(_.isEmpty(name)) {
			userName = prompt('Please enter a valid username.');
			setUserName(userName);
		} else {
			$('.unicornIcon').css('background-image', nameIcons[randomNum]);
			$('#userName').html(name);
		}
	}

	function generateFacts() {
		var randomPos = Math.floor(Math.random() * unicornFacts.length);

		return unicornFacts[randomPos];
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
				}
			},
			'json'
		);
	}

	var render = function(chat) {
		var messageRow = _.template('<div class="row"><span class="nameDisplay">@<%= username %>: &nbsp </span> <span class ="message"><%= message %></span> &nbsp <span class="tStamp"> <%= time_stamp %> </span> </div>');

		for(var i=0; i<chat.length; i++) {
			if(chat[i].id > lastId) {
				$('#message-board').append(messageRow(chat[i]));
				$('#message-board').emoticonize();
				lastId = chat[i].id;
				play('images/Bloop.wav');
			}
		}
	};

	function play(file) {
	    var embed = document.createElement("embed");
	 
	    embed.setAttribute('src', file);
	    embed.setAttribute('hidden', true);
	    embed.setAttribute('autostart', true);
	 
	    document.body.appendChild(embed);
	}	


	$('#send-button').click(function() {
		if($('#message-box').val() === 'help' || $('#message-box').val() === 'Help') {
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage"> Welcome to Unicorn Chat. If you need to change your username, simply click on the username button </span> </div>');
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage"> Type "Unicorn" for a special surprise! </span> </div>');
			$('#message-box').val('');
		} else if($('#message-box').val() === 'Unicorn' || $('#message-box').val() === 'unicorn') {
			$('#message-board').css('background-image','url(../images/unicorn3.jpg)');
			$('#message-board').css('background-size','cover');
			$('#message-box').val('');
		} else if($('#message-box').val() === '!Unifacts' || $('#message-box').val() === '!unifacts') {
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage">'+generateFacts()+' </span> </div>');
			play('images/magic.wav')
			$('#message-box').val('');
		} else {
			postMessages();
			$('#message-box').val('');
		}
	});

	$('#message-box').keyup(function(e) {
		if(e.which === 13) {
			if($('#message-box').val() === 'help' || $('#message-box').val() === 'Help') {
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage"> Welcome to Unicorn Chat. If you need to change your username, simply click on the username button </span> </div>');
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage"> Type "Unicorn" for a special surprise! </span> </div>');
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage"> Type "!Unifacts" for unicorn facts! </span> </div>');
			$('#message-box').val('');
		} else if($('#message-box').val() === 'Unicorn' || $('#message-box').val() === 'unicorn') {
			$('#message-board').css('background-image','url(../images/unicorn3.jpg)');
			$('#message-board').css('background-size','cover');
			$('#message-box').val('');
		} else if($('#message-box').val() === '!Unifacts' || $('#message-box').val() === '!unifacts') {
			$('#message-board').append('<div class="row"> <span class="botName"> @UnicornBot </span> <span class="botMessage">'+generateFacts()+' </span> </div>');
			play('images/magic.wav')
			$('#message-box').val('');
		} else {
			postMessages();
			$('#message-box').val('');
		}
		}
	});

	$('#userName').click(function() {
		userName = prompt('Please enter your username.');
		setUserName(userName);
	});

	setInterval(getMessages, 1000);
	
});