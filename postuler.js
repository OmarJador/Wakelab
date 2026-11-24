import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
const URL = "http://127.0.0.1:3000/api/activites";

mainCode();

async function mainCode() {
  const formNewActivity = document.forms["newActivityForm"];
  manageAuthor();
  submitNewActivity(formNewActivity);
  resetUser();
}

function manageAuthor() {
  const usernameInput = document.getElementById("newActivityAuthor");
  if (localStorage.getItem("auteur")) {
    usernameInput.value = JSON.parse(localStorage.getItem("auteur"));
    usernameInput.readOnly = true;
  }
}

async function submitNewActivity(formNewActivity) {
  formNewActivity.addEventListener("submit", (event) => {
    event.preventDefault();
    let ele = newActivityObject(formNewActivity);
    postObject(ele);

    manageAuthor();
    window.alert("Activité crée avec succées");
    setTimeout((window.location.href = window.location.href));
  });
}

function newActivityObject(formNewActivity) {
  const titre = formNewActivity.newActivityTitle.value;
  const auteur = formNewActivity.newActivityAuthor.value;
  const theme = formNewActivity.newActivityTheme.value;
  const duree = Number(formNewActivity.newActivityDuration.value);
  const objectifs = formNewActivity.newActivityObjectives.value;
  const description = formNewActivity.newActivityDescription.value;

  localStorage.setItem("auteur", JSON.stringify(auteur));

  return {
    titre: titre,
    theme: theme,
    objectifs: objectifs,
    duree: duree,
    description: description,
    auteur: auteur,
  };
}

async function postObject(ele) {
  await axios.post(URL, ele);
}

function resetUser() {
  const resetUserForm = document.getElementById("resetUser");

  resetUserForm.addEventListener("click", (event) => {
    localStorage.removeItem("auteur");
    window.location.href = window.location.href;
  });
}
