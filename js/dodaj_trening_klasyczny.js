
//NIE DZIALA!!!!

const data = document.getElementById("data");
const godzina = document.getElementById("godzina");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");

form.addEventListener("submit", (e) =>
{
    let messages = [];
    var dzis = new Date();
    dzis = dzis.getDate();
    var time = dzis.getTime();


    if(data.value < dzis.value)
    {
        data.className = "error";
        errorMessage1.innerText = "Nie możesz wybrać przeszłej daty!";
        messages.push("-Nie możesz wybrać przeszłej daty!");
    }

    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});