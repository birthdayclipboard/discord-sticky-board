document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');

    // Fetch the notes data from our JSON file
    // The cache-busting `?t=${new Date().getTime()}` ensures we always get the latest version
    fetch(`notes.json?t=${new Date().getTime()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(notes => {
            if (notes.length === 0) {
                notesContainer.innerHTML = '<p>No notes yet. Add one from Discord!</p>';
                return;
            }

            // Loop through each note and create a sticky note element for it
            notes.forEach(noteData => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');

                const contentElement = document.createElement('div');
                contentElement.classList.add('note-content');
                contentElement.textContent = noteData.text;

                const authorElement = document.createElement('div');
                authorElement.classList.add('note-author');
                authorElement.textContent = `- ${noteData.author}`;

                noteElement.appendChild(contentElement);
                noteElement.appendChild(authorElement);
                notesContainer.appendChild(noteElement);
            });
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
            notesContainer.innerHTML = '<p>Could not load notes. Check the console for errors.</p>';
        });
});
