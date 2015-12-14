console.log("working");

$( document ).ready(function() {

	nx.onload = function() {
		nx.colorize("fill", "lightgrey");
  	nx.colorize("accent", "#000000");
		drumkit.row = 5;
		drumkit.col = 16;
		drumkit.colors.accent = "#7BD389"
		drumkit.init();
		clickbpm.canvas.style.display = "inline-block"
  	clickbpm.min = 0
  	clickbpm.max = 300
  	clickbpm.set({
      value: 120
		})

		var bpm = 480
		var bpmDisplay = bpm / 4
	}




	var synth = new Tone.Sampler({
  	"kick" : "./audio/kick.mp3",
  	"snare" : "./audio/snare.mp3",
  	"open-hat" : "./audio/open_hat.mp3",
  	"closed-hat" : "./audio/closed_hat.mp3",
  	"perc" : "./audio/kit/perc.mp3"
  }).toMaster();

})
