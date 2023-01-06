const templatesPage = "<div class=\"Page--Templates\"><div><button class=\"Button--Create\">Create New Template</button></div><div><button class=\"Button--Edit\">Edit Template</button></div><div><button class=\"Button--Delete\">Delete Template</button></div><div><button class=\"Button--Cancel\">Cancel</button></div></div>"

document.querySelector('.Navigation--Templates').addEventListener('click', loadTemplates)

function loadTemplates(){
    document.querySelector('.Page--Notes').style.display = "none";

    pageContainer.innerHTML = templatesPage;

    document.querySelector('.Button--Cancel').addEventListener('click', LoadNotes)
    //add future event listeners here
}