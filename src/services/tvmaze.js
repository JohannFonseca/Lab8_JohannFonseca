// aca guardo las urls base y la imagen por defecto por si alguna serie no tiene poster
import { API_BASE_URL, PLACEHOLDER_IMAGE } from '../utils/constants.js';

// funcion para buscar series por nombre, me devuelve una lista
export const searchShows = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('error al buscar shows');
        return await response.json();
    } catch (error) {
        console.error('falla en tvmaze service:', error);
        throw error;
    }
};

// aca pido la data basica de una sola serie usando su id
export const getShowData = async (id) => {
    const URL = `${API_BASE_URL}/shows/${id}`;
    const data = await fetch(URL).then(res => res.json());

    // devuelvo solo lo que necesito para que sea mas limpio
    return {
        name: data.name,
        rating: data.rating,
        image: data.image?.medium ?? PLACEHOLDER_IMAGE, // si no hay imagen, pongo el placeholder
        summary: data.summary,
        genres: data.genres
    };
};

// esta funcion es clave, trae los episodios y los agrupa por temporada
export const getEpisodeList = async (id) => {
    const URL = `${API_BASE_URL}/shows/${id}/episodes`;
    const episodes = await fetch(URL).then(res => res.json());

    // mapeo los episodios para quedarme con los datos que me importan
    const episodeList = episodes.map(episode => ({
        number: episode.number,
        season: episode.season,
        rating: episode.rating.average,
        name: episode.name
    }));

    // uso object.groupby para que se junten todos los de la temp 1, temp 2, etc.
    const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
    return episodesBySeason;
};
