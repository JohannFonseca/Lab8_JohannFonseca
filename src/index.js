// traigo los servicios y componentes que armé en otros archivos
import { searchShows, getShowData, getEpisodeList } from './services/tvmaze.js';
import { createShowCard } from './components/ShowCard.js';
import { createGenreRow } from './components/GenreRow.js';
import { renderShowContent } from './components/ShowDetail.js';
import { createSkeletonGrid, createSkeletonDetail } from './components/Skeleton.js';

// agarro todas las cosas del html que voy a estar tocando
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const homeSection = document.getElementById('home-section');
const resultsSection = document.getElementById('results-section');
const detailSection = document.getElementById('detail-section');
const detailContent = document.getElementById('detail-content');
const backButton = document.getElementById('back-button');
const logoLink = document.getElementById('logo-link');
const statusMessage = document.getElementById('status-message');

// aca manejo cuando el usuario busca algo
const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return; // si no escribió nada no hago nada

    // limpio la pantalla y pongo los esqueletos de carga para que no se vea vacio
    homeSection.classList.add('hidden');
    detailSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    resultsSection.innerHTML = createSkeletonGrid(3);
    statusMessage.textContent = '';

    try {
        // llamo a la api para buscar las series
        const results = await searchShows(query);
        
        if (results.length === 0) {
            resultsSection.innerHTML = '';
            statusMessage.textContent = 'no encontré nada con "' + query + '", probá con otra cosa';
            return;
        }

        resultsSection.innerHTML = '';
        
        // agrupo las series por genero para que se vea mas ordenado (estilo netflix)
        const genresMap = {};
        results.forEach(item => {
            const show = item.show;
            if (show.genres && show.genres.length > 0) {
                show.genres.forEach(genre => {
                    if (!genresMap[genre]) genresMap[genre] = [];
                    genresMap[genre].push(show);
                });
            } else {
                if (!genresMap['otros']) genresMap['otros'] = [];
                genresMap['otros'].push(show);
            }
        });

        // recorro el mapa de generos y voy creando las filas horizontales
        Object.entries(genresMap).forEach(([genre, shows]) => {
            const row = createGenreRow(genre, shows, handleShowSelection);
            resultsSection.appendChild(row);
        });

    } catch (error) {
        resultsSection.innerHTML = '';
        statusMessage.textContent = 'rompió algo al buscar, fijate la consola';
        console.error(error);
    }
};

// esto es para cuando el usuario hace clic en una serie
const handleShowSelection = async (showId) => {
    // escondo los resultados y preparo la vista de detalle
    resultsSection.classList.add('hidden');
    detailSection.classList.remove('hidden');
    detailContent.innerHTML = createSkeletonDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // subo arriba de todo

    try {
        // pido la info de la serie y la lista de episodios al mismo tiempo
        const show = await getShowData(showId);
        const seasons = await getEpisodeList(showId);

        // mando todo a renderizar con la estructura que armé
        renderShowContent(detailContent, show, seasons);

    } catch (error) {
        detailContent.innerHTML = '';
        statusMessage.textContent = 'no pude cargar los detalles, algo falló en la api';
        console.error(error);
    }
};

// inicializo todo cuando carga el dom
const init = () => {
    searchForm.addEventListener('submit', handleSearch);
    
    // para volver a la lista de resultados
    backButton.addEventListener('click', () => {
        detailSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    });

    // para volver al inicio (hero section) si toco el logo
    logoLink.addEventListener('click', () => {
        detailSection.classList.add('hidden');
        resultsSection.classList.add('hidden');
        homeSection.classList.remove('hidden');
        searchInput.value = '';
    });
};

document.addEventListener('DOMContentLoaded', init);
