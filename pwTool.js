const pwPage = "<p>Password</p>\n<div>\n\t<input type=\"text\" class=\"TextBox--Password\" placeholder=\"Password will generate here\"/>\n</div>\n<button class=\"Button--Generate\">Generate Password</button>\n<div class=\"Button__Holder--Lower\">\n<button class=\"Button--Copy2\">Copy</button>\n\t<button class=\"Button--Back\">Back</button>\n</div>"
const wordList = words.split(',');

document.querySelector('.Navigation--PW').addEventListener('click', LoadPwPage)

function LoadPwPage(){
    pageContainer.innerHTML = pwPage;

    document.querySelector('.Button--Generate').addEventListener('click', GeneratePassword);
    document.querySelector('.Button--Copy2').addEventListener('click', CopyPassword);
}

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