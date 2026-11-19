import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
const formNewActivity = document.forms["newActivityForm"];
const URL = "http://127.0.0.1:3000/api/activites";

mainCode();

async function mainCode() {
  //   manageAuthor();
  submitNewActivity();
}

function manageAuthor() {
  const usernameInput = document.getElementById("newActivityAuthor");
  if (localStorage.getItem("auteur")) {
    usernameInput.readOnly = true;
  }
}

async function submitNewActivity() {
  formNewActivity.addEventListener("submit", (event) => {
    event.preventDefault();
    let ele = newActivityObject(formNewActivity);
    postObject(ele);
  });
}

function newActivityObject(formNewActivity) {
  const titre = formNewActivity.newActivityTitle.value;
  const auteur = formNewActivity.newActivityAuthor.value;
  const theme = formNewActivity.newActivityTheme.value;
  const duree = Number(formNewActivity.newActivityDuration.value);
  const objectifs = formNewActivity.newActivityObjectives.value;
  const description = formNewActivity.newActivityDescription.value;

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
