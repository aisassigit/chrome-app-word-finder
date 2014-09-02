'use strict';

window.wordFinderApp = angular.module('wordFinderApp', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appDirectives',
    'ui.bootstrap'
]);

window.appControllers  = angular.module('appControllers', []);
window.appServices     = angular.module('appServices',[]);
window.appDirectives   = angular.module('appDirectives', []);

wordFinderApp.config(function($routeProvider) {
    $routeProvider.
        when('/sidebar/main/tabUrl/:tabUrl/canonicalUrl/:canonicalUrl', {
            templateUrl: 'views/main.html',
            controller: 'MainController',
            params: {
                tabUrl: function ($route) {
                    return $route.current.params.tabUrl;
                },
                canonicalUrl: function ($route) {
                    return $route.current.params.canonicalUrl;
                }
            }
        }).
        when('/sidebar/main/sel/:sel', {
            templateUrl: 'views/selection.html',
            controller: 'SelectionController',
            params: {
                sel: function ($route) {
                    return $route.current.params.sel;
                }
            }
        }).
        when('/sidebar/error', {
            templateUrl: 'views/error.html' // This is temp and should be removed at some point. Used by Eric.
        }).
        otherwise({
            redirectTo: '/',
            templateUrl: 'views/main.html',
            params: {
                tabUrl: function ($route) {
                    return $route.current.params.tabUrl;
                }
            }
        });

});


