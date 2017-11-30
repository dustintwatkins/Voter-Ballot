
angular.module('voting',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function() {
			return $http.get('/voting').success(function(data){
				angular.copy(data, $scope.candidates);
			});
    };
    $scope.getAll();
    $scope.create = function(candidate) {
			console.log("creating object");			
			return $http.post('/candidates', candidate).success(function(data){
				console.log("data");
				$scope.candidates.push(data);
			});
    };
    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.candidates, function(value,key) {
        if(value.selected) {
          	console.log("selected");
		$scope.upvote(value);
        	$scope.ballot.push(value);
        }
      });
    }

    $scope.upvote = function(candidate) {
	console.log("in app.js upvote");
	console.log(candidate._id);
      return $http.put('/voting/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.votes += 1;
        });
    };

    $scope.addCandidate = function() {
     	console.log("entered add Candidate");
	var newObj = {Name:$scope.formContent,votes:0};
      $scope.create(newObj);
      $scope.formContent = '';
    }

    $scope.incrementUpvotes = function(candidate) {
	console.log("in increment upvotes");
      $scope.upvote(candidate);
    };
 
    $scope.delete = function(candidate) {
      console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
      $http.delete('/voting/'+candidate._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
