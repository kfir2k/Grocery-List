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


})


window.addEventListener("load", (listLoded) => {

	if (listArray.length > 0) {

		for (let item of listArray) {
			addItemToList(item);


			if (item.checkFlag) {
				let checkBox = document.querySelectorAll(`input[type='checkbox']`)
				let li = document.querySelectorAll("li")
				let span = document.querySelectorAll("span")
				li = li[li.length - 1]
				span = span[span.length - 1]
				li.classList.add("overline")
				span.classList.add("overline")


				checkBox = checkBox[checkBox.length - 1]
				checkBox.checked = true


			}


		}
	}
});



function createAllItemsAfterEdit() {
	const liElements = document.querySelectorAll("li")
	for (let i of liElements) {
		i.remove()
	}


	if (listArray.length > 0) {

		for (let item of listArray) {
			addItemToList(item);


			if (item.checkFlag) {
				let checkBox = document.querySelectorAll(`input[type='checkbox']`)
				let li = document.querySelectorAll("li")
				let span = document.querySelectorAll("span")
				li = li[li.length - 1]
				span = span[span.length - 1]
				li.classList.add("overline")
				span.classList.add("overline")


				checkBox = checkBox[checkBox.length - 1]
				checkBox.checked = true


			}


		}
	}
}





const myForm = document.getElementById("myForm").addEventListener("submit", function (event) {
	event.preventDefault()
	let data = input.value


	let item = {
		text: data.replace(/[0-9]/g, ''),
		amounts: data.replace(/\D/g, '')
	}

	data = ""
	listArray.push(item)

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
	const editBtn = document.createElement("div")
	editBtn.classList.add(".pen")

	const listItem = document.createElement('li');

	const listItemText = `${item.text} `;
	const listItemAmount = `${item.amounts}`
	const span = document.createElement("span")


	deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
	editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>';
	groceryList.appendChild(listItem);

	deleteButton.addEventListener('click', function () {
		listArray = listArray.filter(i => i !== item);
		saveToLocalStorage();
		listItem.remove();
	});

	editBtn.addEventListener('click', function () {
		let editPromptValue = prompt("עריכת טקסט של שורה")
		

		if (editPromptValue === "" | editPromptValue === null) {
			return
		} else {
			let editedItem = {
				text: editPromptValue.replace(/[0-9]/g, ''),
				amounts: editPromptValue.replace(/\D/g, '')
			}


			let editedItemText = `${editedItem.text} `;
			let editedListItemAmount = `${editedItem.amounts}`;

			let specificItemIndex = listArray.findIndex(i => i === item);
			listArray[specificItemIndex] = editedItem;


			saveToLocalStorage()
			createAllItemsAfterEdit()

		}

		



	})



	doneCheckBox.addEventListener('click', function () {
		if (doneCheckBox.checked) {

			listItem.classList.add("overline");
			span.classList.add("overline")
			item.checkFlag = true
			saveToLocalStorage();

		} else {
			listItem.classList.remove("overline");
			span.classList.remove("overline");
			item.checkFlag = false
			saveToLocalStorage();

		}


	});


	container.appendChild(doneCheckBox)
	container.append(listItemText)
	span.append(listItemAmount)
	container.append(span)
	listItem.appendChild(container);
	listItem.appendChild(editBtn);
	listItem.appendChild(deleteButton);






}

