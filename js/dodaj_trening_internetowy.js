const startDate = document.getElementById("startDate");
const finishDate = document.getElementById("finishDate");
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

    if(startDate.value > finishDate.value)
    {
        startDate.className = "error";
        errorMessage1.innerText = "Koniec treningu nie może być przed początkiem treningu!";
        messages.push("-Koniec treningu nie może być przed początkiem treningu!");
    }
    else
    {
        startDate.className = "form";
        errorMessage1.innerText = "";
    }

    if(startDate.value === finishDate.value)
    {
        startDate.className = "error";
        finishDate.className = "error";
        errorMessage1.innerText = "Początek i koniec treningu nie mogą być w tym samym dniu!";
        errorMessage2.innerText = "Początek i koniec treningu nie mogą być w tym samym dniu!";
        messages.push("-Początek i koniec treningu nie mogą być w tym samym dniu!");
    }
    else
    {
        startDate.className = "form";
        finishDate.className = "form";
        errorMessage1.innerText = "";
        errorMessage2.innerText = "";
    }

    if(startDate.value < dzis)
    {
        startDate.className = "error";
        errorMessage1.innerText = "Nie możesz wybrać przeszłej daty!";
        messages.push("-Nie możesz wybrać przeszłej daty!");
    }
    else
    {
        startDate.className = "form";
        errorMessage1.innerText = "";
    }

    if(finishDate.value < dzis)
    {
        finishDate.className = "error";
        errorMessage2.innerText = "Nie możesz wybrać przeszłej daty!";
        messages.push("-Nie możesz wybrać przeszłej daty!");
    }
    else
    {
        finishDate.className = "form";
        errorMessage2.innerText = "";
    }


    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});