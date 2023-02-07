import { UseHTTP } from "../hooks/httpHook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = UseHTTP();

  const _apiKey = process.env.REACT_APP_API_KEY;
  const _offset = 210;

  const getAllcharacters = async (url, offset = _offset) => {
    return await request(`${url}?limit=9&offset=${offset}&apikey=${_apiKey}`);
  };

  const getAllcomics = async (url, offset = _offset) => {
    const res = await request(
      `${url}?limit=8&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results;
  };

  const getComicId = async (url, id) => {
    const res = await request(`${url}/${id}?apikey=${_apiKey}`);
    return transformComics(res.data.results);
  };

  const getCharacter = async (url, id) => {
    const res = await request(`${url}/${id}?apikey=${_apiKey}`);
    return transformCharacter(res.data.results);
  };

  const transformCharacter = (res) => {
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
  };
  const transformComics = ([comics]) => {
    const lang = comics.textObjects[0]
      ? comics.textObjects[0].language
      : "en-us";
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description || "not found description",
      pages: comics.pageCount || "not information about number pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: lang,
      price: comics.prices[0].price || "not avalable",
    };
  };
  return {
    getAllcharacters,
    getCharacter,
    getAllcomics,
    getComicId,
    loading,
    error,
    clearError,
  };
};
export default useMarvelService;
