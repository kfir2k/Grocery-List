const input = document.getElementById("input");
const groceryList = document.getElementById("groceryList");
let listArray = JSON.parse(localStorage.getItem("list")) || [];

let clear = document.getElementById("clear").addEventListener("click", function (event) {
	listArray = []
	localStorage.clear();
	const liElements = document.querySelectorAll("li")
	for (let i of liElements) {
		i.remove()
	}

	//console.log("logged", liElements);

})




const myForm = document.getElementById("myForm").addEventListener("submit", function (event) {
	event.preventDefault()
	let data = input.value


	let item = {
		text: data.replace(/[0-9]/g, ''),
		amounts: data.replace(/\D/g, '')
	}

	data = ""
	listArray.push(item)
	console.log(listArray);


	saveToLocalStorage();

	addItemToList(item);

	input.value = '';


})


function saveToLocalStorage() {
	localStorage.setItem("list", JSON.stringify(listArray));
}



function addItemToList(item) {
	const doneCheckBox = document.createElement('input');
	doneCheckBox.type = "checkbox"
	
	const deleteButton = document.createElement('button');
	const listItem = document.createElement('li');


	listItem.textContent = `${item.text} : ${item.amounts}`;
	deleteButton.textContent = '-';


	deleteButton.addEventListener('click', function () {
		listArray = listArray.filter(i => i !== item);
		saveToLocalStorage();
		listItem.remove();
	});

	doneCheckBox.addEventListener('change', function () {


		listItem.classList.toggle("overline");

		//if (this.checked) {
		//	item.checked = true
		//	listItem.classList.toggle("overline");

		//} else {
		//	item.checked = false
		//	listItem.classList.toggle("none");
		//}


		//listArray = listArray.filter(i => i !== item);
		
		saveToLocalStorage();
		
	});
	


	listItem.appendChild(doneCheckBox);
	groceryList.appendChild(listItem);
	listItem.appendChild(deleteButton);



	
}

