const komentarz = document.getElementById("komentarz");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", (e) => 
{
	let messages = [];

	if(komentarz.value === "")
	{
		errorMessage.innerText = "Feedback nie może być pusty!";
		messages.push("-Feedback nie może być pusty!");
	}
	
	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
