import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const URL = "http://127.0.0.1:3000/api/activites";

mainCode();

async function mainCode() {
  const activities = await fetchData();
  afficherLesCartes(activities);
  refreshButtonEvent();
  filterActivities(activities);
  searchActivity(activities);
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
                          data-activity-id="${activity.id}">
                          Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

    activityContainer.innerHTML += carte;
  });
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
