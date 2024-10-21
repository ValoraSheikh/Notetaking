// let noteNo = document.querySelector('h3');
let main = document.querySelector('#container')
let input = document.querySelector('input');
let addNote = document.querySelector('#addNote');
let noteArea = document.querySelector('.notes-area');
let line = document.querySelector('#line');
let noteCounter = 0;

function noteMaking() {

    if (input.value == "") {
        console.log(alert(`First Enter a note`));
        return;
    }

    let noteBox = document.createElement('div');
    noteBox.classList.add('box');
    noteArea.append(noteBox);

    noteCounter++;
    let noteNo = document.createElement('h3')
    noteNo.textContent = `Note ${noteCounter}`;
    noteBox.append(noteNo);

    let notePara = document.createElement('div');
    notePara.classList.add('para');
    notePara.innerHTML = `<p>${input.value}</p>`
    noteBox.append(notePara);

    let detailButton = document.createElement('button');
    detailButton.textContent = `View Detail`
    noteBox.append(detailButton);

    let note = `${input.value}`;
    
    function noteView() {
        let paraOverlay = document.createElement('div');
        paraOverlay.classList.add('modal-overlay');
        main.append(paraOverlay);

        let paraContainer = document.createElement('div');
        paraContainer.classList.add('modal-container');
        paraOverlay.append(paraContainer);

        let para = document.createElement('div');
        para.classList.add('modal');
        
        para.innerHTML = `<p>${note}</p>`;
        // para.innerHTML = `<span class="material-symbols-outlined" id="close">close </span>`
        paraContainer.append(para)
        
        let close = document.createElement('div');
        close.id = 'close';
        close.innerHTML = `<span class="material-symbols-outlined">close </span>`
        para.append(close);

        close.addEventListener('click', function () {
            paraOverlay.style.display = 'none';
            paraContainer.style.display = 'none';
        })
    }
    
    detailButton.addEventListener('click', noteView);
    
    input.value = "";
    
    line.style.display = 'none'

}

addNote.addEventListener('click', noteMaking);


