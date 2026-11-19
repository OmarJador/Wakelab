import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const URL = "http://127.0.0.1:3000/api/activites";

async function retrieveData() {
  const rsp = await axios.get(URL);
  const activities = rsp.data;
  localStorage.setItem("activities", JSON.stringify(activities));
}

const activities = JSON.parse(localStorage.getItem("activities"));
console.log(activities);

retrieveData();
cartesActivitéAffichage(activities);
searchActivity(activities);
filterActivities(activities);

function cartesActivitéAffichage(activities) {
  const activitiesContainer = document.getElementById("activitiesContainer");
  console.log(activitiesContainer);

  activitiesContainer.innerHTML = ``;

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
                          data-activity-id="${activity.id}">
                          Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

    activitiesContainer.innerHTML += carte;
  });
  detailButtonsEvent(activities);
}

function detailButtonsEvent(activites) {
  const detailButtons = document.querySelectorAll(".detailButtons");
  console.log(detailButtons);

  detailButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const activityRechercher = activites.find(
        (activity) => activity.id == button.dataset.activityId,
      );

      detailsModal(activityRechercher);
    }),
  );
}

function detailsModal(activityRechercher) {
  const detailsForm = document.forms["detailsForm"];
  console.log(detailsForm);

  detailsForm.modalTitle.value = activityRechercher.titre;
  detailsForm.modalTheme.value = activityRechercher.theme;
  detailsForm.modalDuration.value = activityRechercher.duree;
  detailsForm.modalObjectives.value = activityRechercher.objectifs;
  detailsForm.modalDescription.value = activityRechercher.description;
  detailsForm.modalAuthor.value = activityRechercher.auteur;
  detailsForm.modalCreatedAt.value = activityRechercher.createdAt;
  detailsForm.modalUpdatedAt.value = activityRechercher.updatedAt;
}

function searchActivity(activities) {
  const searchBar = document.getElementById("activitySearch");

  searchBar.addEventListener("keyup", (event) => {
    let searchedActivities = activities.filter((activity) =>
      activity.titre.toLowerCase().includes(event.target.value.toLowerCase()),
    );

    cartesActivitéAffichage(searchedActivities);
  });
}

function filterActivities(activites) {
  const category = document.getElementById("categoryFilter");

  category.addEventListener("change", (event) => {
    let selectedCategoryActivities = activites.filter(
      (activity) => activity.theme == category.value,
    );

    if (category.value == "all") {
      cartesActivitéAffichage(activites);
    } else {
      cartesActivitéAffichage(selectedCategoryActivities);
    }
  });
}
