// State
let parties = [];
let selectedParty = null;

// DOM
const app = document.querySelector("#app");

// Render
const render = () => {
  app.innerHTML = `
    <h1 class="partyPlanner">Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <div id="partyList">
          ${parties.map((party) => {
            return `<h3 class="party" data-partyid="${party.id}">${party.name}</h3>`;
          }).join("")}
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
                <p>${selectedParty.description}</p>`
          }
        </div>
      </section>
    </main>
  `;
};

//GET THE PARTIES
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
app.addEventListener("click", async (event) => {
    if (event.target.classList.contains("party")) {
        const id = event.target.dataset.partyid;
        await fetchSelectedParty(id);
        render();
    }
});

//Identify EACH Party by its ID
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

const init = async () => {
   await fetchParties();
    render();
};

init();

// render();
// fetchParties();
