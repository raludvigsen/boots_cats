$( document ).ready(function() {

	var checkCookies = function() {

		if (Cookies.get('loggedinId') != null) {
			$('#signup-form').hide();
			$('#login-form').hide();
			$('#login-show').hide();
			$('#signup-show').hide();
			$('#logout-show').show();
			
		} else {
			$("#signup-form").hide();
			$("#login-form").hide();
			$("#logout-show").hide();
		};
	}

	checkCookies();

//==========================================================================
//======================start sign up process================================
//==========================================================================
	$("#signup-show").click(function() {
		$('#signup-form').show();
		$('#signup-show').hide();
		$('#login-show').hide();

		$('#signup-button').click(function() {
			console.log("testing signup button");

			signupSubmit();
		});

	});


//==========================================================================
//=======================start sign in process==============================
//==========================================================================
	
	$("#login-show").click(function() {
		$('#login-form').show();
		$('#login-show').hide();
		$('#signup-show').hide();

		$('#login-button').click(function() {
			console.log("testing signup button");

			signinSubmit();
		});
	});

//==========================================================================
//=======================logout=============================================
//==========================================================================

	$('#logout-show').click(function(){
		console.log("test");
		Cookies.remove('loggedinId');
		location.reload();
	});



	var signupSubmit = function() {

		var emailInput = $("input[id='email']").val()

	  var passwordInput = $("input[id='password']").val()

	  var user = {
	    email: emailInput,
	    password: passwordInput,
	  };
	  event.preventDefault();

	  $.ajax({
			url: '/users',
			method: 'POST',
			dataType: 'json',
			data: user
		}).done(loggedIn);
	}; //signupSubmit close

	var signinSubmit = function() {
		var emailInput = $('#email').val();
		var passwordInput = $('#password').val();

		var userLogin = {
			email: emailInput,
			password: passwordInput
		};
		event.preventDefault();

		$.ajax({
			url: '/login',
			type: 'POST',
			dataType: 'json',
			data: userLogin
		}).done( loggedIn ).fail(function(){
			alert('wrong password or email!');
		}); //ajax close
	}; // signinSubmit close

	var loggedIn = function() {
		$('#signup-form').hide();
		$('#login-form').hide();
		$('#login-show').hide();
		$('#signup-show').hide();
		$('#logout-show').show();
	};

}); //document.ready close