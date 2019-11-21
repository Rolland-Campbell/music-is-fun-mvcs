import service from "../Services/SongsService.js";

let _ss = service;

//Private
function _draw() {
  let elem = document.getElementById('songs')
  let songs = _ss.Songs
  let template = '<ul>'
  songs.forEach(s => {
    template += s.Template
  })
  elem.innerHTML = template + '</ul>'
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
    //_ss.subscribe("songs", _draw);
    _ss.addListener("songs", _draw)
    _ss.addListener("playlist", _drawPlaylist)
    _ss.getMusicByQuery('')
  }

  search(e) {
    e.preventDefault();
    _ss.getMusicByQuery(e.target.query.value)
  }

  addSong(id) {
    _ss.addSong(id)
  }

}
