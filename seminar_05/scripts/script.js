window.onload = () => {
    const form = document.getElementById('form')

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
};
