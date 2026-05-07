// aca armo los bloques grises que se mueven mientras carga la data
export const createSkeletonGrid = (rowCount = 3) => {
    let html = '';
    // creo varias filas para que parezca que ya hay contenido
    for (let r = 0; r < rowCount; r++) {
        html += `
            <div class="genre-row">
                <div class="skeleton-text title" style="margin-bottom: 20px; width: 150px;"></div>
                <div class="genre-cards-container">
                    ${Array(5).fill(`
                        <div class="skeleton-card" style="flex: 0 0 220px;">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-text title"></div>
                            <div class="skeleton-text meta"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return html;
};

// lo mismo pero para la vista de detalles
export const createSkeletonDetail = () => {
    return `
        <div class="skeleton-detail">
            <div class="skeleton-header">
                <div class="skeleton-poster"></div>
                <div class="skeleton-content">
                    <div class="skeleton-text title"></div>
                    <div class="skeleton-text badge"></div>
                    <div class="skeleton-text summary"></div>
                    <div class="skeleton-text summary"></div>
                </div>
            </div>
            <div class="skeleton-seasons">
                <div class="skeleton-text title"></div>
                <div class="skeleton-row"></div>
                <div class="skeleton-row"></div>
            </div>
        </div>
    `;
};
