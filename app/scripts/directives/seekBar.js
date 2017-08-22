(function() {
  function seekBar($document) {
/**
* @function calculatePercentd
* @desc calulating the seek bar's value
* @param {object} seekBar, {object} event
*/
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;

    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
          // directive logic to return

          scope.value = 0;
          scope.max = 100;

    var seekBar = $(element);

/**
* @desc $observe's the value changes of both the length of currently playing song and current playback time of song
* @param {method}
*/
    attributes.$observe('value', function(newValue){
      scope.value = newValue;
    });

    attributes.$observe('max', function(newValue){
      scope.max = newValue;
    });

/**
* @function percentString
* @desc Determines the podition of the thumb and width of the seek bar
* @param {object}
*/
          var percentString = function() {
            var value = scope.value;
            var max = scope.max;
            var percent = value / max * 100;
            return percent + "%";
          };
/**
* @desc returns width of the seek bar fill element based on the calculated percent
* @param {object}
*/
          scope.fillStyle = function() {
            return {width: percentString()};
          };

/**
* @desc returns the the width of the user's positioning of the thumb
* @param {object}
*/
          scope.thumbStyle = function() {
            return {left: percentString()};
          };

          /**
* @function onClickSeekBar
* @desc Updates seek bar value based on the seek bar's width and location of the user's click on the seek bar
* @param {object} event
*/

    scope.onClickSeekBar = function(event) {
      var percent = calculatePercent(seekBar, event);
      scope.value = percent * scope.max;
      notifyOnChange(scope.value);

    };

/**
* @function scope.trackThumb
* @desc applys the change in value as the user drags the seek bar thumb
* @param {object}
*/

    scope.trackThumb = function() {
      $document.bind('mousemove.thumb', function(event) {
        var percent = calculatePercent(seekBar, event);
        scope.$apply(function() {
            scope.value = percent * scope.max;
            notifyOnChange(scope.value);
      });

    });
/**
* @function notifyOnChange(newValue)
* @desc notifies the
* @param {object}
*/


      $document.bind('mouseup.thumb', function() {
          $document.unbind('mousemove.thumb');
          $document.unbind('mouseup.thumb');
        });
      };

      var notifyOnChange = function(newValue) {
        if(typeof scope.onChange === 'function') {
          scope.onChange({value: newValue});
        }
      };

    }
  };
}

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);

})();
