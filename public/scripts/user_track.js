var app = angular.module('boots_cats', [])

app.factory('trackData', ['$http', function( $http ) {
	return {
		get : function() {
			var self = this;
			var id = Cookies.get("loggedinId");

			$http.get('/users/' + id + '/tracks').then(function( response ){
				console.log(self);
				self.tracks = response.data;
			});
		},


	  delete : function(id){
	    var self = this;
	    var userId = Cookies.get("loggedinId");
	    console.log(userId);
	    // var id = trackId.attributes['#track-id'].value;
	    console.log(id);

	    // "5670d9a23d16f5f60156c971
	    $http.delete('/users/' + userId + '/tracks/' + id).then(function success(response){
	    	self.get();
	    }, function error(){
	    	console.log('error');
	    });
	  }
	}
}]);

app.directive('tracks', function() {
	return {
		controllerAs: 'trackCtrl',
		controller: ['trackData', function trackCtrl(trackData) {
			this.trackData = trackData;

			var self = this;

			this.getTracks = function() {
				console.log("getting tracks");
				self.trackData.get();
			}

			this.loadTrack = function(item) {
				console.log("test");
				console.log(this.trackData.tracks.length);	

				var id = angular.element(item).data('_id');
				console.log(id);
				// for(var i=0; i<this.trackData.tracks.length; i++) {
				// 	if(Cookies.get("loggedinId") === this.trackData.tracks.user_id) {
				// 		var trackId = this.trackData.tracks[i];
				// 		console.log(trackId);
				// 	}
				// }
				 //  $.ajax({
					// 	url: '/users/' + userId + '/tracks/' + trackId,
					// 	method: 'GET',
					// 	dataType: 'json'
					// }.done();
			}

			this.deleteTrack = function(track) {
				self.trackData.delete(track._id);
			}

		}] // close controller
	} // close return object
}) // close angular module