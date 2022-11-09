export default class MarvelService {
  constructor() {
    this.apiKey = process.env.REACT_APP_API_KEY;
    this._offset = 210;
  }
  async getResurce(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw Error(`can non find ${url} status:${res.status}`);
    }
    return await res.json();
  }

  async getAllcharacters(url, offset = this._offset) {
    return await this.getResurce(
      `${url}?limit=9&offset=${offset}&apikey=${this.apiKey}`
    );
  }

  async getCharacter(url, id) {
    const res = await this.getResurce(`${url}/${id}?apikey=${this.apiKey}`);
    return this.transformCharacter(res.data.results);
  }

  transformCharacter(res) {
    return Object.assign(res).reduce((acc, item) => {
      acc = {
        id: item.id,
        name: item.name,
        description: item.description || "not found description",
        thumbnail: item.thumbnail.path + ".jpg",
        homePage: item.urls[0].url,
        wiki: item.urls[1].url,
        comics: item.comics.items,
      };
      return acc;
    }, {});
  }
}
