const nazwa = document.getElementById("nazwa");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");

form.addEventListener("submit", (e) =>
{
    let messages = [];

    if(nazwa.value.length < 3)
    {
        nazwa.className = "error";
        errorMessage1.innerText = "Nazwa nie może być krótsza niż 3 znaki!";
        messages.push("-Nazwa nie może być krótsza niż 3 znaki!");
    }


    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});