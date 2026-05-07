import { createEpisodeCircle } from './EpisodeCircle.js';

export const createSeasonRow = (seasonNumber, episodes) => {
    const season = document.createElement('article');
    season.className = 'season';
    
    const header = document.createElement('header');
    header.className = 'season-header';
    header.textContent = `T${seasonNumber}`;
    season.appendChild(header);
    
    episodes.forEach(episode => {
        season.appendChild(createEpisodeCircle(episode));
    });
    
    return season;
};
