const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const notesWrapper = document.querySelector(".wrapper")
const addNewNoteBox = document.querySelector(".add-box")
const popupBox = document.querySelector(".popup-box")
const descriptionInput = document.querySelector(".description textarea")
const titleInput = document.querySelector(".title input")
const addOrUpdateNoteBtn = document.querySelector(".popup .content form button")
const noteStatus = document.querySelector(".note-status")

let notesArray = []
let isUpdating = false
let mainIndexForUpdate

let Time = new Date()
let dayIndex = Time.getDay()
let monthsIndex = Time.getMonth()
let date = Time.getDate()
let year = Time.getFullYear()


function setNewNote() {
  if (!isUpdating) {

    if (titleInput.value === "" && descriptionInput.value === "") {
      alert("Please fill the inputs")
    } else {
      let newNote = {
        title: titleInput.value,
        des: descriptionInput.value,
        date: `${months[monthsIndex]} ${date}, ${year}, (${weekday[dayIndex]})`
      }
      notesArray.push(newNote)
      setLocal(notesArray)
      closePopUp()
      generateNote()
    }
  } else {
    notesArray[mainIndexForUpdate].title = titleInput.value
    notesArray[mainIndexForUpdate].des = descriptionInput.value
    isUpdating = false
    setLocal(notesArray)
    closePopUp()
    generateNote()
  }
}

function generateNote() {
  document.querySelectorAll("li").forEach(item => item.remove())

  notesArray.forEach((item, index) => {
    notesWrapper.insertAdjacentHTML('beforeend', `
            <li class="note">
        <div class="details">
          <p>${item.title}</p>
          <span>${item.des}</span>
        </div>
        <div class="bottom-content">
          <span>${item.date}</span>
          <div class="settings" onclick="openMenu(this)">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="editNote(${index})">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="deleteNote(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
            `)
  })
}

function setLocal(notesArray) {
  localStorage.setItem('notes', JSON.stringify(notesArray))
}

function editNote(index) {
  isUpdating = true
  openPopUp()
  let mainNote = notesArray[index]
  titleInput.value = mainNote.title
  descriptionInput.value = mainNote.des
  mainIndexForUpdate = index
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes"))
  notes.splice(index, 1)
  notesArray = notes
  localStorage.setItem("notes", JSON.stringify(notes))
  generateNote()
}

function openPopUp() {
  if (!isUpdating) {
    popupBox.classList.add("show")
    noteStatus.innerHTML = "New Note"
    addOrUpdateNoteBtn.innerHTML = "Add Note"
  } else {
    popupBox.classList.add("show")
    noteStatus.innerHTML = "Edit Note"
    addOrUpdateNoteBtn.innerHTML = "Update Note"
  }
}

function closePopUp() {
  popupBox.classList.remove("show")
  titleInput.value = ""
  descriptionInput.value = ""
  isUpdating = false
}

function openMenu(el) {
  el.classList.add("show")
  document.addEventListener("click", (e) => {
    if (!el.contains(e.target)) {
      el.classList.remove("show");
    }
  });
}

addNewNoteBox.addEventListener("click", openPopUp)
window.addEventListener("load", () => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesArray = notes
  generateNote()
})