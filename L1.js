var fs = require("fs");
/*

List Abstract data type.

in order to start a list

1. need to provide a definition
2. include its properies.
3.operation needed to be performed on it.

Each data stored in a list is called an element
-Element of a list in js can be of any data type

- A list with no element is an empty list
-The number of element in the list keep the size of the list
- You can append an element at the end of the list or add an element to an element in a list with elements that already exist, and add that elemnt at the end of the list.
-Elements are removed or deleted from the list using the removed operation.You can also clear the list to remove all of its elements
-Elements of the list are displayed either by using the toString() method, which shows all the elements or using the getElement() method which will show the current value of the element.
-List have properties to describe their location such as the front and the end.
-Moving from one element to another element in a list is used by calling the next() operation
- Moving backward is by calling the previous() operation
-You can also move to a numbered position by using the moveTo(n), where n specifies the position to be moved to
-The currentPosition property includes the current position in the list.
- Can implement an array to store the list data store


*/

function List() {
  this.listSize = 0;
  this.position = 0;
  this.dataStore = []; // initializing an empty array to store the list.
  this.clear = clear; //clear all ements in data store(list)
  this.find = find; // finds and return the position of an element in the dataStore(list)
  this.toString = toString; // return elements values to strings or simply does display them.
  this.insert = insert; // add a new element to an existing list of element .
  this.append = append; // add an element to end of the dataStore(list).
  this.remove = remove; // remove an element in the dataStore(list).
  this.front = front; // set the current position of the element in the list to be the first.
  this.end = end; // set the current position of the element in the list to be the last.
  this.previous = previous; // returns the previous element in dataStore(list)
  this.next = next; // returns the next element in the dataStore(list).
  this.hasPrevious = hasPrevious; //check if there is a previous element in the dataStore(list)
  this.hasNext = hasNext; //check if there is a next element in the dataStore(list)
  this.length = length; // returns the size of the dataStore(list).
  this.currentPosition = currentPosition; // returns the current position of the element in the dataStore(list).
  this.moveTo = moveTo; // moves the element in the dataStore(list) to a specific location
  this.getElement = getElement; // returns element in the dataStore(list) at their current position.
  this.contains = contains; // determines if elements is in the dataStore(list)
}

// adding elemen at the end of the list.
function append(element) {
  this.dataStore[this.listSize++] = element;
}

// to remove element in array. we need to find that element.
// helper function find will help us do that

function find(element) {
  for (var i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i] === element) {
      console.log("--- Found Element To Remove ----");
      return i;
    }
  }
  // if not found
  return -1;
}

// removing the element in the list
function remove(element) {
  var foundElement = this.find(element);
  if (foundElement > -1) {
    this.dataStore.splice(foundElement, 1);
    this.listSize--;
    return true;
  }
  return false;
}

function length() {
  return this.listSize;
}

function toString() {
  return this.dataStore;
}

// add new element to list.
function insert(element, after) {
  var insertElementAtPosition = this.find(after);
  if (insertElementAtPosition > -1) {
    this.dataStore.splice(insertElementAtPosition + 1, 0, element);
    this.listSize++;
    return true;
  }
  return false;
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.position = 0;
}

function contains(element) {
  for (var i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i] === element) {
      console.log("--Contains element----", this.dataStore[i]);
      return true;
    }
  }
  return false;
}

function moveTo(positionofElement) {
  this.position = positionofElement;
}

function getElement() {
  return this.dataStore[this.position];
}

function previous() {
  return this.dataStore[this.position--];
}

function next() {
  return this.dataStore[this.position++];
}

// check to see if the current element CurrentPosition is at the end of the array (list)

function hasNext() {
  if (this.position > this.listSize - 1) {
    return false;
  } else {
    return true;
  }
}
// check to see if the current element CurrentPosition is at the start of the array(list)
function hasPrevious() {
  if (this.position <= 0) {
    return false;
  } else {
    return true;
  }
}

// set current element position to be the start

function front() {
  this.position = 0;
}

// set current element position to be the end

function end() {
  this.position = this.listSize - 1;
}

function currentPosition() {
  return position;
}

var movies = fs.readFileSync("films.txt", "utf8").split("\n");

// reads data from a file and stores it an array.

function createFile(file) {
  var array = fs.readFileSync(file).split("\n");
  for (var i = 0; i < array.length; i++) {
    arr[i] = arr[i].trim();
  }
  return array;
}

// store or add movie array content in a list
var movieList = new List();
for (var i = 0; i < movies.length; i++) {
  movieList.append(movies[i]);
}

var customers = new List();
// customer object to have name and movie

function Customer(name, movie) {
  this.name = name;
  this.movie = movie;
}

function displayMovieList(list) {
  for (list.front(); list.hasNext(); ) {
    var listItem = list.next();
    if (listItem instanceof Customer) {
      console.log(
        "Name --> : " + listItem.name + ", " + "Name -->" + listItem.movie
      );
    } else {
      console.log(listItem);
    }
  }
}

console.log("---- Avialable Movies ------");
displayMovieList(movieList);

// function that lets customer checkout movie, if movies is available, function will remove the movie from the movie list and add it to the customer list. use the class function contains() to do the checking.

function checkout(name, movie, movieList, customerList) {
  if (movieList.contains(movie)) {
    // instantiate a customer object
    var addMovieToCustomer = new Customer(name, movie);
    // add the movie to the new customer instantiated
    customerList.append(addMovieToCustomer);
    // remove the movie
    customerList.remove(movie);
  } else {
    console.log("movie not currently available sorry");
  }
}

console.log("--- Customer Checking Out Movie -----");
checkout("mary", "300", movieList, customers);
displayMovieList(customers);

console.log("--- Movies Avialable For Rent ----");
displayMovieList(movieList);

var names = new List();
names.append("mary");
names.append("joe");
names.append("luke");
names.append("gabe");
names.append("sam");
console.log("----- Appending Names -----");
console.log(names.toString());

console.log("----- Removing  Name Joe out of the list -----");
names.remove("joe");
console.log(names.toString());

console.log("---  Element at Start of list ----");
names.front();
console.log(names.getElement());

console.log("--- Next  Elements in the list ----");
console.log(names.next());
names.next();

console.log("--- Previous  Elements in the list ----");
names.previous();
console.log(names.previous());

console.log("---  Element at End of list ----");
names.end();
console.log(names.getElement());
