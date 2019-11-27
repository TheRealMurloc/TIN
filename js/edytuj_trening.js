const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");
const number4 = document.getElementById("number4");
const number5 = document.getElementById("number5");
const number6 = document.getElementById("number6");
const number7 = document.getElementById("number7");
const number8 = document.getElementById("number8");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");

form.addEventListener("submit", (e) =>
{
    let messages = [];

    if(number1.value < 0)
    {
        number1.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number1.className = "ilosc";
    }

    if(number2.value < 0)
    {
        number2.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number2.className = "ilosc";
    }

    if(number3.value < 0)
    {
        number3.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number3.className = "ilosc";
    }

    if(number4.value < 0)
    {
        number4.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number4.className = "ilosc";
    }

    if(number5.value < 0)
    {
        number5.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number5.className = "ilosc";
    }

    if(number6.value < 0)
    {
        number6.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number6.className = "ilosc";
    }

    if(number7.value < 0)
    {
        number7.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number7.className = "ilosc";
    }

    if(number8.value < 0)
    {
        number8.className = "iloscError";
        messages.push("-Nie możesz wpisać tej liczby!");
    }
    else
    {
        number8.className = "ilosc";
    }

    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});
