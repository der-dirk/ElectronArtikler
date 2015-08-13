function appendMatchesToCandidates(expressions)
{
  for (var key1 in expressions)
  {
    if (expressions.hasOwnProperty(key1))
    {
      for (var key2 in expressions[key1].matches)
      {
        if (expressions[key1].matches.hasOwnProperty(key2))
        {
          expressions[key1].candidates.push(expressions[key1].matches[key2]);
        }
      }
    }
  } 
}

(function()
{  
  var app = angular.module('artikler', []);

  app.controller('ExpressionController', function($scope, $http)
  {  
    //var remoteFile = 'https://raw.githubusercontent.com/der-dirk/Artikler2/master/expressions.json';
    var localFile  = 'data/expressions.json'; 
    $http.get(localFile).success(function(data)
    {  
      $scope.expressions = data;
      appendMatchesToCandidates($scope.expressions); 
    });

    $scope.clickMe = function(buttonData)
    {  
      if (buttonData[0].indexOf(buttonData[1]) == -1)
        $scope.ok = false;
      else
        $scope.ok = true;
    };

    
  }); // app.controller('ExpressionController', function

})();

