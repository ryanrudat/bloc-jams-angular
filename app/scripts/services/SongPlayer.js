(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
/**
* @desc the getAlbum stores album information
* @type {object}
*/
  var currentAlbum = Fixtures.getAlbum();



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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;

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
* @function getSongIndex
* @desc Getting index of a song
* @param {object} song
*/

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

/**
* @desc object holds the current song
* @type {object}
*/

    SongPlayer.currentSong = null;


/**
* @function SongPlayer.play
* @desc method of SongPlayer that checks if a current song is playing, if not, it'll call setSongand playSong function. Also calls if current song is paused.
* @param {object} song
*/

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {

        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            playSong(song);              //currentBuzzObject.play();
     }
   }
};

/**
* @function SongPlayer.pause
* @desc public method of SongPlayer pausing a song
* @param {object} song
*/

  SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
  };
/**
* @function SongPlayer.previous
* @desc Method to go to previous song
* @param {object}
*/

  SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if(currentSongIndex < 0) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }else{
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };

  return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
