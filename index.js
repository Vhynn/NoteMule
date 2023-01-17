const Quill = require('quill');
const Store = require('electron-store');
const store = new Store();

var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        'clipboard': true
    }
});

const pageContainer = document.querySelector('.Page__Container');
document.querySelector('.Page--Notes').style.display = "block";

const FillTemplates = () => {
    const templateList = document.querySelector('.Dropdown--Content2');
    templateList.innerHTML = '';
    
    for (key of store){
        templateList.innerHTML += '<a href="#">' + key[0] + '</a>';
    }

    for (child of templateList.children){
        child.addEventListener('click', (event) => {
            
            const conf = confirm('Loading a template will clear all notes, do you wish to proceed?', 'Yes' | 'No');
    
            if (conf === true){
                quill.setText(store.get(event.target.text));
            }
        })
    }
}

const LoadNotes = () => {
    const notes = document.querySelector('.Page--Notes');

    if (notes.style.display === "none"){
        notes.style.display = "block";
        document.querySelector('.Dropdown2').style.display = "block";
    }

    pageContainer.innerHTML = ""
}

const HideNotes = () => {
    const notes = document.querySelector('.Page--Notes');

    if (notes.style.display === "block"){
        notes.style.display = "none";
        document.querySelector('.Dropdown2').style.display = "none";
    }
}

FillTemplates();

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
    alert('Press ctrl+a, then press ctrl+c if on a documentdows machine. If on a Mac, press command+a and then command+c.');
    focus(document.querySelector('.ql-editor'))
});

//PW TOOL SCRIPT

const pwPage = "<p class=\"Title--Password\">Password</p>\n<div>\n\t<input type=\"text\" class=\"TextBox--Password\" placeholder=\"Password will generate here\"/>\n</div>\n<button class=\"Button--Generate\">Generate Password</button>\n<div class=\"Button__Holder--Lower\">\n<button class=\"Button--Copy2\">Copy</button>\n\t<button class=\"Button--Back\">Back</button>\n</div>";

document.querySelector('.Navigation--PW').addEventListener('click', () => {
    HideNotes();

    pageContainer.innerHTML = pwPage;

    document.querySelector('.Button--Generate').addEventListener('click', () => {
        const symbols = ['!', '@', '#', '$', '%', '&', '*'];
        let seperator = GenerateRandom(0, 999).toString() + symbols[GenerateRandom(0, 6)];
    
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
    const templatesCreate = "<p>Template Name</p><input type=\"text\" class=\"Textbox--Name\"/><p>Template Contents</p><div class=\"Editor__Template--Container\"><div class=\"Editor__Template--Container2\"><div id=\"editor2\" class=\"Editor2\"></div></div></div><button class=\"Button__Edit--Save\">Save</button><button class=\"Button__Edit--Cancel\">Cancel</button>";

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
                alert("Template Contents is a required field");
                return;
            }
            
            store.set(name, template);

            FillTemplates();

            LoadNotes();
        })
    })

    const templatesDelete = "<div class=\"Label__Midpage\"><p>Select Template</p></div><div><select class=\"Selector--Templates\"><option></option></select></div><button class=\"Button__Edit--Delete\">Delete</button><div><button class=\"Button__Edit--Cancel\">Cancel</button></div>";

    document.querySelector('.Button--Delete').addEventListener('click', () => {
        pageContainer.innerHTML = templatesDelete;
        const templateSelector = document.querySelector('.Selector--Templates')

        templateSelector.innerHTML = "<option></option>"
        for (key of store){
            templateSelector.innerHTML += '<option>' + key[0] + '</option>';
        }

        document.querySelector('.Button__Edit--Delete').addEventListener('click', () => {
            const conf = confirm('Are you sure you want to permanantly delete ' + templateSelector.value + '?', 'Yes' | 'No');
            
            if (conf === true){
                store.delete(templateSelector.value);

                FillTemplates();
            }

            LoadNotes()
        })

        document.querySelector('.Button__Edit--Cancel').addEventListener('click', LoadNotes);

    })

    const templatesEdit = "<p>Select Template</p><div><select class=\"Selector--Templates\"><option></option></select></div><p>Template Contents</p><div class=\"Editor__Template--Container\"><div class=\"Editor__Template--Container2\"><div id=\"editor2\" class=\"Editor2\"></div></div></div><button class=\"Button__Edit--Save\">Save</button><button class=\"Button__Edit--Cancel\">Cancel</button>";

    document.querySelector('.Button--Edit').addEventListener('click', () => {
        pageContainer.innerHTML = templatesEdit;
        const templateSelector = document.querySelector('.Selector--Templates')

        templateSelector.innerHTML = "<option></option>"
        for (key of store){
            templateSelector.innerHTML += '<option>' + key[0] + '</option>';
        }

        var quill2 = new Quill('#editor2', {
            theme: 'snow',
            modules: {
                'clipboard': true
            }
        });

        document.querySelector('.Button__Edit--Cancel').addEventListener('click', LoadNotes);

        templateSelector.addEventListener('change', (event) => {
            quill2.setText(store.get(event.target.value));
        });
        
        document.querySelector('.Button__Edit--Save').addEventListener('click', () => {
            store.set(templateSelector.value, quill2.getText());

            LoadNotes();
        })
    })
})