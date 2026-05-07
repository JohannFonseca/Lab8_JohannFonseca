// aca guardo cosas que no cambian en toda la app
export const PLACEHOLDER_IMAGE = "https://placehold.co/210x295/1a1a1a/ffffff?text=No+Image";
export const API_BASE_URL = "https://api.tvmaze.com";

// esta funcion es la que decide que clase de css usar segun el rating (0 al 10)
export const getRatingClass = (rating) => {
    if (rating === null || rating === undefined) return 'rating-0';
    const floorRating = Math.floor(rating);
    return `rating-${floorRating}`;
};

// saco el año de una fecha larga (ej: 2024-05-07 -> 2024)
export const formatDate = (dateString) => {
    if (!dateString) return 'n/a';
    return dateString.split('-')[0];
};

// corta el texto si es muy largo para que no rompa el diseño
export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
