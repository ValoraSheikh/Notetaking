// DOM Elements
let main = document.querySelector('#container');
let input = document.querySelector('input');
let addNote = document.querySelector('#addNote');
let noteArea = document.querySelector('.notes-area');
let line = document.querySelector('#line');

// Retrieve notes and noteCounter from local storage
let notes = JSON.parse(localStorage.getItem('note')) || [];
let noteCounter = JSON.parse(localStorage.getItem('noteCounter')) || 0;

// Render notes from local storage
notes.forEach((noteObj) => {
    renderNotes(noteObj);
});

// Function to create a new note
function noteMaking() {
    if (input.value.trim() === "") {
        alert(`First Enter a note`);
        return;
    }

    if (notes.length < 0) {
        noteCounter = 0
    }

    noteCounter++; // Increment the counter
    const noteObj = {
        noteHead: `Note: ${noteCounter}`,
        notePara: input.value.trim(),
    };

    // Add new note to the notes array and local storage
    notes.push(noteObj);
    saveNoteToLS();

    // Render the note in the DOM
    renderNotes(noteObj);

    // Save the updated counter to local storage
    localStorage.setItem('noteCounter', JSON.stringify(noteCounter));

    input.value = ""; // Clear input
    line.style.display = 'none'; // Hide the line
}

// Function to render a note in the DOM
function renderNotes(noteObj) {
    let noteBox = document.createElement('div');
    noteBox.classList.add('box');
    noteArea.append(noteBox);

    let noteNo = document.createElement('h3');
    noteNo.textContent = noteObj.noteHead;
    noteBox.append(noteNo);

    let notePara = document.createElement('div');
    notePara.classList.add('para');
    notePara.innerHTML = `<p>${noteObj.notePara}</p>`;
    noteBox.append(notePara);

    let detailButton = document.createElement('button');
    detailButton.textContent = `View Detail`;
    noteBox.append(detailButton);

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn')
    removeBtn.textContent = `Remove`
    noteBox.append(removeBtn)

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notes = notes.filter(n => n.noteHead !== noteObj.noteHead);
        noteBox.remove();
        noteCounter--;
        saveNoteToLS();
    })

    detailButton.addEventListener('click', function () {
        let paraOverlay = document.createElement('div');
        paraOverlay.classList.add('modal-overlay');
        main.append(paraOverlay);

        let paraContainer = document.createElement('div');
        paraContainer.classList.add('modal-container');
        paraOverlay.append(paraContainer);

        let para = document.createElement('div');
        para.classList.add('modal');
        para.innerHTML = `<p>${noteObj.notePara}</p>`;
        paraContainer.append(para);

        let close = document.createElement('div');
        close.id = 'close';
        close.innerHTML = `<span class="material-symbols-outlined">close </span>`;
        para.append(close);

        close.addEventListener('click', function () {
            paraOverlay.style.display = 'none';
            paraContainer.style.display = 'none';
        });
    });
}

// Save notes to local storage
function saveNoteToLS() {
    localStorage.setItem('note', JSON.stringify(notes));
}

// Event listener for adding a new note
addNote.addEventListener('click', noteMaking);
