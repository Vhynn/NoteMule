document.querySelector('.Button--Clear').addEventListener('click', ClearEditor);
document.querySelector('.Button--Copy').addEventListener('click', CopyToClipboard)

function ClearEditor(){
    let conf = confirm('Are you sure you want to clear all notes?', 'Yes' | 'No');
    
    if (conf === true){
        quill.setText('')
    }
}

function CopyToClipboard(){
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
}