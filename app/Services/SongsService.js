import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Bud/songs"
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
  }

  getMusicByQuery(query) {
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getMySongs() {
    _sandBox
      .get()
      .then(res => {
        let playlist = res.data.data.map(s => new Song(s));
        store.commit("playlist", playlist);
      })
      .catch(error => {
        throw new Error(error.response.data.message);
      });
  }

  addSong(id) {
    let songToSave = store.State.songs.find(s => s._id == id);
    if (!songToSave) {
      throw new Error("We couldn't find that song. sorry.");
    }
    _sandBox
      .post("", songToSave)
      .then(res => {
        let playlist = store.State.playlist;
        playlist.push(new Song(res.data.data));
        store.commit("playlist", playlist);
      })
      .catch(error => {
        throw new Error(error.response.data.message);
      });
  }

  removeSong(id) {
    _sandBox
      .delete(id)
      .then(res => {
        let playlist = store.State.playlist;
        let index = playlist.findIndex(s => s._id == id);
        playlist.splice(index, 1);
        store.commit("playlist", playlist);
      })
      .catch(error => {
        throw new Error(error.response.data.message);
      });
  }
}

const service = new SongsService();
export default service;
