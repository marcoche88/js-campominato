/*
Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe.
I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi)
Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte
di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100.
L'utente non può inserire 2 volte lo stesso numero.
Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe,
guadagna un punto e poi gli chiediamo un altro numero.
Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina.
Quando la partita termina, comunichiamo all'utente il suo punteggio.
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che
cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 => tra 1 e 80
con difficoltà 2 => tra 1 e 50
*/

/*
1- creare array per i 16 numeri casuali
2- generare numeri casuali diversi da 1 a 100 finchè l'array non ha 16 elementi
3- creare array per i numeri che verranno inseriti dall'utente
4- chiedere un numero da 1 a 100 all'utente
5- controllare se il numero inserito è tra i 16 numeri dell'array, se presente l'utente ha perso.
6- se non è presente controllare se il numero era gia stato inserito precedentemente,
   se presente richiedere un altro numero
7- se non è presente aggiungere il numero all'array dei numeri dell'utente
8- ripetere i numeri 4,5,6,7 finchè l'utente non ha inserito 100(max) - 16(bombe) numeri diversi
9- quando l'utente perde o termina la partita (alert)
   comunicare il punteggio finale(lungheza array numeri utente)
*/

// variabili
const bombsDisplay = document.getElementById("bombs");
const numberDisplay = document.getElementById("user-number");
const resultDisplay = document.getElementById("result");

// array bombe e numeri utente
const bombs = [];
const numbers = [];

// valore punteggio, numero bombe e livello di difficoltà (con validazione)
const score = 1;
const bombNumber = 16;

let maxNumber;
let level = prompt("Inserisci livello di difficoltà '0' '1' '2'");
while (!level || level.trim() === "" || (level != "0" && level != "1" && level != "2")) {
    level = prompt("Inserisci livello di difficoltà '0' '1' '2'");
}

// switch livello di difficoltà
switch (level) {
    case "0":
        maxNumber = 100;
        break;
    case "1":
        maxNumber = 80;
        break;
    case "2":
        maxNumber = 50;
}

// raccolta dei 16 numeri random per le bombe
while (bombs.length !== bombNumber) {
    const randomNumber = numberGenerator(1, maxNumber);
    if (!bombs.includes(randomNumber)) {
        bombs.push(randomNumber);
    }
};

// ripetere il gioco finchè l'utente non ha inserito max - bombe numeri diversi
while (numbers.length !== (maxNumber - bombNumber)) {

    // chiedere un numero all'utente con validazione
    let userNumber;
    do {
        userNumber = parseInt(prompt("Inserisci un numero da 1 a " + maxNumber));
    } while (isNaN(userNumber) || userNumber < 1 || userNumber > maxNumber);

    // verificare se il numero inserito non è tra i numeri dell'array bombe
    if (!bombs.includes(userNumber)) {
        // verificare se il numero inserito non è tra i numeri dell'array numeri utente
        if (!numbers.includes(userNumber)) {
            numbers.push(userNumber);
        }
    } else {
        // utente ha perso, numero presente nell'array bombe. stampo
        resultDisplay.innerText = "Hai preso la bomba! GAME OVER. Punteggio: " + (numbers.length * score);
        break;
    }
}

// utente ha vinto la partita e stampo
if (numbers.length === (maxNumber - bombNumber)) {
    resultDisplay.innerText = "Hai vinto. Punteggio finale: " + (numbers.length * score);
}

// stampare su pagina le liste

bombsDisplay.innerHTML = listGenerator(bombs);
numberDisplay.innerHTML = listGenerator(numbers);


// FUNZIONI

function numberGenerator(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

function listGenerator(myArray) {
    let list = "";
    for (let i = 0; i < myArray.length; i++) {
        list += "<li>" + myArray[i] + "</li>";
    }
    return list;
}