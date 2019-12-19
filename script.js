// click on close buttom to hide current list item
var i = 0;

function removeItem(id) {
  var itemId = id.split('-')[1];
  removeFromLocalStorage(itemId);
  document.getElementById(itemId).remove();
}

// Add a "checked" symbol when clicking on a list item
function markChecked(id) {
  var item = document.getElementById(id);
  item.classList.toggle('checked');
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById('myInput').value;
  var itemId = Date.now();
  if (inputValue === '') {
    alert('You must write something!');
  } else {
    createListItem(itemId, inputValue);
    saveToLocalStorage(itemId, inputValue);
  }
  document.getElementById('myInput').value = '';
}

function saveToLocalStorage(id, value) {
  window.localStorage.setItem(id, value);
}

function removeFromLocalStorage(id) {
  window.localStorage.removeItem(id);
}

function loadFromLocalStorage() {
  if (window.localStorage.length > 0) {
    var localItems = window.localStorage;
    console.log(Object.keys(localItems));
    var i = 0;
    Object.keys(localItems).forEach(key => {
      console.log(i++);
      createListItem(key, window.localStorage.getItem(key));
    });
  }
}

function createListItem(id, value) {
  var li = document.createElement('li');
  var myUl = document.getElementById('myUL');
  li.appendChild(document.createTextNode(value));
  li.setAttribute('id', id);
  li.setAttribute('onclick', `markChecked(this.id)`);

  var span = document.createElement('span');
  var txt = document.createTextNode('delete_forever');
  span.setAttribute('id', `delete-${id}`);
  span.setAttribute('onclick', `removeItem(this.id)`);
  span.className = 'material-icons close';
  //   span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);
  console.log(li);

  myUl.appendChild(li);
}

function init() {
  loadFromLocalStorage();
}

if (document.readyState === 'complete') {
  init();
}
