const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', "Saturday"]

const $ = document
const addNoteBox = $.querySelector(".add-box")
const noteWrapper = $.querySelector('.wrapper')
const popUpBox = $.querySelector('.popup-box')
const addOrUpdateNote = popUpBox.querySelector("button")
const titleInput = popUpBox.querySelector(".title input")
const desInput = popUpBox.querySelector(".description textarea")
const inputAlert = $.querySelector(".alert")

let notesArray = []
let noteTitle, noteDes

let myTime = new Date()
let year = myTime.getFullYear()
let dayNum = myTime.getDay()
let dayOfMounth = myTime.getDate()
let monthsNum = myTime.getMonth()

let isUpdate = false

let mainNoteidForUpdate

function openPopUp() {
  inputAlert.classList.remove("show")
  popUpBox.classList.add("show")
  popUpBox.querySelector('.uil-times').addEventListener("click", () => {
    popUpBox.classList.remove("show")
    isUpdate = false
  })

  if (isUpdate === false) {
    popUpBox.querySelector(".content header p").innerHTML = 'Add new note'
    popUpBox.querySelector(".content form button").innerHTML = 'Add new note'
    emptyInputs()
  } else {
    popUpBox.querySelector(".content header p").innerHTML = 'Update note'
    popUpBox.querySelector(".content form button").innerHTML = 'Update note'

    let mainNoteId = notesArray.findIndex(note => note.id == mainNoteidForUpdate)
    titleInput.value = notesArray[mainNoteId].title
    desInput.value = notesArray[mainNoteId].description
  }
}

function submitNote() {
  if (titleInput.value !== '') {
    inputAlert.classList.remove("show")

    if (isUpdate === false) {
      let newNote = {
        id: notesArray.length + 1,
        title: titleInput.value,
        description: desInput.value
      }
      notesArray.push(newNote)
      setLocalStorage(notesArray)
      generateNote(notesArray)

    } else {

      let mainNoteId = notesArray.findIndex(note => note.id == mainNoteidForUpdate)
      notesArray[mainNoteId].title = titleInput.value
      notesArray[mainNoteId].description = desInput.value

      setLocalStorage(notesArray)
      generateNote(notesArray)

      isUpdate = false
    }

    popUpBox.classList.remove("show")
    emptyInputs()

  } else {
    inputAlert.classList.add("show")
  }
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
            <li onclick="update(${note.id})">
              <i class="uil uil-pen"></i>Edit
            </li>
            <li onclick="Delete(${note.id})">
              <i class="uil uil-trash"></i>Delete
            </li>
          </ul>
        </div>
      </div>
    </li>`)
  })
}

function getLocalStorage() {
  notesArray = JSON.parse(localStorage.getItem('notes')) || []
  generateNote(notesArray)
}

let menuElem
function openSetting(el) {
  menuElem = el
  menuElem.parentNode.classList.toggle('show')
  addNoteBox.addEventListener("click", () => menuElem.parentNode.classList.remove('show'))
}

function Delete(id) {
  let notes = JSON.parse(localStorage.getItem('notes'))
  notesArray = notes

  let mainNote = notesArray.find(note => { return note.id === id })
  _.pull(notesArray, mainNote)
   setLocalStorage(notesArray)
   generateNote(notesArray)
}

function update(id) {
  menuElem.parentNode.classList.remove('show')
  mainNoteidForUpdate = id
  isUpdate = true
  openPopUp()
}

function emptyInputs() {
  titleInput.value = ''
  desInput.value = ''
}

addNoteBox.addEventListener("click", openPopUp)
addOrUpdateNote.addEventListener("click", submitNote)
window.addEventListener('load', getLocalStorage)