(function() {
  function SongPlayer() {
    var SongPlayer = {};


/**
* @desc object holds the current song
* @type {object}
*/

  var currentSong = null;


/**
* @desc Buzz object audio file
* @type {Object}
*/

  var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;

};

/**
* @function playSong
* @desc plays song from buzz library
* @param {object} song
*/

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

/**
* @function SongPlayer.play
* @desc method of SongPlayer that checks if a current song is playing, if not, it'll call setSongand playSong function. Also calls if current song is paused.
* @param {object} song
*/

    SongPlayer.play = function(song) {
      if(currentSong !== song) {

        setSong(song);
        playSong(song):

 } else if (currentSong === song) {
     if (currentBuzzObject.isPaused()) {
         currentBuzzObject.play();
     }
   }
};

/**
* @function SongPlayer. pause
* @desc public method of SongPlayer pausing a song
* @param {object} song
*/

  SongPlayer.pause = function(song) {
    currentBuzzObject.pause();
    song.playing = false;
  };

  return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();
