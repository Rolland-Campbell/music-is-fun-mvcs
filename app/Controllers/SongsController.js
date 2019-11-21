import SongsService from "../Services/SongsService.js";
import store from "../store";
import service from "../Services/SongsService.js";

let _ss = service;

//Private
function _draw() {
  let values = store.State.values;
  console.log(values);
}

function _drawPlaylist() {
  let elem = document.getElementById('playlist')
  let songs = _ss.Playlist
  let template = '<ul>'
  songs.forEach(s => {
    template += s.playlistTemplate
  })
  elem.innerHTML = template + '</ul>'
}

//Public
export default class SongsController {
  constructor() {
    store.subscribe("songs", _draw);
    _ss.addListener("songs", _draw)
    _ss.addListener("playlist", _drawPlaylist)
    _ss.getMusicByQuery('')

    search(e) {
      e.preventDefault();
      _ss.getMusicByQuery(e.target.query.value)
    }

    addSong(id) {
      _ss.addSong(id)
    }
  }


}
