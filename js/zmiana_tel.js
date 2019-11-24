const tel = document.getElementById("tel");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", (e) => 
{
	let messages = [];

	if(!tel.value.match("[0-9]{9}") && !tel.value.match("[0-9]{3}[-][0-9]{3}[-][0-9]{3}"))
	{
		tel.className = "error";
		errorMessage.innerText = "Zły format numeru";
		messages.push("-Został podany zły format numeru telefonu (Możliwe formaty: \"123456789\" lub \"123-456-789\")");
	}
	
	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
