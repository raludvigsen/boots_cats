$( document ).ready(function() {

	var checkCookies = function() {
		if (Cookies.get('loggedinId') != null) {
			$('#login-show').hide();
			$('#signup-show').hide();
			$('#logout-show').show();
			$('#save').show();
			
		} else {
			$("#save").hide();
			$("#my-tracks").hide();
			$("#logout-show").hide();
		};
	}

	checkCookies();

//==========================================================================
//======================start sign up process================================
//==========================================================================
	$("#signup-show").click(function() {
		console.log("test");
		$('#signupModal').show();

		$("#close-signup").click(function() {
			$("#signupModal").hide();
		});

		$("#close-signup2").click(function() {
			$("#signupModal").hide();
		});

		$('#signup-button').click(function() {
			console.log("testing signup button");
			$("#signupModal").hide();
			signupSubmit();
		});

	});


//==========================================================================
//=======================start sign in process==============================
//==========================================================================
	
	$("#login-show").click(function() {
		// $('#login-form').show();
		// $('#login-show').hide();
		// $('#signup-show').hide();
		$('#loginModal').show();

		$("#close-login").click(function() {
			$("#loginModal").hide();
		});

		$("#close-login2").click(function() {
			$("#loginModal").hide();
		});

		$('#login-button').click(function() {
			console.log("testing signup button");
			$("#loginModal").hide();
			loginSubmit();
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

	$('#instructions').click(function(){
		$('#instructionModal').show();

		$("#close-inst").click(function(){
			$("#instructionModal").hide();
		});

		$("#close-inst2").click(function(){
			$("#instructionModal").hide();
		});
	});

	// $('#view').click(function(){
	// 	$('#view').popover('show'); 

	// 	// $("close-view").click(function(){
	// 	// 	$('#viewModal').hide();
	// 	// })
	// })

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

	var loginSubmit = function() {
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
		$('#login-show').hide();
		$('#signup-show').hide();
		$('#my-tracks').show();
		$('#logout-show').show();
		$('#save').show();
	};

}); //document.ready close