const data = document.getElementById("data");
const godzina = document.getElementById("godzina");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");

form.addEventListener("submit", (e) =>
{
    let dzis = "";
    let d = new Date();
    dzis = dzis + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
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

    if(godzina.value < "06:00" || godzina.value > "23:00" || godzina.value === null)
    {
        godzina.className = "error";
        errorMessage2.innerText = "Podano złą godzinę!";
        messages.push("-Podano złą godzinę!");
    }
    else
    {
        godzina.className = "form";
        errorMessage2.innerText = "";
    }

    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});