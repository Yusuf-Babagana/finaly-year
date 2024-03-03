const form = document.querySelector(".needs-validation");
const usernameInput = document.getElementById('username');
const exisitingUsernames = JSON.parse(document.getElementById("hiddenUsers").dataset.usernames);

form.addEventListener(
  "submit",
  (event) => {
    if (!isUsernameAvailable(event.target.username.value) || !form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  },
  false
);


function isUsernameAvailable(value) {
  let invalidFbDiv = document.querySelector(".invalid-feedback");
  if (existingUsernames.includes(value)) {
    usernameInput.classList.remove("is-valid");
    invalidFbDiv.textContent = "This username is already taken.";
    usernameInput.classList.add("is-invalid");
    usernameInput.setCustomValidity("Invalid username");
    return false;
  };
  if (/\W+/.test(value)) {
    invalidFbDiv.textContent = "";
    return false;
  }
  usernameInput.setCustomValidity("");
  usernameInput.classList.remove("is-invalid");
  usernameInput.classList.add("is-valid");
  return true;
}