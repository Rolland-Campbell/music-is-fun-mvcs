import SongsService from "../Services/SongsService.js";
import store from "../store";

//Private
function _draw() {
  let values = store.State.values;
  console.log(values);
}

//Public
export default class SongsController {
  constructor() {
    store.subscribe("values", _draw);
  }
}
