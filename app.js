console.log("Starting App");

//used file system  inbuild modules
const fs = require('fs');

const yargs = require('yargs');
const _ = require('lodash');

//other files
const notes = require('./notes');

const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyoption = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyoption,
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOption
    })
    .command('remove', 'Remove a note', {
        title: titleOption
    })
    .help()
    .argv;

const command = argv._[0];

switch (command) {
    case 'add':
        let note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log('Note Created');
            notes.logNote(note);
        } else {
            console.log('Note with same title is taken . Try Another Title!');
        }
        break;

    case 'list':
        let allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} notes`);
        allNotes.forEach(note => {
            notes.logNote(note);
        });
        break;

    case 'read':
        let singleNote = notes.getNote(argv.title);
        if (note) {
            console.log(`Note Fetched`);
            notes.logNote(singleNote);
        } else {
            console.log('Note not found');
        }
        break;

    case 'remove':
        let noteRemoved = notes.removeNote(argv.title);
        let message = noteRemoved ? "Note removed succesfully" : "Note don't exist";
        console.log(message);
        break;

    default:
        console.log('Try Another Command');
        break;
}