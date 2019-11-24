const email = document.getElementById("email");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", (e) => 
{
	let messages = [];

	if(!email.value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"))
	{
		email.className = "error";
		errorMessage.innerText = "Podałeś zły adres email";
		messages.push("-Został podany zły adres email");
	}
	
	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
