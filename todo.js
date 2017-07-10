//Define commonly used items

var inputTask = document.getElementById("addItem");
var addButton = document.getElementById("addButton1");
var incomplete = document.getElementById("incomplete");
var complete = document.getElementById("complete");



// Create a new item for the incomplete after pressing Add or hitting enter

var createTask = function(task){

	//create each part of the item
	var listItem = document.createElement("li");
	var inputCheck = document.createElement("input");
	var label = document.createElement("label");
	var buttonEdit = document.createElement("button");
	var buttonDelete = document.createElement("button");
	var editInput = document.createElement("input");

	// Change the types of the items 
	inputCheck.type = "checkbox";
	editInput.type = "text";
	buttonEdit.innerText = "Edit";
	buttonDelete.innerText = "Delete";
	buttonEdit.className = "edit";
	buttonEdit.id = 'editt';
	buttonDelete.className = "delete";
	editInput.className = "editor";
	editInput.id = 'edittor';

	// The label and text value both become the value in the add item field

	label.innerText = task; 
	editInput.value = task;


  //The created items are appended to the list item  
	listItem.appendChild(inputCheck);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(buttonEdit);
	listItem.appendChild(buttonDelete);
    
  // Event Listener for the key press  
    editInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        buttonEdit.click();
    }
  });
      
	return listItem;


};

// Add the item to the incomplete list 

var addItem = function(){
	var value1 = createTask(inputTask.value);
	console.log(value1);
	incomplete.appendChild(value1);
	inputTask.value = "";
	TaskEvents(value1, taskCompleted);
};

// Add the item when there is a click on add button 
addButton.addEventListener("click", addItem);


// Move checked items to the complete section 

var taskCompleted = function() {
  var listItem = this.parentNode;
  listItem.className += "complete1";
  complete.appendChild(listItem);
  TaskEvents(listItem, taskIncomplete);

}



// Edit the text when pressing the edit button. 

var editTask = function() {

  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete the item when pressing the Delete button 
var deleteTask = function(){
	var lItem = this.parentNode;
	var ul = lItem.parentNode;
	ul.removeChild(lItem);
};

// Mark a task as incompleted
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incomplete.appendChild(listItem);
  TaskEvents(listItem, taskCompleted);
}


var TaskEvents = function(taskItem, checkBoxEventHandler) {
  //select children
  var checkBox = taskItem.querySelector("input[type=checkbox]");
  var editButton = taskItem.querySelector("button.edit");
  var deleteButton = taskItem.querySelector("button.delete");
  
  //click triggers
  editButton.onclick = editTask;  
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;

}

// Listen for keyup on the add item button 
document.getElementById("addItem")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("addButton1").click();
    }
});
