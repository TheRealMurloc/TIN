const ksywka = document.getElementById("ksywka");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");

form.addEventListener("submit", (e) => 
{
	let messages = [];
	if(ksywka.value.length < 3)
	{
		ksywka.className = "error";
		errorMessage1.innerText = "-Ksywka nie może mieć mniej niz 3 znaki!";
		messages.push("-Ksywka nie może mieć mniej niz 3 znaki!");
	}
	
	if(ksywka.value.length > 24)
	{
		ksywka.className = "error";
		errorMessage1.innerText = "-Ksywka nie może mieć więcej niz 24 znaki!";
		messages.push("-Ksywka nie może mieć więcej niz 24 znaki!");
	}
	
	if(!ksywka.value.match("^[a-zA-Z]"))
	{
		ksywka.className = "error";
		errorMessage1.innerText = "Podałeś zły format tekstu!(litery od a do z oraz od A do Z";
		messages.push("-Podałeś zły format tekstu!(litery od a do z oraz od A do Z");
	}
	
	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
