// get items from localStorage

let existingTask = localStorage.getItem("Task");
if (existingTask) {
    existingTask = JSON.parse(existingTask);
}
else {
    existingTask = {};
}


let wrapperDiv = document.createElement("div");
wrapperDiv.className = "wrapperDiv";

const bodyLastChild = document.body.lastElementChild;
document.body.insertBefore(wrapperDiv, bodyLastChild);


let createExtraContainerFunction = (mainInputValue) => {

    let mainInput = document.querySelector("#inputText").value;

    let columnContainer = document.createElement("div");
    columnContainer.className = "column";
    wrapperDiv.appendChild(columnContainer);

    let title = document.createElement("div");
    title.className = "title";
    title.innerText = mainInput;
    columnContainer.appendChild(title);

    let innerForm = document.createElement('form');
    innerForm.setAttribute('class', 'innerForm');

    let p = document.createElement("p");
    innerForm.appendChild(p);

    let innerInput = document.createElement('input');
    innerInput.setAttribute('type', 'text');
    innerInput.setAttribute('class', 'innerInput');
    innerInput.setAttribute('placeholder', 'Write task name here...');
    p.appendChild(innerInput);

    let innerSubmit = document.createElement('input');
    innerSubmit.setAttribute('type', 'submit');
    innerSubmit.setAttribute('hidden', 'true');
    p.appendChild(innerSubmit);

    columnContainer.appendChild(innerForm);

    // inner Form submit function
    innerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let innerFormInputValue = innerInput.value;

        let input_ButtonDiv = document.createElement("div");
        input_ButtonDiv.className = "box";

        let inputbox = document.createElement("input");
        inputbox.setAttribute('type', 'text');
        inputbox.setAttribute('class', 'editInput');
        // inputbox.setAttribute('value', '');
        inputbox.setAttribute('disabled', 'true');
        // assigning innerform value to the disabled input value
        inputbox.value = innerFormInputValue;

        input_ButtonDiv.appendChild(inputbox);

        columnContainer.appendChild(input_ButtonDiv);

        let btnContainer = document.createElement("span");
        btnContainer.className = "btnContainer";
        // edit button
        let editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'editBtn');
        editBtn.innerHTML = "Edit";
        editBtn.setAttribute('onclick', 'editTask(this)');
        // delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deleteBtn');
        deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute('onclick', 'deleteTask(this)');

        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(editBtn);
        input_ButtonDiv.appendChild(btnContainer);

        // set items in localStorage

        let objectKey = mainInput;
        // now we have to create a key for object that will further contain an array of tasks
        if(!existingTask[objectKey]){
            existingTask[objectKey] = [];
        }
        existingTask[objectKey].push(innerFormInputValue);
        
        localStorage.setItem('Task', JSON.stringify(existingTask));


        e.target.reset();
    })

}

let deleteTask = () => {
    let box = document.querySelector(".box");
    box.remove(this);
    console.log("delete function called", this);

}

let createColumn = document.querySelector("#createColumn");
createColumn.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputValueOfMainForm = document.querySelector("#inputText").value;
    createExtraContainerFunction(inputValueOfMainForm); // function definition or whatever
    e.target.reset();
})
