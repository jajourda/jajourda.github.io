'use strict';
var con = angular.module('jajourda.controllers', []);

//main controller for application
con.controller('MainCtrl', ['$scope', '$routeSegment',
    function($scope, $routeSegment) {
        $scope.$routeSegment = $routeSegment;

        $scope.isASubroute = false;

        //route change
        $scope.$on('routeSegmentChange', function() {
            $scope.$routeSegment = $routeSegment;
            //console.log('route segment change');
            //console.log($scope.$routeSegment);

            var rs = $scope.$routeSegment;
            if (rs.startsWith('cv.')) {
                $scope.cvSubShowing = true;
            } else {
                $scope.cvSubShowing = false;
            }
        });
    }
]);

con.controller('CvCtrl', ['$scope', '$routeSegment', 'CvData',
    function($scope, $routeSegment, CvData) {
        $scope.$routeSegment = $routeSegment;
        //$scope.cvH1 = $scope.$routeSegment.


        $scope.awesomeThings = [{
            'key': 'photoEditing',
            'title': 'Photo Editing',
            'url': 'cv.editing',
            'linkText': 'photo editing',
            'description': 'Non-destructive Composite Editing',
            'logo': 'photoshop-icon.jpg',
            'icon': 'glyphicon glyphicon-picture',
            'rank': 4
        }, {
            'key': 'webdev',
            'title': 'Modern Web Development',
            'url': 'cv.webdev',
            'linkText': 'web dev',
            'description': 'SPA Applications, Style Preprocessors, Javascript Task Runners',
            'logo': 'sublime_text.png',
            'icon': 'glyphicon glyphicon-wrench',
            'rank': 1
        }, {
            'key': 'projects',
            'title': 'Project Coordinator',
            'url': 'cv.projects',
            'linkText': 'projects',
            'description': 'Delineating Project Goals, Tool/Resource Management, Creating and Meeting Staged Deadlines, ',
            'logo': 'bootstrap.png',
            'icon': 'glyphicon glyphicon-list-alt',
            'rank': 3
        }, {
            'key': 'illustrate',
            'title': 'Illustration',
            'url': 'cv.illustrate',
            'linkText': 'illustration',
            'description': 'Unique Illustrations with Fine Art Capabilities',
            'logo': '',
            'icon': 'glyphicon glyphicon-pencil',
            'rank': 5
        }, {
            'key': 'graphics',
            'title': 'Graphic Design',
            'url': 'cv.graphics',
            'linkText': 'graphic design',
            'description': 'Graphic Design, Manifold Mediums, Corporate Marketing Materials',
            'logo': '',
            'icon': 'glyphicon glyphicon-eye-open',
            'rank': 2
        }];
        // angular.forEach($scope.awesomeThings, function(awesomeThing) {
        //   awesomeThing.rank = Math.random();
        // });


        $scope.getCvData = function() {
            CvData.async().then(function(d) {
                //console.log('got it');
                //console.log(d.data.CvData);
                $scope.CvData = d.data.CvData;
                $scope.$broadcast('GOT_CV_DATA');
            });
        };

        $scope.getCvData();

        var cvMain = {
            bannerHeading: 'My Cv',
            subHeading: 'Modern Development, Trained Designer, Multimedia Projects'
        };

        $scope.routeSpecific = cvMain;

        //on current updated
        $scope.$on('UPDATED_CD_DATA', function(event, data) {
            //console.log('i am the parent:');
            //console.log(data.current);
            $scope.currentCv = data.current;
            $scope.routeSpecific = data.current.routeSpecific;
        });

        console.log($scope.cvSubShowing);
        $scope.$on('routeSegmentChange', function() {
            if (!$scope.cvSubShowing) {
                $scope.routeSpecific = cvMain;
            }
        });



    }
]);

con.controller('CvIndivCtrl', ['$scope', '$routeSegment',
    function($scope, $routeSegment) {
        $scope.$routeSegment = $routeSegment;
        $scope.CvData = $scope.$parent.CvData;
        //console.log('i am cvData:')
        //console.log($scope.CvData);
        $scope.$on('routeSegmentChange', function() {
            //console.log('i got the data');
            //console.log($scope.CvData);
            //console.log('i am route name:');
            //console.log($scope.$routeSegment.name);
            var name = $scope.$routeSegment.name;
            name = name.split('.')[1];
            //console.log(name);
            //for each statement
            for (var i = $scope.CvData.length - 1; i >= 0; i--) {
                //console.log($scope.CvData[i]);
                if (name === $scope.CvData[i].cvCat) {
                    $scope.currentCv = $scope.CvData[i];
                    //console.log('i am the scope.currentCv');
                    //console.log($scope.currentCv);
                }
            }
            $scope.$emit('UPDATED_CD_DATA', {
                current: $scope.currentCv
            });
        });
    }
]);

