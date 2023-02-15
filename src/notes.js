import Quill from 'quill';
import {wordList} from './WordList.js';

const pageContainer = document.querySelector('.Page__Container');

const FillTemplates = () => {
    for (i=0; i<localStorage.key.length; ++i){
        
    }
}

var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        'clipboard': true
    }
});

const LoadNotes = () => {
    const display = document.querySelector('.Page--Notes');

    if (display.style.display === "none"){
        display.style.display = "block";
    }

    pageContainer.innerHTML = ""
}

const HideNotes = () => {
    document.querySelector('.Page--Notes').style.display = "none";
}

document.querySelector('.Navigation--Notes').addEventListener('click', LoadNotes);

document.querySelector('.Button--Clear').addEventListener('click', () => {
    const conf = confirm('Are you sure you want to clear all notes?', 'Yes' | 'No');
    
    if (conf === true){
        quill.setText('')
    }
});
document.querySelector('.Button--Copy').addEventListener('click', () => {
    // var content = document.querySelector('.ql-editor');
    // var children = content.children;
    // let clipboardPack = [];

    // if (children > 0){
    //     for(var i=0; i<children.length ; i++){
    //         let item = new ClipboardItem(children[i].content);
    //         clipboardPack.push(item)
    //     }
    // }
    // navigator.clipboard.write(clipboardPack);
    alert('Press ctrl+a, then press ctrl+c if on a windows machine. If on a Mac, press command+a and then command+c.');
    focus(document.querySelector('.ql-editor'))
});

//PW TOOL SCRIPT

const pwPage = "<p class=\"Title--Password\">Password</p>\n<div>\n\t<input type=\"text\" class=\"TextBox--Password\" placeholder=\"Password will generate here\"/>\n</div>\n<button class=\"Button--Generate\">Generate Password</button>\n<div class=\"Button__Holder--Lower\">\n<button class=\"Button--Copy2\">Copy</button>\n\t<button class=\"Button--Back\">Back</button>\n</div>"

document.querySelector('.Navigation--PW').addEventListener('click', () => {
    HideNotes();

    pageContainer.innerHTML = pwPage;

    document.querySelector('.Button--Generate').addEventListener('click', () => {
        const symbols = ['!', '@', '#', '$', '%', '&', '*'];
        const seperator = GenerateRandom(0, 999).toString() + symbols[GenerateRandom(0, 6)];
    
        while (seperator.length<4){
            seperator = '0' + seperator;
        }
    
        const password = wordList[GenerateRandom(0, (wordList.length - 1))] + seperator + wordList[GenerateRandom(0, (wordList.length - 1))];
        document.querySelector('.TextBox--Password').value = password;
    });
    document.querySelector('.Button--Copy2').addEventListener('click', () => {
        navigator.clipboard.writeText(document.querySelector('.TextBox--Password').value);
    });
    document.querySelector('.Button--Back').addEventListener('click', LoadNotes);
})

function GenerateRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//TEMPLATES PAGE

const templatesPage = "<div class=\"Page--Templates\"><div><button class=\"Button--Create\">Create New Template</button></div><div><button class=\"Button--Edit\">Edit Template</button></div><div><button class=\"Button--Delete\">Delete Template</button></div><div><button class=\"Button--Cancel\">Cancel</button></div></div>";

document.querySelector('.Navigation--Templates').addEventListener('click', () => {
    HideNotes();

    pageContainer.innerHTML = templatesPage;

    document.querySelector('.Button--Cancel').addEventListener('click', LoadNotes)
    //add future event listeners here
    const templatesCreate = "<p>Template Name</p><input type=\"text\" class=\"Textbox--Name\"/><p>Format Template</p><div class=\"Editor__Template--Container\"><div class=\"Editor__Template--Container2\"><div id=\"editor2\" class=\"Editor2\"></div></div></div><button class=\"Button__Edit--Save\">Save</button><button class=\"Button__Edit--Cancel\">Cancel</button>";

    document.querySelector('.Button--Create').addEventListener('click', () => {
        pageContainer.innerHTML = templatesCreate;

        var quill2 = new Quill('#editor2', {
            theme: 'snow',
            modules: {
                'clipboard': true
            }
        });

        document.querySelector('.Button__Edit--Cancel').addEventListener('click', LoadNotes);

        document.querySelector('.Button__Edit--Save').addEventListener('click', () => {
            const name = document.querySelector('.Textbox--Name').value;
            const template = quill2.getText();

            if (name === ""){
                alert("Name is a required field");
                return;
            }
            else if (template === "\n"){
                alert("Format Template is a required field");
                return;
            }

            LoadNotes();
        })
    })
})