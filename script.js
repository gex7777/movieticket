const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
populateUI();
//save name and price in local storage
function saveNameAndPrice(movieIndex, price) {
	localStorage.setItem("selectedMovie", movieIndex);
	localStorage.setItem("price", price);
}
//to calculate count and total
function updateSelectedSeats() {
	selectedSeats = document.querySelectorAll(".row .seat.selected");
	const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
	localStorage.setItem("seatIndex", JSON.stringify(seatIndex));
	countSeats = selectedSeats.length;
	count.innerText = countSeats;
	total.innerText = countSeats * ticketPrice;
}
//function to populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}
	const movieSelected = localStorage.getItem("selectedMovie");
	if (movieSelected !== null) {
		movieSelect.selectedIndex = movieSelected;
	}
}
//movie select event
movieSelect.addEventListener("change", e => {
	ticketPrice = e.target.value;
	saveNameAndPrice(e.target.selectedIndex, e.target.value);

	updateSelectedSeats();
});
//seat click event
container.addEventListener("click", e => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");
	}
	updateSelectedSeats();
});
//inintial count and total
updateSelectedSeats();
