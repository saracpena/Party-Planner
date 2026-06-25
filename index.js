// State
// parties holds the full list from the API.
// selectedParty starts as null because nothing has been clicked yet.
let parties = [];
let selectedParty = null;

// DOM
// This is the main container where we will build the whole app. i.e.  <div id="app"></div>
const app = document.querySelector("#app");

// Render
// Uses the current state to rebuild what the user sees on the page.
const render = () => {
  app.innerHTML = `
    <h1 class="partyPlanner">Party Planner</h1>

    <main>

      <section>
        <h2>Add a Party</h2>

        <form id="partyForm">
          <input
            type="text"
            name="name"
            placeholder="Party Name"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            required
          />

          <input
            type="date"
            name="date"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            required
          />

          <button>Add Party</button>
        </form>
      </section>

      <section>
        <h2>Upcoming Parties</h2>
        <div id="partyList">
          ${parties
            .map((party) => {
              return `<h3 class="party" data-partyid="${party.id}">
                ${party.name}
              </h3>`;
            })
            .join("")}
        </div>
      </section>

      <section>
        <h2>Party Details</h2>
        <div id="partyDetails">
          ${
            !selectedParty
              ? `<p>Select a party to learn more.</p>`
              : `<h3>${selectedParty.name}</h3>
                 <p><strong>ID:</strong> ${selectedParty.id}</p>
                 <p><strong>Date:</strong> ${selectedParty.date}</p>
                 <p><strong>Location:</strong> ${selectedParty.location}</p>
                 <p>${selectedParty.description}</p>
                 <button id="deleteParty" data-partyid=${selectedParty.id}>Delete Party</button>
                 `
          }
        </div>
      </section>

    </main>
  `;
};

//GET THE PARTIES, Gets the full list of parties from the API, saves it to state, and then rerenders the page.
const fetchParties = async () => {
    try {
        console.log("Fetching parties...")
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events");
        const { data } = await response.json();
        console.log(data);
        parties = data;
        render();
    } catch (error) {
        console.log(error);
    }
};

//WHEN USER CLICKS ON A PARTY RENDER ITS INFO
// Gets one party by its id,
// saves it as the selected party.
app.addEventListener("click", async (event) => {
    if (event.target.classList.contains("party")) {
        const id = event.target.dataset.partyid;
        await fetchSelectedParty(id);
        render();
    }
});

// Gets one party by its id,
// saves it as the selected party.
const fetchSelectedParty = async (id) => {
    try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events/${id}`);
        const { data } = await response.json();
        console.log(data);
        selectedParty = data;
    } catch (error) {
        console.log(error)
    }
};

const createParty = async (newParty) => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParty),
      }
    );

    const { data } = await response.json();
    console.log(data);

    await fetchParties();
  } catch (error) {
    console.log(error);
  }
};

app.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (event.target.id === "partyForm") {
    const form = event.target;

    const name = form.name.value;
    const description = form.description.value;
    const date = form.date.value;
    const location = form.location.value;

    const newParty = {
      name: name,
      description: description,
      date: new Date(date).toISOString(),
      location: location,
    };

    await createParty(newParty);

    form.reset();
  }
});

const deleteParty = async (id) => {
  try {
    await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events/${id}`,
      {
        method: "DELETE",
      }
    );

    selectedParty = null;

    await fetchParties();

  } catch (error) {
    console.log(error);
  }
};

app.addEventListener("click", async (event) => {

  if (event.target.classList.contains("party")) {
    const id = event.target.dataset.partyid;
    await fetchSelectedParty(id);
    render();
  }

  if (event.target.id === "deleteParty") {
    const id = event.target.dataset.partyid;
    await deleteParty(id);
  }

});

// Starts the app by fetching the party list.
const init = async () => {
   await fetchParties();
    render();
};

init();
