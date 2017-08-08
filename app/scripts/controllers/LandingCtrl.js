(function() {
  function LandingCtrl() {
    this.heroTitle = "Turn the Music Up!";
    this.albumData = "albumPicasso";
  }

  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);

})();
