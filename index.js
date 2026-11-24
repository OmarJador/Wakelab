import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const URL = "http://127.0.0.1:3000/api/activites";

mainCode();

async function mainCode() {
  // const detailsForm = document.forms["detailsForm"];
  const activities = await fetchData();
  afficherLesCartes(activities);
  refreshButtonEvent();
  filterActivities(activities);
  searchActivity(activities);
  modifyDetails();
  closeDetailsEvent();
  submitChanges();
  deleteActivity(activities);
  // console.log(detailsForm)
}

async function fetchData() {
  const response = await axios.get(URL);
  const activities = response.data;
  return activities;
}

function afficherLesCartes(activities) {
  const activityContainer = document.getElementById("activitiesContainer");
  activityContainer.innerHTML = ``;
  activities.forEach((activity) => {
    let carte = `<div class="col-12 col-md-6 col-xl-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body d-flex flex-column">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <span class="badge text-bg-primary"> ${activity.theme} </span>

                      <small class="text-body-secondary"> ${activity.duree} min </small>
                    </div>

                    <h4 class="card-title fg-success">${activity.titre}</h4>

                    <p class="card-text text-body-secondary">
                      ${activity.objectifs}
                    </p>

                    <div
                      class="mt-auto d-flex justify-content-between align-items-center pt-3"
                    >
                      <small class="text-body-secondary">
                        Par ${activity.auteur}
                      </small>

                      <button
                          class="detailButtons btn btn-warning btn-sm"
                          data-bs-toggle="dialog"
                          data-bs-target="#activityDialog"
                          data-id="${activity.id}">
                          Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

    activityContainer.innerHTML += carte;
  });
  const detailButtons = document.querySelectorAll(".detailButtons");
  fillDetailsModal(detailButtons, activities);
}

function refreshButtonEvent() {
  const refreshButton = document.getElementById("refreshActivities");
  refreshButton.addEventListener("click", (event) => {
    window.location.href = window.location.href;
  });
}

function filterActivities(activities) {
  const activityCategorySelect = document.getElementById("categoryFilter");
  activityCategorySelect.addEventListener("change", (event) => {
    const value = activityCategorySelect.value;
    const activitiesOfCategory = activities.filter((ele) => ele.theme == value);
    if (value == "tous") {
      afficherLesCartes(activities);
    } else {
      afficherLesCartes(activitiesOfCategory);
    }
  });
}

function searchActivity(activities) {
  const searchBar = document.getElementById("activitySearch");

  searchBar.addEventListener("keyup", (event) => {
    const value = searchBar.value;
    const searchedActivities = activities.filter((ele) =>
      ele.titre.toLowerCase().includes(value.toLowerCase()),
    );
    afficherLesCartes(searchedActivities);
  });
}

function fillDetailsModal(detailButtons, activites) {
  const detailsModal = document.forms["detailsForm"];

  const badge = modalThemeBadge;
  const id = modalActivityId;
  const titre = detailsForm.modalTitle;
  const theme = detailsForm.modalTheme;
  const duree = detailsForm.modalDuration;
  const objectifs = detailsForm.modalObjectives;
  const description = detailsForm.modalDescription;
  const auteur = detailsForm.modalAuthor;
  const creation = detailsForm.modalCreatedAt;
  const modification = detailsForm.modalUpdatedAt;

  detailButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const activity = activites.find((ele) => ele.id == button.dataset.id);
      detailsForm
        .querySelectorAll("input")
        .forEach((ele) => (ele.disabled = true));
      detailsForm
        .querySelectorAll("textarea")
        .forEach((ele) => (ele.disabled = true));
      badge.innerText = activity.theme;
      id.dataset.id = activity.id;
      titre.value = activity.titre;
      theme.value = activity.theme;
      duree.value = activity.duree;
      objectifs.value = activity.objectifs;
      description.value = activity.description;
      auteur.value = activity.auteur;
      creation.value = activity.createdAt.substring(0, 10);
      modification.value = activity.updatedAt.substring(0, 10);
    }),
  );
}

function modifyDetails() {
  const modifyButton = document.getElementById("modifyActivityBtn");
  const saveButton = document.getElementById("saveActivityBtn");
  const cancelButton = document.getElementById("cancelEditBtn");

  modifyButton.addEventListener("click", (event) => {
    detailsForm
      .querySelectorAll("input")
      .forEach((ele) => (ele.disabled = false));
    detailsForm
      .querySelectorAll("textarea")
      .forEach((ele) => (ele.disabled = false));
    event.target.hidden = true;
    saveButton.hidden = false;
    cancelButton.hidden = false;
  });
}

function closeDetailsEvent() {
  const closeButton = document.getElementById("closeDetails");
  const closeCross = document.getElementById("closeIcon");
  closeButton.addEventListener("click", (event) => {
    location.href = location.href;
  });
  closeCross.addEventListener("click", (event) => {
    location.href = location.href;
  });
}

function submitChanges() {
  const saveChanges = document.getElementById("saveActivityBtn");
  detailsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("test");
  });
}

async function deleteActivity(activities) {
  const deleteButton = document.getElementById("deleteActivity");

  deleteButton.addEventListener("click", (event) => {
    const activityToDelete = activities.find(
      (ele) => ele.id == modalActivityId.dataset.id,
    );
    postDelete(activityToDelete);
    window.alert("Activité supprimer avec succés.");
    setTimeout(() => (window.location.href = window.location.href));
  });
}

async function postDelete(activityToDelete) {
  await axios.delete(
    `http://127.0.0.1:3000/api/activites/${activityToDelete.id}`,
  );
}