con.controller('CarouselDemoCtrl', ['$scope',
    function($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }
    }
]);


//webdev
con.controller('WebDevCtrl', ['$scope', 'WebDevData',
    function($scope, WebDevData) {
        var that = this;
        this.test = 'i am controller as linked controller';
        this.getWebDevData = function() {
            WebDevData.async().then(function(d) {
                //console.log('got it');
                //console.log(d.data.CvData);
                that.groups = d.data.WebDevData;
                $scope.$broadcast('GOT_WEB_DEV_DATA');
            });
        };
        
        this.getWebDevData();

        $scope.modalIsOpen = false;

        // $scope.$on('onRepeatLast',function(data){
        //     console.log('onlastrepeat data:');
        //     console.log(data);
        //     $scope.$broadcast('READY_FOR_HEIGHTS');
            
        // });

        // console.log('webdevctrl ready');
    }
]);
//modal controller for examples
con.controller('ExampleModalCtrl', ['$scope', '$modal',
    function($scope, $modal) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.modal = $modal;
        $scope.openModal = function(data) {
            console.log('i am dataarray');
            console.log(data);
            $scope.exampleData = data;
            $scope.$parent.$parent.modalIsOpen = true;

            var modalInstance = $modal.open({
                templateUrl: 'webExample.html',
                controller: 'ExampleModalInstanceCtrl',
                resolve: {
                    items: function() {
                        return $scope.items;
                    },
                    exampleData: function(){
                        return $scope.exampleData;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // console.log('Modal dismissed at: ' + new Date());
                $scope.$parent.$parent.modalIsOpen = false;
            });


        };


        //console.log('ExampleModalCtrl ready');

    }
]);
con.controller('ExampleModalInstanceCtrl', ['$scope', '$modalInstance', 'items','exampleData',
    function($scope, $modalInstance, items, exampleData) {

            
        $scope.exampleData = exampleData;
        $scope.items = items;
        $scope.slides = exampleData.slides;

        
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function() {
            console.log('i am slides:');
            console.log($scope.slides);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);

con.controller('AccordionDemoCtrl', ['$scope',
    function($scope) {
        $scope.oneAtATime = true;

        $scope.groups = [{
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        }, {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
]);

// var ModalDemoCtrl = function($scope, $modal, $log) {

//     $scope.items = ['item1', 'item2', 'item3'];

//     $scope.open = function(size) {

//         var modalInstance = $modal.open({
//             templateUrl: 'myModalContent.html',
//             controller: ModalInstanceCtrl,
//             size: size,
//             resolve: {
//                 items: function() {
//                     return $scope.items;
//                 }
//             }
//         });

//         modalInstance.result.then(function(selectedItem) {
//             $scope.selected = selectedItem;
//         }, function() {
//             $log.info('Modal dismissed at: ' + new Date());
//         });
//     };
// };

// // Please note that $modalInstance represents a modal window (instance) dependency.
// // It is not the same as the $modal service used above.

// var ModalInstanceCtrl = function($scope, $modalInstance, items) {

//     $scope.items = items;
//     $scope.selected = {
//         item: $scope.items[0]
//     };

//     $scope.ok = function() {
//         $modalInstance.close($scope.selected.item);
//     };

//     $scope.cancel = function() {
//         $modalInstance.dismiss('cancel');
//     };
// };



con.controller('ExampleCarouselCtrl', function($scope) {
    $scope.myInterval = 5000;
    // var slides = $scope.slides = [];
    // $scope.addSlide = function() {
    //   var newWidth = 600 + slides.length;
    //   slides.push({
    //     image: 'http://placekitten.com/' + newWidth + '/300',
    //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
    //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    //   });
    // };
    // for (var i=0; i<4; i++) {
    //   $scope.addSlide();
    // }

    //$scope.slides = [];

    $scope.$on('CAROUSEL_MODAL_OPENED', function(event, data) {
        console.log('i am data:');
        console.log(data);
    });
});