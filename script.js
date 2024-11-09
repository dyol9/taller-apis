async function searchBooks() {
    const query = document.getElementById('book-query').value.trim();

    if (!query) {
        alert('Por favor, ingresa un título o autor de libro.');
        return;
    }

    const resultsDiv = document.getElementById('book-results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Error al obtener los datos de Open Library');
        }

        const data = await response.json();

        if (data.num_found === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        data.docs.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Autor(es):</strong> ${book.author_name ? book.author_name.join(', ') : 'No disponible'}</p>
                <p><strong>Edición:</strong> ${book.first_publish_year ? book.first_publish_year : 'No disponible'}</p>
                <p><strong>Enlace:</strong> <a href="https://openlibrary.org${book.key}" target="_blank">Ver más</a></p>
            `;

            resultsDiv.appendChild(bookElement);
        });
    } catch (error) {
        resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}