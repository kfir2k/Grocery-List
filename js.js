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
	const doneCheckBox = document.createElement('input');
	doneCheckBox.type = "checkbox"
	const deleteButton = document.createElement('button');
	const listItem = document.createElement('li');

	const listItemText = `${item.text} : ${item.amounts}`;
	deleteButton.textContent = 'X';
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
	
	
	listItem.appendChild(doneCheckBox);
	listItem.appendChild(deleteButton);
	listItem.append(listItemText)




	
}

