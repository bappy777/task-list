// Define All Vars
const form = document.querySelector('#form');
const inputTask = document.querySelector('#inputTask');
const filter = document.querySelector('#filter');
const collection = document.querySelector('.collection');
const clearTask = document.querySelector('#clear-tasks');

// LoadAllEventListeners function
loadAllEventListeners();

function loadAllEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTaskFromLs);

    // addTask
    form.addEventListener('submit', addTask);

    // removeTask
    collection.addEventListener('click', removeTask);

    // clearTasks
    clearTask.addEventListener('click', clearTasks);

    // filterTasks
    filter.addEventListener('keyup', filterTasks);
}

// getTaskFromLs
function getTaskFromLs() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (myValue) {
        // create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(myValue));

        // create link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'

        // append link to li
        li.appendChild(link);

        // append li to collection
        collection.appendChild(li);
    });

}

// addTask functio
function addTask(e) {
    // inputValue
    if (inputTask.value === '') {
        alert('Please Add A Task');
    } else {
        alert('Your Task Added');
    }

    // create li
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(inputTask.value));

    // create link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // append link to li
    li.appendChild(link);

    // append li to collection
    collection.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(inputTask.value);

    inputTask.value = '';

    e.preventDefault();
}

// store in local storage
function storeTaskInLocalStorage(myValue) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(myValue);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// removeTask function
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }

    // remove from local storage
    removeTasksFromLocalStorage(e.target.parentElement.parentElement);

    e.preventDefault();
}

// remove from local storage function

function removeTasksFromLocalStorage(taskItemValue) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (myValue, index) {
        if (taskItemValue.textContent === myValue) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clearTasks function
function clearTasks(e) {
    while (collection.firstChild) {
        collection.removeChild(collection.firstChild);
    }

    // clear from ls
    clearFromLocalStorage();

    e.preventDefault();
}

function clearFromLocalStorage() {
    localStorage.clear();
}

// filterTasks function
function filterTasks(e) {

    const filterTask = e.target.value.toLowerCase();

    const collectionItem = document.querySelectorAll('.collection-item');

    collectionItem.forEach(function (myValue) {
        const collectionItemChild = myValue.firstChild.textContent;
        if (collectionItemChild.toLowerCase().search(filterTask) != -1) {
            myValue.style.display = 'block';
        } else {
            myValue.style.display = 'none';
        }
    });

    console.log(e.target.value.toLowerCase());
}