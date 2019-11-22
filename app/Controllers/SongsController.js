import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
function _draw() {
  let elem = document.getElementById("songs");
  let songs = store.State.Songs;
  let template = "<ul>";
  songs.forEach(s => {
    template += s.Template;
  });
  elem.innerHTML = template + "</ul>";
}

function _drawPlaylist() {
  let elem = document.getElementById("playlist");
  let songs = store.State.Playlist;
  let template = "<ul>";
  songs.forEach(s => {
    template += s.playlistTemplate;
  });
  elem.innerHTML = template + "</ul>";
}

//Public
export default class SongsController {
  constructor() {
    store.subscribe("songs", _draw);
    store.subscribe("playlist", _drawPlaylist);
    SongService.getMySongs();
  }

  search(e) {
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  addSong(id) {
    try {
      SongService.addSong(id);
    } catch (error) {
      console.error(error);
    }
  }

  removeSong(id) {
    try {
      SongService.removeSong(id);
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }
}
