document.querySelector('.Button--Generate').addEventListener('click', GeneratePassword);
document.querySelector('.Button--Copy').addEventListener('click', CopyPassword);

const wordList = words.split(',');

function GenerateRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function GenerateSeperator(){
    const symbols = ['!', '@', '#', '$', '%', '&', '*'];
    let seperator = GenerateRandom(0, 999).toString() + symbols[GenerateRandom(0, 6)];

    while (seperator.length<4){
        seperator = '0' + seperator;
    }

    return seperator;
}

function GeneratePassword(){
    let password = wordList[GenerateRandom(0, (wordList.length - 1))] + GenerateSeperator() + wordList[GenerateRandom(0, (wordList.length - 1))];
    document.querySelector('.TextBox--Password').value = password;
}

function CopyPassword(){
    navigator.clipboard.writeText(document.querySelector('.TextBox--Password').value);
}