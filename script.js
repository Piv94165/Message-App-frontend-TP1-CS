// let baseUrl =
//   "https://95764c3a-e7a3-4cf1-84a4-be939c87c2bf-00-ycc4gkid4zal.worf.replit.dev/";
let baseUrl = "https://tp-archi-app-partie-2-camille-1.onrender.com/";
msgs = [{ msg: "Hello World" }, { msg: "Blah Blah" }, { msg: "I love cats" }];

function getBaseUrl() {
  path = document.getElementById("store-input").value;
  if (path !== "") {
    baseUrl = path;
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
    }
  }
  getRemoteMessages();
}

function deleteMessage(index) {
  fetch(baseUrl + "msg/del/" + index).then(function (response) {
    return response.json();
  });
}

function update(newNotes) {
  const list = document.getElementById("notes-list");
  document.getElementById("notes-list").innerHTML = "";
  newNotes.forEach(function (element) {
    const li = document.createElement("li");
    li.textContent = element.msg;
    let deleteButton = document.createElement("button");
    deleteButton.className = "small-button delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      // Supprimer l'élément de la liste lorsqu'on clique sur le bouton "Supprimer"
      deleteMessage(msgs.indexOf(element));
      li.remove();
    });
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

function addNote() {
  const noteArea = document.getElementById("note-area");
  const newNote = noteArea.value;
  if (newNote !== "") {
    fetch(baseUrl + "msg/post/" + escape(newNote))
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
  fetch(baseUrl + "msg/getAll")
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
