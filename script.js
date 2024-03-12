function fact(n) {
  if (n === 1) {
    return 1;
  }
  return n * fact(n - 1);
}

function applique(f, tab) {
  return tab.map(f);
}

console.log(fact(6));
console.log(applique(fact, [1, 2, 3, 4, 5, 6]));
console.log(
  applique(
    function (n) {
      return n + 1;
    },
    [1, 2, 3, 4, 5, 6],
  ),
);

let pathToMsgs =
  "https://95764c3a-e7a3-4cf1-84a4-be939c87c2bf-00-ycc4gkid4zal.worf.replit.dev/";
msgs = [{ msg: "Hello World" }, { msg: "Blah Blah" }, { msg: "I love cats" }];

function getPathToMsgs() {
  path = document.getElementById("store-area").value;
  if (path !== "") {
    pathToMsgs = path;
    if (!pathToMsgs.endsWith("/")) {
      pathToMsgs += "/";
    }
  }
  console.log("path = ", pathToMsgs, " END");
}

function update(newNotes) {
  const list = document.getElementById("notes-list");
  document.getElementById("notes-list").innerHTML = "";
  newNotes.forEach(function (element) {
    const li = document.createElement("li");
    li.textContent = element.msg;
    list.appendChild(li);
  });
}

function addNote() {
  getPathToMsgs();
  const noteArea = document.getElementById("note-area");
  const newNote = noteArea.value;
  if (newNote !== "") {
    fetch(pathToMsgs + "msg/post/" + escape(newNote))
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (DOMStringList.length < data.newMessagePosition) {
          //new messages have to be fetched
          getRemoteMessages();
        } else {
          msgs.push({ msg: newNote });
          update(msgs);
        }
        noteArea.value = "";
      });
  }
}

function getRemoteMessages() {
  fetch(pathToMsgs + "msg/getAll")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      msgs = data.msgs;
      update(msgs);
    });
}

getRemoteMessages();

// to add a button to delete a message
// https://www.w3schools.com/howto/howto_js_todolist.asp
