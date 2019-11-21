export default class Song {
    constructor(data) {
        this._id = data._id
        this.imgUrl = data.imgUrl
        this.title = data.title
        this.artist = data.artist
        this.album = data.album
    }

    get Template() {
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${this.imgUrl}" class="card-img" alt="...">
                </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.artist}</p>
                <p class="card-text">${this.album}</p>
            </div>
            </div>
        </div>
        </div>
        `
    }
}