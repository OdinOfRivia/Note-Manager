const form = document.querySelector("#add")
const input = document.querySelector("#add-input")
const list = document.querySelector("#list")
const del = document.querySelector("fa fa-times")

form.addEventListener("submit", function (e) {
  e.preventDefault()

  //THIS Puts the input value in a const
  const inputValue = e.target[0].value
  //prevent from, submiting if input is empty
  if (!inputValue) return

  //first method
  // const newLI = document.createElement("li")

  // newLI.innerHTML = `<p>${inputValue}</p> <p>
  //   <i class="fa fa-pencil-square-o"></i>
  //   <i class="fa fa-times"></i></p>
  //   <input type="text" class="edit-note">`
  // list.appendChild(newLI)

  //Second method
  // @@@ THIS DOSNT WORK @@@

  const clonedLi = document.querySelector("#list li").cloneNode(true)
  clonedLi.firstElementChild.textContent = inputValue
  list.appendChild(clonedLi)

  // Third method
  // const li = document.createElement("li")
  // const firstP = document.createElement("p")
  // const secondP = document.createElement("p")
  // const firstIcon = document.createElement("i")
  // const secondIcon = document.createElement("i")
  // const input = document.createElement("input")

  // firstIcon.className = "fa fa-pencil-square-o"
  // secondIcon.className = "fa fa-times"
  // input.className = "edit-note"
  // input.setAttribute("type", "text")

  // firstP.textContent = inputValue

  // secondP.appendChild(firstIcon)
  // secondP.appendChild(secondIcon)
  // li.appendChild(firstP)
  // li.appendChild(secondP)
  // li.appendChild(input)
  // list.appendChild(li)
  //---------------------//
  e.target[0].value = ""
})

//Edditing and Deleting
list.addEventListener("click", (e) => {
  // console.log(e.target.classList)

  //this can log us the class name of the thing we press in this
  //case the class index value in the DOM is [1].

  //click eddit
  if (e.target.classList[1] === "fa-pencil-square-o") {
    //parentNode basically what i does here is when we click
    //the eddit button it takes us into the parent p tag
    // that the eddit icon is inside of!
    let parentP = e.target.parentNode;
    console.dir(parentP);

    //here we just want the icons to disapear when we press them
    //for user experience
    parentP.style.display = "none" //hide second p

    //since parentP is the second p tag inside the li
    // we can celect the the first p tag by using
    // .previousElementSibling, we will call the first p tag note
    // for example
    // .nextElementSibling would be the after
    let note = parentP.previousElementSibling;
    let editInput = parentP.nextElementSibling;
    editInput.style.display = "block"

    //here we simply display in the input field
    //the text content of the first p tag
    editInput.value = note.textContent;

    editInput.addEventListener("keypress", function (e) {
      // 13 --> means enter key in keyCode
      // In other words decimal for carriage return
      if (e.keyCode === 13) {
        if (editInput.value !== "") {
          note.textContent = editInput.value;
        }
        parentP.style.display = "block"
        editInput.style.display = "none"
      }
    });
  }

  //click delete
  if (e.target.classList[1] === "fa-times") {
    const listToDelete = e.target.parentNode.parentNode;
    list.removeChild(listToDelete)
  }
})

//Hide list
const hideItem = document.querySelector("#hide")
hideItem.addEventListener("click", function (e) {
  const label = document.querySelector("label")
  if (this.checked) {
    label.textContent = "Unhide Notes"
    list.style.display = "none"
  } else {
    label.textContent = "Hide Notes"
    list.style.display = "block"
  }
})

// Search filter
//here we select the input field in the form
const seachInput = document.querySelector("#search-note input")

//add eventLisetener to it, we use keyup so every time we 
// release our finger from a key it checks it 

//i tried using click instead and it makes a big difference 
seachInput.addEventListener("keyup", function (e) {
  //We save the searchNote value inside the seachTerm
  // and we force it to be of lower case for UE and
  // because key sensitivity matters when we compare string
  const seachTerm = e.target.value.toLowerCase()

  // Here we celect the ul and get all the li's inside the ul
  const noteList = list.getElementsByTagName("li")

  //we convert the li's to an array so we can use array functions
  Array.from(noteList).forEach(function (note) {
    //here we go into the li then first child which is the first
    //p tag and we acces the text content of it and put it to paraText
    const paraText = note.firstElementChild.textContent

    //Here if we dont find any match the indexOf will return  -1
    // that is why we use NOT !==
    if (paraText.toLowerCase().indexOf(seachTerm) !== -1) {
      //any matching field will be displayed and others wont be displayed
      note.style.display = "block"
    } else {
      note.style.display = "none"
    }
  })
})
