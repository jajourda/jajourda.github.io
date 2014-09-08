'use strict';

angular.module('jajourdagithubio')
  .controller('CvCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'key': 'photoEditing',
        'title': 'Photo Editing',
        'url': 'cv.editing',
        'description': 'Non-destructive Composite Editing',
        'logo': 'angular.png'
      },
      {
        'key': 'frontend',
        'title': 'Modern Front-End Web Development',
        'url': 'cv.frontend',
        'description': 'SPA Applications, Style Preprocessors, Javascript Task Runners',
        'logo': 'browsersync.png'
      },
      {
        'key': 'projects',
        'title': 'Project Coordinator',
        'url': 'cv.projects',
        'description': 'Delineating Project Goals, Tool/Resource Management, Creating and Meeting Staged Deadlines, ',
        'logo': 'bootstrap.png'
      },
      {
        'key':'illustrate',
        'title':'Illustration',
        'url':'cv.illustrate',
        'description':'Unique Illustrations with Fine Art Capabilities',
        'logo':''
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
