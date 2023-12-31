"use strict";


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


window.addEventListener("load", (listLoded) => {

	if (listArray.length > 0) {
		console.log("there is a an exsitting arry");
		for (let item of listArray) {
			addItemToList(item);

			console.log(item);
			if (item.checkFlag) {
				let checkBox = document.querySelectorAll(`input[type='checkbox']`)
				let li = document.querySelectorAll("li")
				li = li[li.length - 1]
				li.classList.add("overline")

				checkBox = checkBox[checkBox.length - 1]
				checkBox.checked = true
				console.log(checkBox);
				console.log(item.checkFlag);

			}


		}
	}
});




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
	const container = document.createElement("div")
	container.classList.add("checkbox-text-container")

	const doneCheckBox = document.createElement('input');
	doneCheckBox.type = "checkbox"
	const deleteButton = document.createElement('div');
	deleteButton.classList.add("garbageCan")
	const listItem = document.createElement('li');

	const listItemText = `${item.text} : ${item.amounts}`;
	deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
	groceryList.appendChild(listItem);

	deleteButton.addEventListener('click', function () {
		listArray = listArray.filter(i => i !== item);
		saveToLocalStorage();
		listItem.remove();
	});

	doneCheckBox.addEventListener('click', function () {
		if (doneCheckBox.checked) {
			console.log("checked");
			listItem.classList.add("overline");
			item.checkFlag = true
			saveToLocalStorage();
			console.log(listArray);
		} else {
			listItem.classList.remove("overline");

		}


	});



	container.appendChild(doneCheckBox)
	container.append(listItemText)
	listItem.appendChild(container);
	listItem.appendChild(deleteButton);





}

