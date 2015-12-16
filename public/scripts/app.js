console.log("working");

$( document ).ready(function() {

/////////////////////////
////// DRUM STUFF ///////
	nx.onload = function() {
		nx.colorize("fill", "lightgrey");
  	nx.colorize("accent", "#000000");
		drumkit.row = 4;
		drumkit.col = 16;
		drumkit.colors.accent = "#7BD389"
		drumkit.init();
		clickbpm.canvas.style.display = "inline-block"
  	clickbpm.min = 0
  	clickbpm.max = 300
  	clickbpm.set({
      value: 120
		});

		$( document ).on('keydown', function(event) {
			if (event.keyCode === 32) {
				event.preventDefault();
				drumkit.jumpToCol(-1);
				drumkit.sequence(bpm);
			};
		});

		$('#stop').on('click', function(){
			drumkit.stop();
		})

		$('#resume').on('click', function(){
			drumkit.sequence(bpm);
		})

		$('#start').on('click', function(){
			drumkit.jumpToCol(-1);
			drumkit.sequence(bpm);
		})

		$('#clear').on('click', function(){
			if(confirm("This process is irreversible, are you sure?")) {
				location.reload();
			}
		})

		$('#save').on('click', function(){
			$('#saveModal').show()

			$("#close-save").click(function(){
				$("#saveModal").hide();
			});

			$("#close-save2").click(function(){
				$("#saveModal").hide();
			});			

			$('#save-submit').on('click', function(){
				$('#saveModal').hide()
				var titleInput = $("input[id='track-title']").val()
				var id = Cookies.get("loggedinId");
				var bpmInput = bpm / 4

				var drumData = {
					currentUser: id,
					title: titleInput,
					drums: drumkit.matrix,
					bpm: bpmInput
				}

				$.ajax({
					url: "/users/" + id + "/tracks",
					type: "POST",
					dataType: 'json',
					data: drumData
				}).done( function(){
					console.log(drumData);
				});
			})
		})




		var bpm = 480
		var bpmDisplay = bpm / 4

		var synth = new Tone.Sampler({
		  "kick" : "./audio/kick.wav",
		  "snare" : "./audio/snare.wav",
		  "hat" : "./audio/hat.wav",
		  "perc" : "./audio/perc.wav"
		}).toMaster();

		clickbpm.on('*', function(data){
		  bpm = (data.value * 4)
		  drumkit.sequence(bpm);
		})

		drumkit.on('*', function(data){
			for (i in data.list){
				//kick
				if (data.list.join() === "1,0,0,0"){
					synth.triggerAttack("kick");
					break;
				};
				if (data.list.join() === "1,0,1,0"){
					synth.triggerAttack("kick");
					synth.triggerAttack("snare");
					break;
				};
				if (data.list.join() === "1,0,0,1"){
					synth.triggerAttack("kick");
					synth.triggerAttack("perc");
					break;
				};
				if (data.list.join() === "1,1,0,0"){
					synth.triggerAttack("kick");
					synth.triggerAttack("hat");
					break;
				};
				if (data.list.join() === "1,0,1,1"){
					synth.triggerAttack("kick");
					synth.triggerAttack("snare");
					synth.triggerAttack("perc");
				};
				if (data.list.join() === "1,1,0,1"){
					synth.triggerAttack("kick");
					synth.triggerAttack("hat");
					synth.triggerAttack("perc");
					break;
				};
				if (data.list.join() === "1,1,1,0"){
					synth.triggerAttack("kick");
					synth.triggerAttack("hat");
					synth.triggerAttack("snare");
					break;
				};
				if (data.list.join() === "1,1,1,1"){
					synth.triggerAttack("kick");
					synth.triggerAttack("hat");
					synth.triggerAttack("snare");
					synth.triggerAttack("perc");
					break;
				};

				//hat
				if (data.list.join() === "0,1,0,0"){
					synth.triggerAttack("hat");
					break;
				};
				if (data.list.join() === "0,1,0,1"){
					synth.triggerAttack("hat");
					synth.triggerAttack("perc");
					break;
				};
				if (data.list.join() === "0,1,1,0"){
					synth.triggerAttack("hat");
					synth.triggerAttack("snare");
					break;
				};
				if (data.list.join() === "0,1,1,1"){
					synth.triggerAttack("hat");
					synth.triggerAttack("snare");
					synth.triggerAttack("perc");
					break;
				};

				//snare
				if (data.list.join() === "0,0,1,0"){
					synth.triggerAttack("snare");
					break;
				};
				if (data.list.join() === "0,0,1,1"){
					synth.triggerAttack("snare");
					synth.triggerAttack("perc");
					break;
				};

				//perc
				if (data.list.join() === "0,0,0,1"){
					synth.triggerAttack("perc");
					break;
				};
			};
		});
	};
});

