'use strict';

const runBlock = function (onbeforeunload, $transitions, statePrevs, formlyConfig, $anchorScroll) {
  'ngInject';

  //Fullscreen event and hack mozilla
  function exitFullScreen () {
    angular.element(document.body).removeClass('fullscreen');
  }
  
  angular.element(window.document).on('keyup', function(e) {
    if (e.keyCode == 27) {
      exitFullScreen();
    }
  });
  
  document.addEventListener("mozfullscreenchange", function () {
    if (!document.mozFullScreen) {
      exitFullScreen();
    }
  }, false);

  if (onbeforeunload) {
    window.onbeforeunload = function() {
      return '¿Está seguro de abandonar la página?.';
    };
  }

  for (var name in statePrevs) {
    var prevs = statePrevs[name];
    statePrevs[name] = {};
    prevs.forEach( namePrev => {
      statePrevs[name][namePrev] = !0;
    })
  }

  $transitions.onStart({}, transition => {
    if (transition.from().name!='' && statePrevs[transition.to().name] && !statePrevs[transition.to().name][transition.from().name]) {
      // $log.log('abort')
      transition.abort();
    }
  });

  formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

  $anchorScroll.yOffset = 60;
};

export default runBlock;