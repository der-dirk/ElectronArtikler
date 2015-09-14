require("angular");
require("angular-sanitize");
require("angular-filters");

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
  var app = angular.module('artikler', ['ngSanitize']);
  
  var expressionLength = 0;
  var expressionIndex = 0;

  app.controller('ExpressionController', function($scope, $http)
  {  
    //var remoteFile = 'https://raw.githubusercontent.com/der-dirk/Artikler2/master/expressions.json';
    var articlelFile  = 'data/article.json';
    
    $http.get(articlelFile).success(function(data)
    {  
      $scope.expressionEntries = data;
      appendMatchesToCandidates($scope.expressionEntries);
      expressionLength = $scope.expressionEntries.length;
      if (expressionLength > 0)
      {
        $scope.expressionEntry = $scope.expressionEntries[0];
        shuffleArray($scope.expressionEntry.candidates);
      }
    });

    $scope.clickWord = function(buttonData)
    {  
      // Last expression
      $scope.hasResult = true;
      
      $scope.matches          = buttonData[0]; 
      $scope.pickedCandidate  = buttonData[1];
      $scope.correctCandidate = $scope.matches[0];
      
      $scope.lastExpression = $scope.expressionEntry.expression;
      $scope.ok = $scope.matches.indexOf($scope.pickedCandidate) != -1;
      
      // Next expression
      expressionIndex = ++expressionIndex % expressionLength;          
      $scope.expressionEntry = $scope.expressionEntries[expressionIndex];
    };
    
    $scope.wrapInClass = function wrapInClass(css, text)
    {
      return '<span class="' + css + '">' + text + '</span>';
    };
    
  }); // app.controller('ExpressionController', function

  app.filter('replace', function()
  {
    return function(expression, tag, replacement)
    {
      var replacedExpression;
      replacedExpression = expression.replace(tag, replacement);
      return replacedExpression;
    };  
  }); // app.filter('replace', function
})();
