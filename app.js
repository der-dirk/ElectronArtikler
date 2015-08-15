require("angular");

function appendMatchesToCandidates(/*array by ref*/ expressionEntries)
{
  for (var key1 in expressionEntries)
    for (var key2 in expressionEntries[key1].matches)
      expressionEntries[key1].candidates.push(expressionEntries[key1].matches[key2]); 
}

function shuffleArray(/*array by ref*/ a)
{
  for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
}



(function()
{  
  var app = angular.module('artikler', []);
  
  var expressionLength = 0;
  var expressionIndex = 0;

  app.controller('ExpressionController', function($scope, $http)
  {  
    //var remoteFile = 'https://raw.githubusercontent.com/der-dirk/Artikler2/master/expressions.json';
    var localFile  = 'data/expressions.json'; 
    $http.get(localFile).success(function(data)
    {  
      $scope.expressionEntries = data;
      appendMatchesToCandidates($scope.expressionEntries);
      expressionLength = $scope.expressionEntries.length;
      if (expressionLength > 0)
      {
        $scope.expressionEntry = $scope.expressionEntries[0];
        shuffleArray($scope.expressionEntry.candidates);
        $scope.gapExpression = $scope.expressionEntry.expression.replace("%", "___");
      }
    });

    $scope.clickWord = function(buttonData)
    {  
      // Last expression
      $scope.hasResult = true;
      $scope.ok = buttonData[0].indexOf(buttonData[1]) != -1;
      $scope.correctExpression = $scope.expressionEntry.expression.split("%");
      $scope.correctExpressionGap = buttonData[1];
      
      // Next expression
      expressionIndex = ++expressionIndex % expressionLength;          
      $scope.expressionEntry = $scope.expressionEntries[expressionIndex];
      shuffleArray($scope.expressionEntry.candidates);
      $scope.gapExpression = $scope.expressionEntry.expression.replace("%", "___");
    };
    
  }); // app.controller('ExpressionController', function

})();
