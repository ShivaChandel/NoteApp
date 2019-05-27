console.log("Starting notes.js file");

const fs = require('fs');


const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {

    let notes = fetchNotes();
    let note = {
        title,
        body
    };


    //for duplicate notes
    let duplicatNotes = notes.filter((note) => {
        return note.title === title;
    });

    if (duplicatNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }

};

const getAll = () => {
    console.log('Getting all notes');
    return fetchNotes();
}

const getNote = (title) => {
    console.log('Getting Note \n');
    let notes = fetchNotes();
    let note = notes.filter((note) => note.title === title);
    return note[0];

}

const removeNote = (title) => {
    console.log('Removing Note');
    let notes = fetchNotes();
    let filtredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filtredNotes);

    return notes.length !== filtredNotes.length;
}

const logNote = (note) => {
    console.log(`\n----\nTitle : ${note.title}\nBody : ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}