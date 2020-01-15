const serie = document.getElementById("serie");
const ilosc = document.getElementById("ilosc");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");

form.addEventListener("submit", (e) =>
{
    let messages = [];

    if(serie.value < 1)
    {
        serie.className = "error";
        errorMessage1.innerText = "Ilość serii nie może być mniejsza od 1!";
        messages.push("-Ilość serii nie może być mniejsza od 1!");
    }
    else
    {
        serie.className = "form";
        errorMessage1.innerText = "";
    }

    if(ilosc.value < 1)
    {
        ilosc.className = "error";
        errorMessage2.innerText = "Ilość powtórzeń nie może być mniejsza niż 1!";
        messages.push("-Ilość powtórzeń nie może być mniejsza niż 1!");
    }
    else
    {
        ilosc.className = "form";
        errorMessage2.innerText = "";
    }


    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});