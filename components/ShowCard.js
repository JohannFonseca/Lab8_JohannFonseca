// helpers para las imagenes y las clases de color
import { PLACEHOLDER_IMAGE, getRatingClass, formatDate } from '../utils/constants.js';

// arma la tarjetita que sale en los resultados de busqueda
export const createShowCard = (showData) => {
    const { id, name, image, rating, genres, premiered } = showData;
    
    // preparo los datos: poster, nota, año y los primeros dos generos
    const poster = image ? image.medium : PLACEHOLDER_IMAGE;
    const score = rating.average || 'n/a';
    const year = premiered ? premiered.split('-')[0] : 'n/a';
    const genreList = genres.length > 0 ? genres.slice(0, 2).join(', ') : 'sin género';

    // creo el div de la card y le meto el html
    const card = document.createElement('div');
    card.className = 'show-card fade-in';
    card.dataset.id = id;
    
    card.innerHTML = `
        <div class="card-image-wrapper">
            <img src="${poster}" alt="${name}" loading="lazy" class="card-poster">
            <div class="card-rating ${getRatingClass(score)}">${score}</div>
        </div>
        <div class="card-info">
            <h3 class="card-title">${name}</h3>
            <div class="card-meta">
                <span class="card-year">${year}</span>
                <span class="card-genres">${genreList}</span>
            </div>
        </div>
    `;

    return card;
};
