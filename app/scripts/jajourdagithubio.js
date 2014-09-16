'use strict';

angular.module('jajourdagithubio', [
  'ngAnimate', 
  'ngCookies', 
  'ngTouch', 
  'ngSanitize', 
  'ngRoute',
  'route-segment',
  'view-segment',
  'ui.bootstrap',
  'jajourda.services',
  'jajourda.controllers',
  'jajourda.directives'])
  .config(function ($routeSegmentProvider, $routeProvider) {
    var rsp = $routeSegmentProvider;
    //cv
    rsp.when('/cv', 'cv')
      .when('/cv/webdev','cv.webdev')
      .when('/cv/illustrate','cv.illustrate')
      .when('/cv/projects', 'cv.projects')
      .when('/cv/editing', 'cv.editing')
      .when('/cv/graphics', 'cv.graphics');
      
    rsp.segment('cv',{
      templateUrl: 'partials/main.html',
      controller: 'CvCtrl',
      cvH1: 'My CV'
    })
      .within()
      .segment('webdev', {
        templateUrl:'partials/views/cv/webdev.html',
        subRoute: true,
        dependencies: ['id'],
        controller: 'CvIndivCtrl'
      })
      .segment('illustrate',{
        templateUrl:'partials/views/cv/illustrate.html',
        controller: 'CvIndivCtrl'
      })
      .segment('projects',{
        templateUrl:'partials/views/cv/projects.html',
        controller: 'CvIndivCtrl'
      })
      .segment('editing',{
        templateUrl:'partials/views/cv/editing.html',
        controller: 'CvIndivCtrl'
      })
      .segment('graphics', {
        templateUrl:'partials/views/cv/graphics.html',
        controller: 'CvIndivCtrl'
      });

    //experience
    rsp.when('/experience', 'experience');
    rsp.segment('experience',{
      templateUrl:'partials/views/experience.html'
    });

    //about
    rsp.when('/about', 'about');
    rsp.segment('about',{
      templateUrl:'partials/views/about.html'
    });

    //contact
    rsp.when('/contact', 'contact');
    rsp.segment('contact',{
      templateUrl:'partials/views/contact.html'
    });

    //this site development page
    rsp.when('/devcv','devcv');
    rsp.segment('devcv',{
      templateUrl:'partials/views/devcv.html'
    });
    $routeProvider.otherwise({
      redirectTo: '/cv'
    });
  })
;
