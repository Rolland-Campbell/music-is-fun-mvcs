import Song from "../Models/Song.js"

// @ts-ignore
let _sandBox = axios.create({
  baseURL: '//bcw-sandbox.herokuapp.com/api/Bud/songs'
})

let _state = {
  songs: [],
  playlist: []
}

let _listeners = {
  songs: [],
  playlist: []
}

function _setState(propName, data) {
  _state[propName] = data
  _listeners[propName].forEach(fn => fn());
}

class SongsService {

  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs()
  }

  addListener(propName, fn) {
    _listeners[propName].push(fn)
  }

  get Songs() {
    return _state.songs.map(s => new Song(s))
  }

  get Playlist() {
    return _state.playlist
  }

  getMusicByQuery(query) {
    let url = 'https://itunes.apple.com/search?callback=?&term=' + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData))
        _setState('songs', results)
        console.log(results);
      })
      .catch(err => console.log(err))
  }

  getMySongs() {
    _sandBox.get()
      .then(res => {
        let playlist = res.data.data.map(s => new Song(s))
        _setState('playlist', playlist)
      })
  }

  addSong(id) {
    let songToSave = this.Songs.find(s => s._id == id)
    if (!songToSave) return alert("We couldn't find that song. sorry.")
    _sandBox.post('', songToSave)
      .then(res => {
        let copyOfPlaylist = this.Playlist
        copyOfPlaylist.push(new Song(res.data.data))
        _setState('playlist', copyOfPlaylist)
      })
      .catch(err => console.error(err))
  }

  removeSong(id) {
    _sandBox.delete(id)
      .then(res => {
        let index = _state.playlists.findIndex(s => s._id == id)
        _state.playlist.splice(index, 1)
        _setState('playlist', _state.playlist)
      })
  }

}


const service = new SongsService();
export default service;
