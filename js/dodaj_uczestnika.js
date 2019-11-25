const nazwa = document.getElementById("nazwa");
const haslo = document.getElementById("haslo");
const haslo2 = document.getElementById("haslo2");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");
const errorMessage3 = document.getElementById("errorMessage3");

form.addEventListener("submit", (e) =>
{
    let messages = [];

    if(haslo.value === haslo2.value)
    {
        haslo.className = "form";
        haslo2.className = "form";
        errorMessage2.innerText = "";
        errorMessage3.innerText = "";

        if(haslo.value.length < 8)
        {
            haslo.className = "error";
            haslo2.className = "error";
            errorMessage2.innerText = "Hasło nie może być krótsze niż 8 znaków!";
            messages.push("-Hasło nie może być krótsze niż 8 znaków!");
        }

        if(haslo.value.length > 24)
        {
            haslo.className = "error";
            haslo2.className = "error";
            errorMessage2.innerText = "Hasło nie może dłuższe niż 24 znaki!";
            messages.push("-Hasło nie może dłuższe niż 24 znaki!");
        }
    }
    else
    {
        haslo.className = "error";
        haslo2.className = "error";
        errorMessage2.innerText = "Hasła muszą być identyczne!";
        errorMessage3.innerText = "Hasła muszą być identyczne!";
        messages.push("-Hasła muszą być identyczne!");
    }

    if(nazwa.value.length < 3)
    {
        nazwa.className = "error";
        errorMessage1.innerText = "Nazwa nie może być krótsza niż 3 znaki!";
        messages.push("-Nazwa nie może być krótsza niż 3 znaki!");
    }
    else
    {
        nazwa.className = "form";
        errorMessage1.innerText = "";
    }
    
    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});
