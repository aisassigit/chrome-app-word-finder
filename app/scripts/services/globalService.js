'use strict';

appServices.service('GlobalService',['$q', function($q) {

  /**
   * Public API
   */
  var GlobalService = {

    tabUrl:'',
    canonicalUrl:'',

    hasCanonicalUrl: function(){
      var hasCanonical = true;
      if(this.canonicalUrl === 'undefined'){
        hasCanonical = false;
      }
      return hasCanonical;
    }

  };

  return GlobalService;

}]);
