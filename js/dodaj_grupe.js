const nazwa = document.getElementById("nazwa");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", (e) =>
{
    let messages = [];

    if(nazwa.value.length < 3)
    {
        nazwa.className = "error";
        errorMessage.innerText = "Nazwa nie może być krótsza niż 3 znaki!";
        messages.push("-Nazwa nie może być krótsza niż 3 znaki!");
    }

    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});