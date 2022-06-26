
/////////////////////////////////   Sourav Pandey   /////////////////////////////////
/////////////////////////////////      1928265      /////////////////////////////////



/////////////////////////////////   given data values   /////////////////////////////////

// The initial data is stored in this data structure.

let givenData = [
  {
    id: "1",
    title: "Book1",
    author: "Author1",
    lender: "UserC",
    borrower: "UserB",
    action: "",
  },
  {
    id: "2",
    title: "Book2",
    author: "Author2",
    lender: "UserC",
    borrower: "-",
    action: "",
  },
  {
    id: "3",
    title: "Book3",
    author: "Author3",
    lender: "UserD",
    borrower: "UserC",
    action: "",
  },
  {
    id: "4",
    title: "Book4",
    author: "Author4",
    lender: "UserA",
    borrower: "-",
    action: "",
  },
  {
    id: "5",
    title: "Book5",
    author: "Author5",
    lender: "UserA",
    borrower: "-",
    action: "",
  },
  {
    id: "6",
    title: "Book6",
    author: "Author6",
    lender: "UserB",
    borrower: "UserA",
    action: "",
  },
];



/////////////////////////////////   global variables   /////////////////////////////////

// Global Variables have been declared here.

let loggedUser = document.getElementById("logged-user");
let flag = 0;



/////////////////////////////////   changeLoggedInUser()   /////////////////////////////////

// This function is called whenever a new user is logged in.
// Then it calls other functions depending on if the logged User is present in the list.

function changeLoggedInUser() {
  let userList = ["UserA", "UserB", "UserC", "UserD"];
  for (let i = 0; i < userList.length; i++) {
    if (loggedUser.value === userList[i]) {
      removeOldTable(givenData);
      flag = 1;
      buildFinalTable(givenData);
      addBookOption();
      return (document.getElementById("logged-in-user-name").innerHTML =
        "Logged in : " + loggedUser.value);
      // break;
    } else {
      document.getElementById("logged-in-user-name").innerHTML =
        "No User logged in.";
    }
  }
  removeOldTable(givenData);
  flag = 0;
  buildBaseTable(givenData);
}




/////////////////////////////////   buildBaseTable()   /////////////////////////////////

// This function builds the basic table when no user is logged in.

function buildBaseTable(workData) {
  let modifyTable = document.getElementById("info-table");
  for (let i = 0; i < workData.length; i++) {
    let row = `<tr>
                  <td>${workData[i].id}</td>
                  <td>${workData[i].title}</td>
                  <td>${workData[i].author}</td>
                  <td>${workData[i].lender}</td>
                  <td>${workData[i].borrower}</td>
                  <td>${workData[i].action}</td>
                </tr>`;
    modifyTable.innerHTML += row;
  }
}




/////////////////////////////////   buildFinalTable()   /////////////////////////////////

// This function builds the detailed table when a legit User logs in.

function buildFinalTable(workData) {
  let modifyTable = document.getElementById("info-table");
  for (let i = 0; i < workData.length; i++) {
    if (
      loggedUser.value != workData[i].lender &&
      loggedUser.value == workData[i].borrower
    ) {
      let row = `<tr>
                <td>${workData[i].id}</td>
                <td>${workData[i].title}</td>
                <td>${workData[i].author}</td>
                <td>${workData[i].lender}</td>
                <td>${workData[i].borrower}</td>
                <td><button type="button" onclick="returnBook(${i})">Return Book</button></td>
             </td>`;
      modifyTable.innerHTML += row;
    } else if (
      loggedUser.value != workData[i].lender &&
      workData[i].borrower == "-"
    ) {
      let row = `<tr>
                <td>${workData[i].id}</td>
                <td>${workData[i].title}</td>
                <td>${workData[i].author}</td>
                <td>${workData[i].lender}</td>
                <td>${workData[i].borrower}</td>
                <td><button type="button" onclick="borrowBook(${i})">Borrow Book</button></td>
             </td>`;
      modifyTable.innerHTML += row;
    } else {
      let row = `<tr>
                <td>${workData[i].id}</td>
                <td>${workData[i].title}</td>
                <td>${workData[i].author}</td>
                <td>${workData[i].lender}</td>
                <td>${workData[i].borrower}</td>
                <td>${workData[i].action}</td>
             </tr>`;
      modifyTable.innerHTML += row;
    }
  }
}




/////////////////////////////////   addBookOption()   /////////////////////////////////

// This function displays the Add Book row in the table when a legit User is logged in.

function addBookOption() {
  let addbook = document.getElementById("info-table");
  let book = `<tr>
                <td>${givenData.length + 1}</td>
                <td><input type='text' id="new-book" placeholder="title"></td>
                <td><input type='text' id="new-author" placeholder="author"></td>
                <td>${loggedUser.value}</td>
                <td>${""}</td>
                <td><button type="button" onclick="addBook();">Add book</button></td>
              </tr>`;
  addbook.innerHTML += book;
}




/////////////////////////////////   addBook()   /////////////////////////////////

// This function adds the new book data into the data structure and displays the 
// newly added row in the table as well. 

function addBook() {
  let newBook = document.getElementById("info-table");
  let newBookName = document.getElementById("new-book").value;
  let newAuthorName = document.getElementById("new-author").value;
  if (newBookName && newAuthorName) {
    let newbook = `<tr>
                      <td>${givenData.length + 1}</td>
                      <td>${newBookName}</td>
                      <td>${newAuthorName}</td>
                      <td>${loggedUser.value}</td>
                      <td>${"-"}</td>
                      <td>${""}</td>
                   </tr>`;
    givenData.push({
      id: givenData.length + 1,
      title: newBookName,
      author: newAuthorName,
      lender: loggedUser.value,
      borrower: "-",
      action: ""
    });
    document.getElementById("info-table").deleteRow(givenData.length);
    newBook.innerHTML += newbook;
    addBookOption();
  }
}




/////////////////////////////////   removeOldTable()   /////////////////////////////////

// This function removes all the rows from the table.

function removeOldTable(workData) {
  let i;
  if (flag == 0) i = workData.length;
  else i = workData.length + 1;
  for (i; i > 0; i--) document.getElementById("info-table").deleteRow(i);
}




/////////////////////////////////   borrowBook()   /////////////////////////////////

// This function is used to borrow a book by the logged user if available.

function borrowBook(i) {
  givenData[i].borrower = loggedUser.value;
  removeOldTable(givenData);
  buildFinalTable(givenData);
  addBookOption();
}




/////////////////////////////////   returnBook()   /////////////////////////////////

// This function is used to return a book by the logged user if it is borrowed by him.

function returnBook(i) {
  givenData[i].borrower = "-";
  removeOldTable(givenData);
  buildFinalTable(givenData);
  addBookOption();
}




/////////////////////////////////   Build Initial Table   /////////////////////////////////

//  Here the table is built for the initial display.

buildBaseTable(givenData)




/////////////////////////////////   End of Code   /////////////////////////////////

/////////////////////////////////   Thank You   /////////////////////////////////