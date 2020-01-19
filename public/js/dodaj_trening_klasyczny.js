const data = document.getElementById("data");
const godzina_rozpoczecia = document.getElementById("godzina_rozpoczecia");
const godzina_zakonczenia = document.getElementById("godzina_zakonczenia");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");
const errorMessage3 = document.getElementById("errorMessage3");

form.addEventListener("submit", (e) =>
{
    let dzis = "";
    let d = new Date();
    dzis = dzis + d.getFullYear() + "-";
    if((d.getMonth()+1) < 10)
        dzis = dzis + "0" + (d.getMonth()+1) + "-";
    else
        dzis = dzis + d.getMonth() + "-";
    if(d.getDate() < 10)
        dzis = dzis + "0" + d.getDate();
    else
        dzis = dzis + d.getDate();
    let messages = [];


    if(data.value <= dzis || data.value === null)
    {
        data.className = "error";
        errorMessage1.innerText = "Data musi być co najmniej jutrzejsza!";
        messages.push("-Data musi być co najmniej jutrzejsza!");
    }
    else
    {
        data.className = "form";
        errorMessage1.innerText = "";
    }

    if(godzina_rozpoczecia.value < "06:00" || godzina_rozpoczecia.value > "23:00" || godzina_rozpoczecia.value === null)
    {
        godzina_rozpoczecia.className = "error";
        errorMessage2.innerText = "Podano złą godzinę!";
        messages.push("-Podano złą godzinę!");
    }
    else
    {
        godzina_rozpoczecia.className = "form";
        errorMessage2.innerText = "";
    }

    if(godzina_rozpoczecia.value > godzina_zakonczenia || godzina_zakonczenia.value === null)
    {
        godzina_zakonczenia.className = "error";
        errorMessage3.innerText = "Podano złą godzinę!";
        messages.push("-Podano złą godzinę!");
    }
    else
    {
        godzina_zakonczenia.className = "form";
        errorMessage3.innerText = "";
    }

    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});