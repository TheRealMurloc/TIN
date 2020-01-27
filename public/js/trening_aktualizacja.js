const numbers = document.getElementsByName("ilosc");
const form = document.getElementById("form");
const errorSummary = document.getElementById("errorSummary");

form.addEventListener("submit", (e) => 
{
	let messages = [];
	for(let i=0; i<numbers.length; i++)
	{
		if(numbers[i].value < 0)
		{
			numbers[i].className = "iloscError";
			messages.push("-Nie możesz wpisać ujemnej liczby!");
		}
	}
	if(messages.length > 0) {
		messages.unshift("Formularz został błędnie wypełniony:");
		errorSummary.innerText = messages.join("\n");
		e.preventDefault();
	}
});
