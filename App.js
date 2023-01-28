const form = document.querySelector("#add");
const input = document.querySelector("#add-input");
const list = document.querySelector("#list");
const del = document.querySelector("fa fa-times");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = e.target[0].value;
  //prevent from, submiting if input is empty
  if (!inputValue) return;
  const newLI = document.createElement("li");

  newLI.innerHTML = `<p>${inputValue}</p> <p>
    <i class="fa fa-pencil-square-o"></i>
    <i class="fa fa-times"></i></p>
    <input type="text" class="edit-note">`;
  list.appendChild(newLI);

  e.target[0].value = "";
});

del.addEventListener("click", function (e) {
  
});
