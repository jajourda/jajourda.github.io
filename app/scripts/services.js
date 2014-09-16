'use strict';
var ser = angular.module('jajourda.services', []);
ser.service('LayoutService', ['$rootScope', '$window',
    function($rootScope, $window) {
        var thisService = this;
        //declare window element
        this.win = angular.element($window);
        //store windowWidth in variable
        $rootScope.windowWidth = $window.innerWidth;
        $rootScope.windowHeight = $window.innerHeight;

        //console.log($rootScope.windowHeight);

        //set up layout sizes
        this.winW = $rootScope.windowWidth;
        this.winH = $rootScope.windowHeight;
        $rootScope.layout = {};

        var lay = $rootScope.layout;
        //console.log('i am rootscope.layout.currentSize');
        $rootScope.vertLayout = {};
        this.setLayoutHorizontally = function(winW) {
            //var width = $window.innerWidth;
            /*widths*/
            if (winW < 480) {
                lay.currentSize = 'xs';
            }
            if (winW >= 480 && winW < 750) {
                lay.currentSize = 'sf';
            }
            if (winW >= 750 && winW < 960) {
                lay.currentSize = 'tablet';
            }
            if (winW >= 960 && winW < 1200) {
                lay.currentSize = 'big';
            }
            if (winW >= 1200) {
                lay.currentSize = 'xb';
            }
            //instantiate the layout object property "isState"
            lay.isState = {};
            lay.isState.onlySmall = lay.currentSize !== 'tablet' && lay.currentSize !== 'big' && lay.currentSize !== 'xb';
            lay.isState.notSmall = lay.isState.onlySmall === false;
            lay.isState.small = lay.currentSize === 'sf' || lay.currentSize === 'xs';
            lay.isState.medium = lay.currentSize === 'medium';
            lay.isState.big = lay.currentSize === 'big' || lay.currentSize === 'xb';
            //specific/fine-grained layouts
            lay.isState.xs = lay.currentSize === 'xs';
            lay.isState.sF = lay.currentSize === 'sf';

        };
        this.setLayoutVertically = function(winH) {
            /*heights*/
            $rootScope.vertLayout = 'bigger';
            if (winH < 750) {
                $rootScope.vertLayout = 'laptop';
            }
            $rootScope.laptopHeight = $rootScope.vertLayout === 'laptop';

        };
        this.setLayoutHorizontally(this.winW);
        this.setLayoutVertically(this.winH);
        /*   $window.onresize = function(){
		        setLayout();
		    };*/

        this.win.bind('resize', function() {
            /* Act on the event */
            $rootScope.windowWidth = $window.innerWidth;
            $rootScope.windowHeight = $window.innerHeight;
            thisService.setLayoutHorizontally($rootScope.windowWidth);
            thisService.setLayoutVertically($rootScope.windowHeight);
            $rootScope.$apply('windowWidth', 'windowHeight');
        });



        if ($rootScope.notSmall) {
            //console.log('it is not small');
        } else {
            //console.log('it is small dude, like really little');
        }

        //console.log(lay);



    }
]);
ser.factory('CvData', function($http) {
    var promise;
    var CvData = {
        async: function() {
            if (!promise) {
                promise = $http({
                    method: 'GET',
                    url: 'src/CvData.json',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return CvData;
});

ser.factory('WebDevData', function($http) {
    var promise;
    var WebDevData = {
        async: function() {
            if (!promise) {
                promise = $http({
                    method: 'GET',
                    url: 'src/WebDevData.json',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return WebDevData;
});

ser.factory('Technologies', function($http) {
    var promise;
    var Technologies = {
        async: function() {
            if (!promise) {
                promise = $http({
                    method: 'GET',
                    url: 'src/Technologies.json',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return Technologies;
});