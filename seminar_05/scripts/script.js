/*onload is used if the script is decalred at the top of the HTML
window.onload = () => {
    const form = document.getElementById('form');

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const list = document.getElementById('to-do-list');
        const taskText = document.getElementById('task-text').value;

        const listItem = document.createElement('li');
        listItem.classList.add('taskin');
        listItem.innerHTML = `<input class="taskin-checkbox" type="checkbox"><label> ${taskText}</label>`;

        list.appendChild(listItem);

        // clear text
        document.getElementById('task-text').value = "";
    }
    
   form.onsubmit = formSubmitHandler;
};*/


// in the case of the script being at the end of the HTML
setListeners();

function setListeners() {
    document.querySelector('form').addEventListener('submit', onSubmit);
    document.querySelector('ul').addEventListener('click', onTaskClick);
};

function addTask(taskText) {
    // get list
    var list = document.querySelector('ul');
    // create list item
    var listItem = document.createElement('li');
    listItem.classList.add('taskin');
    listItem.innerHTML = `<span id="delete-task">❄</span><input class="taskin-checkbox" type="checkbox"><label> ${taskText}</label>`;

    list.appendChild(listItem);
};

// run addTask method only if the input text is not an empty string
function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById('task-text').value != "")
    {
        addTask(document.getElementById('task-text').value);

         // clear text
        document.getElementById('task-text').value = "";
    }
};

// element - because in the ul we have multiple li
function onTaskClick(element) {
    if (element.target.id == "delete-task")
    {
        deleteTask(element);
    }
    else if (element.target.className == "taskin-checkbox")
    {
        checkTask(element);
    }
};

function deleteTask(element) {
    // we need the parent to be able to remove the current node
    // toRemove -> li
    toRemove = element.target.parentNode;
    // parentNode -> ul
    parentNode = toRemove.parentNode;
    parentNode.removeChild(toRemove);
};

function checkTask(element) {
    // get parent -> li
    parentNode = element.target.parentNode;
    // get input checkbox
    elementLabel = parentNode.querySelector('label');
    elementCheckbox = parentNode.querySelector('input');
    if (elementCheckbox.checked == 1)
    {
        // add class so text is strikethrough
        elementLabel.classList.add('checked');
        // method 2
        //elementLabel.innerHTML = `<s>${elementLabel.innerText}</s>`;
    }
    else
    {
        // remove class
        elementLabel.classList.remove('checked');
        // method 2
        //elementLabel.innerHTML = `${elementLabel.innerText}`;
    }

}