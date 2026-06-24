// State
let parties = [];
let selectedParty = null;

// DOM
const app = document.querySelector("#app");

// Render
const render = () => {
    const html = parties.map((party) => {
        return  `<h1 class="partyPlanner">Party Planner</h1>
    <main>
        <section>
        <h2>Upcoming Parties</h2>
        <div id="partyList"></div>
        </section>

        <section>
        <h2>Party Details</h2>
        <div id="partyDetails"></div>
        </section>
    </main>`
    });
    parties.innerHTML = html.join("");
    if(!selectedParty) {
        //
    } else {
        //
    }
};

//GET THE PARTIES
const fetchParties = async () => {
    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events");
        const { data } = await response.json();
        party = data;
    } catch (error) {
        console.log(error);
    }
};

//WHEN USER CLICKS ON A PARTY RENDER ITS INFO
parties.addEventListener("click", async (event) => {
    if (event.target.classList.contains("partyPlanner")){
        await fetchParties(event.target.dataset.partyid);
        console.log(selectedParty);
    }
    render();
});

//Identify EACH Party by its ID

render();
