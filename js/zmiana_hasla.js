const haslo = document.getElementById("haslo");
const haslo2 = document.getElementById("haslo2");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");

form.addEventListener("submit", (e) => 
{
	let messages = [];
	
	if(haslo.value === haslo2.value)
	{
		if(haslo.value.length < 8)
		{
			haslo.className = "error";
			haslo2.className = "error";
			errorMessage1.innerText = "Hasło nie może być krótsze niż 8 znaków!";
			messages.push("-Hasło nie może być krótsze niż 8 znaków!");
		}
		
		if(haslo.value.length > 24)
		{
			haslo.className = "error";
			haslo2.className = "error";
			errorMessage1.innerText = "Hasło nie może dłuższe niż 24 znaki!";
			messages.push("-Hasło nie może dłuższe niż 24 znaki!");
		}
	}
	else
	{
		haslo.className = "error";
		haslo2.className = "error";
		errorMessage1.innerText = "Hasła muszą być identyczne!";
		errorMessage2.innerText = "Hasła muszą być identyczne!";
		messages.push("-Hasła muszą być identyczne!");
	}


	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
