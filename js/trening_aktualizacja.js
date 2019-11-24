const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");

form.addEventListener("submit", (e) => 
{
	let messages = [];

	if(number1.value < 0)
	{
		number1.className = "iloscError";
		messages.push("-Nie możesz wpisać ujemnej liczby!");
	}
	if(number2.value < 0)
	{
		number2.className = "iloscError";
		messages.push("-Nie możesz wpisać ujemnej liczby!");
	}
	if(number3.value < 0)
	{
		number3.className = "iloscError";
		messages.push("-Nie możesz wpisać ujemnej liczby!");
	}
	
	if(messages.length > 0)
	{	
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
