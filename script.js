const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Saturday", "Sunday", "Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday']

const $ = document
const addNoteBox = $.querySelector(".add-box")
const noteWrapper = $.querySelector('.wrapper')
const popUpBox = $.querySelector('.popup-box')
const addOrUpdateNote = popUpBox.querySelector("button")
const titleInput = popUpBox.querySelector(".title input")
const desInput = popUpBox.querySelector(".description textarea")

let notesArray = []
let noteTitle, noteDes

let myTime = new Date()

let year = myTime.getFullYear()
let dayNum = myTime.getDay()
let dayOfMounth = myTime.getDate()
let monthsNum = myTime.getMonth()

let isUpdate = false

function openPopUp() {
    popUpBox.classList.add("show")
    popUpBox.querySelector('.uil-times').addEventListener("click", () => { popUpBox.classList.remove("show") })

    if (isUpdate === false) {
        popUpBox.querySelector(".content header p").innerHTML = 'Add new note'
        popUpBox.querySelector(".content form button").innerHTML = 'Add new note'
    } else {
        popUpBox.querySelector(".content header p").innerHTML = 'Update note'
        popUpBox.querySelector(".content form button").innerHTML = 'Update note'
    }
}

function submitNote() {
    let newNote = {
        id: notesArray.length + 1,
        title: titleInput.value,
        description: desInput.value
    }
    notesArray.push(newNote)
    setLocalStorage(notesArray)
    generateNote(notesArray)
    popUpBox.classList.remove("show")
    titleInput.value = ''
    desInput.value = ''
}

function setLocalStorage(notesArray) {
    localStorage.setItem('notes', JSON.stringify(notesArray))
}

function generateNote(notesArray) {
    noteWrapper.querySelectorAll('li').forEach(li => li.remove())

    notesArray.forEach(note => {
        noteWrapper.insertAdjacentHTML("beforeend",
            `<li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span>${note.description}</span>
      </div>
      <div class="bottom-content">
        <span>${months[monthsNum]} ${dayOfMounth}, ${year} (${days[dayNum]})</span>
        <div class="settings">
          <i class="uil uil-ellipsis-h" onclick="openSetting(this)"></i>
          <ul class="menu">
            <li onclick="openUpdate(${note.id})>
              <i class="uil uil-pen"></i>Edit
            </li>
            <li onclick="openDelete(${note.id})">
              <i class="uil uil-trash"></i>Delete
            </li>
          </ul>
        </div>
      </div>
    </li>`)
    })
}

function getLocalStorage() {
    notesArray = localStorageTodos = JSON.parse(localStorage.getItem('notes')) || []
    generateNote(notesArray)
}

function openSetting(el) { el.parentNode.classList.add('show') }

function openDelete(id) {
    let notes = localStorageTodos = JSON.parse(localStorage.getItem('notes'))
    notesArray = notes

    let mainNote = notesArray.findIndex(note => {
        return note.id === id
    })

    notesArray.splice(mainNote, 1)
    setLocalStorage(notesArray)
    generateNote(notesArray)

}


addNoteBox.addEventListener("click", openPopUp)
addOrUpdateNote.addEventListener("click", submitNote)
window.addEventListener('load', getLocalStorage)