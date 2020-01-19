const nazwa = document.getElementById("nazwa");
const haslo = document.getElementById("haslo");
const haslo2 = document.getElementById("haslo2");
const imie = document.getElementById("imie");
const nazwisko = document.getElementById("nazwisko");
const ksywka = document.getElementById("ksywka");
const email = document.getElementById("email");
const telefon = document.getElementById("telefon");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");
const errorMessage3 = document.getElementById("errorMessage3");
const errorMessage4 = document.getElementById("errorMessage4");
const errorMessage5 = document.getElementById("errorMessage5");
const errorMessage6 = document.getElementById("errorMessage6");
const errorMessage7 = document.getElementById("errorMessage7");
const errorMessage8 = document.getElementById("errorMessage8");

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

    if(imie.value.length < 3 || imie.value.length > 24 )
    {
        imie.className = "error";
        errorMessage4.innerText = "Imie musi mieć pomiędzy 3 a 24 znaki!";
        messages.push("-Imie musi mieć pomiędzy 3 a 24 znaki!");
    }
    else
    {
        imie.className = "form";
        errorMessage4.innerText = "";
    }

    if(nazwisko.value.length < 3 || nazwisko.value.length > 24 )
    {
        nazwisko.className = "error";
        errorMessage5.innerText = "Nazwisko musi mieć pomiędzy 3 a 24 znaki!";
        messages.push("-Nazwisko musi mieć pomiędzy 3 a 24 znaki!");
    }
    else
    {
        nazwisko.className = "form";
        errorMessage5.innerText = "";
    }

    if(ksywka.value.length < 3 || ksywka.value.length > 16 )
    {
        ksywka.className = "error";
        errorMessage6.innerText = "Ksywka musi mieć pomiędzy 3 a 16 znaków!";
        messages.push("-Ksywka musi mieć pomiędzy 3 a 16 znaków!");
    }
    else
    {
        ksywka.className = "form";
        errorMessage6.innerText = "";
    }

    if(!email.value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"))
    {
        email.className = "error";
        errorMessage7.innerText = "Podałeś zły adres email";
        messages.push("-Został podany zły adres email");
    }
    else
    {
        email.className = "form";
        errorMessage7.innerText = "";
    }

    if(!telefon.value.match("[0-9]{9}") && !telefon.value.match("[0-9]{3}[-][0-9]{3}[-][0-9]{3}"))
    {
        telefon.className = "error";
        errorMessage8.innerText = "Zły format numeru";
        messages.push("-Został podany zły format numeru telefonu (Możliwe formaty: \"123456789\" lub \"123-456-789\")");
    }
    else
    {
        telefon.className = "form";
        errorMessage8.innerText = "";
    }
    
    if(messages.length > 0)
    {
        messages.unshift("Formularz został błędnie wypełniony:");
        errorSummary.innerText = messages.join("\n");
        e.preventDefault();
    }
});
