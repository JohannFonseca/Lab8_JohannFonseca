// necesito la funcion de los colores para el rating
import { getRatingClass } from '../utils/constants.js';

// arma el pedacito de html para un solo episodio
export const createEpisodeHTML = (episode) => {
    const { number, name, rating } = episode;
    const score = rating || 0;
    const ratingClass = getRatingClass(score); // aca saco la clase segun la nota

    // retorno el circulo del episodio con el numero y un tooltip con el nombre
    return `
        <div class="episode episode-${number} ${ratingClass}" title="${name} (rating: ${score || 'n/a'})">
            ${number}
        </div>
    `;
};

// arma el bloque de la temporada completa con su cabecera
export const createSeasonHTML = (data, number) => {
    // junto todos los episodios de esta temporada
    const episodesHTML = data.map(ep => createEpisodeHTML(ep)).join('');
    
    // meto todo adentro de un article.season como pidió el jefe
    return `
        <article class="season">
            <header class="season-header">T${number}</header>
            ${episodesHTML}
        </article>
    `;
};

// esta es la funcion principal que dibuja todo el detalle de la serie
export const renderShowContent = (container, show, seasons) => {
    // recorro el objeto de temporadas y voy creando el html de cada una
    const seasonsHTML = Object.entries(seasons).map(([number, data]) => 
        createSeasonHTML(data, number)
    ).join('');

    // armo el html final del header y el contenedor de episodios
    const html = `
        <div class="content">
            <header class="detail-header-v2">
                <img class="poster" src="${show.image}" alt="${show.name}">
                <div class="header-text">
                    <h1>${show.name}</h1>
                    <div class="detail-badge ${getRatingClass(show.rating?.average)}">${show.rating?.average || 'n/a'} rating</div>
                </div>
            </header>
            <article class="episodes">
                ${seasonsHTML}
            </article>
        </div>
    `;

    // intento usar sethtmlunsafe que es mas rapido, si no uso el clasico innerhtml
    if (container.setHTMLUnsafe) {
        container.setHTMLUnsafe(html);
    } else {
        container.innerHTML = html;
    }
};
