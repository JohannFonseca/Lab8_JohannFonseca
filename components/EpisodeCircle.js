// aca traigo la funcion que calcula el color segun la nota
import { getRatingClass } from '../utils/constants.js';

// esta funcion arma el circulo de cada episodio
export const createEpisodeCircle = (episode) => {
    const { number, name, season, rating } = episode;
    const score = rating.average || 0;
    const ratingClass = getRatingClass(score); // busco la clase de color (rating-0, rating-1, etc)

    const episodeDiv = document.createElement('div');
    // le pongo las clases que me pidieron: episode, el numero y el color
    episodeDiv.className = `episode episode-${number} ${ratingClass}`;
    episodeDiv.textContent = number;
    
    // armo el tooltip para que cuando pase el mouse se vea la info extra
    const tooltip = document.createElement('div');
    tooltip.className = 'episode-tooltip';
    tooltip.innerHTML = `
        <strong>${name}</strong><br>
        Rating: ${score || 'N/A'}<br>
        Temporada: ${season}<br>
        Episodio: ${number}
    `;
    
    episodeDiv.appendChild(tooltip);
    
    return episodeDiv;
};
