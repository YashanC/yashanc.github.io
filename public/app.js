let labTable = [];
let symptomTable = []

async function loadSymptomCSV() {
    const response = await fetch('http://localhost:3000/data/symptoms.csv');
    const csvText = await response.text();
    const rows = csvText.split("\n").map(row => row.split(","));
    symptomTable = rows;

}

async function loadLabCSV() {
    const response = await fetch('http://localhost:3000/data/labs.csv');
    const csvText = await response.text();
    const rows = csvText.split("\n").map(row => row.split(","));
    labTable = rows;

}

function Random(max) {
    return Math.floor(Math.random() * max);    
}

loadSymptomCSV();
loadLabCSV();

function generatePrompt() {
    var info1 = symptomTable[Random(symptomTable.length)];
    var info2 = "";
    var randInt = Random(6);
    var age = 18 + Random(72);
    var genderNum = 1 + Random(1);
    var gender = "";
    if(genderNum == 1) {
        gender = "M";
    } else {
        gender = "F";
    }

    if(randInt > 3) {
        var info2 = labTable[Random(labTable.length)];
    } else {
        var info2 = symptomTable[Random(symptomTable.length)];
    }
    var str = "A " + age + gender + " presents with " + info1 + " and " + info2 + ". Consider your differential as well as initial labs/imaging studies you would order.";
    var prompt = document.getElementById("prompt");
    prompt.textContent = str;

}

function copyPrompt() {
    var text = document.getElementById("prompt").innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("copied");
        })
        .catch((error) => {
            console.error(error);
        })
}