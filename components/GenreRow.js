// traigo el componente de la tarjetita
import { createShowCard } from './ShowCard.js';

// esta funcion crea una fila horizontal de series para un genero especifico
export const createGenreRow = (genreName, shows, onShowClick) => {
    const section = document.createElement('section');
    section.className = 'genre-row fade-in'; // le pongo una animacion de entrada
    
    // armo el titulo del genero y el contenedor para las tarjetas
    section.innerHTML = `
        <h2 class="genre-title">${genreName}</h2>
        <div class="genre-cards-container"></div>
    `;
    
    const container = section.querySelector('.genre-cards-container');
    
    // por cada serie en este genero, creo una tarjeta y se la pego al contenedor
    shows.forEach(show => {
        const card = createShowCard(show);
        // le aviso a la app que serie se clickeó para mostrar los detalles
        card.addEventListener('click', () => onShowClick(show.id));
        container.appendChild(card);
    });
    
    return section;
};
