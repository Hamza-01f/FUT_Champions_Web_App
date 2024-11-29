// --------------------- [Main Variables Declaration] -------------------------
let allPlayerForm = document.getElementById('all-player-form');
let Playersform = document.getElementById('players-form');
let GoalkeepersForm = document.getElementById('Goalkeepers-form');
let clickOnCard = document.getElementById('click on card');
let goalkeeperForm = document.getElementById('goalkeeper-form');
let addPlayer = document.getElementById('add-player');
let addGoalkeeper = document.getElementById('add-goalkeeper');
let benchPlayers = document.querySelectorAll('.bench');
let formationCells = document.querySelectorAll('.formation-cell');
let addBenchPlayer = document.getElementById('players-to-bench');
let addKeeperToBench = document.getElementById('goalkeepers-bench');
let PlayerPosition = document.getElementById('player-position')

let formData = []; // formData array to store player and goalkeeper details

// --------------------- [Show Goalkeeper or Player Form] ---------------------
benchPlayers.forEach(bench => {
    bench.addEventListener('click', function(event) {
        event.preventDefault();

        if (bench.textContent.trim().toUpperCase() === 'GK' ) {
            goalkeeperForm.classList.remove('hidden');
            allPlayerForm.classList.add('hidden');
        } else {
            goalkeeperForm.classList.add('hidden');
            allPlayerForm.classList.remove('hidden');
            PlayerPosition.classList.add('hidden');
        }
        clickOnCard.classList.add('hidden');
    });
});

formationCells.forEach(cell => {
    cell.addEventListener('click', function(event) {
        event.preventDefault();

        // Capture the clicked position (position can be 'GK' or other player positions)
        const position = cell.id;
        sessionStorage.setItem('clickedPosition', position); // Store position to use when adding formData

        if (position === 'GK') {
            goalkeeperForm.classList.remove('hidden');
            allPlayerForm.classList.add('hidden');
        } else {
            goalkeeperForm.classList.add('hidden');
            allPlayerForm.classList.remove('hidden');
        }

        // Hide the card selection
        clickOnCard.classList.add('hidden');
    });
});

//----------------------------[add player or goalkeeper to bench begin ]-------------------------
addKeeperToBench.addEventListener('click', function(event){
    event.preventDefault();
    goalkeeperForm.classList.remove('hidden');
    clickOnCard.classList.add('hidden');
});

addBenchPlayer.addEventListener('click', function(event){
    event.preventDefault();
    allPlayerForm.classList.remove('hidden');
    PlayerPosition.classList.remove('hidden');
    clickOnCard.classList.add('hidden');

})

// --------------------- [Add Player Form Submission Logic] --------------------
addPlayer.addEventListener('click', function(event) {
    event.preventDefault();

    // Collect formData from form fields for player
    let playerName = document.getElementById('player-name').value;
    let PlayerNationality = document.getElementById('player-nationality').value;
    let playerPhoto = document.getElementById('player-photo').value; 
    let playerFlag = document.getElementById('player-flag').value; 
    let playerLogo = document.getElementById('player-logo').value; 
    let playerRating = document.getElementById('player-rating').value;
    let playerPace = document.getElementById('player-pace').value;
    let playerShooting = document.getElementById('player-shooting').value;
    let playerPassing = document.getElementById('player-passing').value;
    let playerDribbling = document.getElementById('player-dribbling').value;
    let playerPhysical = document.getElementById('player-physical').value;
    let playerDefending = document.getElementById('player-defending').value;

    // Get the position where the player card should be added from sessionStorage
    const position = sessionStorage.getItem('clickedPosition');
    
    // Create the player formData object
    let playerInfo = {
        position: position, 
        name: playerName,
        Nationality : PlayerNationality,
        photo: playerPhoto,
        flag: playerFlag,
        logo: playerLogo,
        rating: playerRating,
        pace: playerPace,
        shooting: playerShooting,
        passing: playerPassing,
        dribbling: playerDribbling,
        defending: playerDefending,
        physical: playerPhysical
    };

    // Push player formData into the formData array
    formData.push(playerInfo);

    // Clear the form fields after submitting
    document.getElementById('player-name').value = '';
    document.getElementById('player-nationality').value = '';
    document.getElementById('player-photo').value = '';
    document.getElementById('player-flag').value = '';
    document.getElementById('player-logo').value = '';
    document.getElementById('player-rating').value = '';
    document.getElementById('player-pace').value = '';
    document.getElementById('player-shooting').value = '';
    document.getElementById('player-passing').value = '';
    document.getElementById('player-dribbling').value = '';
    document.getElementById('player-defending').value = '';
    document.getElementById('player-physical').value = '';

    // Create and append the player card
    createPlayerCard(playerInfo,position);

    saveToLocalStorage(); 
});

// --------------------- [Add Goalkeeper Form Submission Logic] --------------
addGoalkeeper.addEventListener('click', function(event) {
    event.preventDefault();

    // Collect formData from form fields for goalkeeper
    let goalkeeperName = document.getElementById('Goalkeeper-name').value;
    let goalkeeperNationality = document.getElementById('Goalkeeper-nationality').value;
    let goalkeeperPhoto = document.getElementById('Goalkeeper-photo').value; 
    let goalkeeperFlag = document.getElementById('Goalkeeper-flag').value; 
    let goalkeeperLogo = document.getElementById('Goalkeeper-logo').value; 
    let goalkeeperRating = document.getElementById('Goalkeeper-rating').value;
    let goalkeeperDiving = document.getElementById('Goalkeeper-pace').value; 
    let goalkeeperHandling = document.getElementById('Goalkeeper-shooting').value; 
    let goalkeeperKicking = document.getElementById('Goalkeeper-passing').value; 
    let goalkeeperReflexes = document.getElementById('Goalkeeper-dribbling').value; 
    let goalkeeperSpeed = document.getElementById('Goalkeeper-defending').value; 
    let goalkeeperPositioning = document.getElementById('Goalkeeper-physical').value; 

    
    const position = sessionStorage.getItem('clickedPosition');
    
    // Create the goalkeeper formData object
    let goalkeeperInfo = {
        position: position, 
        name: goalkeeperName,
        Nationality : goalkeeperNationality,
        photo: goalkeeperPhoto,
        flag: goalkeeperFlag,
        logo: goalkeeperLogo,
        rating: goalkeeperRating,
        diving: goalkeeperDiving,
        handling: goalkeeperHandling,
        kicking: goalkeeperKicking,
        reflexes: goalkeeperReflexes,
        speed: goalkeeperSpeed,
        positioning: goalkeeperPositioning
    };

    // Push goalkeeper formData into the formData array
    formData.push(goalkeeperInfo);

    // Clear the form fields after submitting
    document.getElementById('Goalkeeper-name').value = '';
    document.getElementById('Goalkeeper-nationality').value = '';
    document.getElementById('Goalkeeper-photo').value = '';
    document.getElementById('Goalkeeper-flag').value = '';
    document.getElementById('Goalkeeper-logo').value = '';
    document.getElementById('Goalkeeper-rating').value = '';
    document.getElementById('Goalkeeper-pace').value = '';
    document.getElementById('Goalkeeper-shooting').value = '';
    document.getElementById('Goalkeeper-passing').value = '';
    document.getElementById('Goalkeeper-dribbling').value = '';
    document.getElementById('Goalkeeper-defending').value = '';
    document.getElementById('Goalkeeper-physical').value = '';

    // Create and append the goalkeeper card
    console.log(formData)
    createPlayerCard(goalkeeperInfo,position);

    saveToLocalStorage(); // Save to localStorage (if necessary)
});

// --------------------- [Create Player Card Function with New Structure] -----
function createPlayerCard(playerformData,position) {
    const positionCell = document.getElementById(playerformData.position); // Get the position cell dynamically
    // Check if the player card already exists in that position
    const existingCard = positionCell.querySelector('.cart');
    if (existingCard) {
        positionCell.removeChild(existingCard); // Remove existing card if present
    }
    
    if(position === 'GK'){
        const GoalKeeperInner = `
        <div class="cartPerent">
            <div>
                <div class="toutal">
                    <div><h3>${playerformData.rating || 'N/A'}</h3></div>
                    <div><p>${playerformData.position || 'Position'}</p></div>
                </div>
                <div class="imagedejeue">
                    <img src="${playerformData.photo || 'default_image_url'}" alt="${playerformData.name || 'Player Name'}">
                </div>
                <div class="nomeDejer flex pl-1">
                    <div><h3>${playerformData.Nationality || 'N/A'}</h3></div>
                    <h3>${playerformData.name || 'Player Name'}</h3>
                </div>
                <div class="pawordeJeur">
                    <div><div>rat</div><div>${playerformData.rating || '0'}</div></div>
                    <div><div>div</div><div>${playerformData.diving || '0'}</div></div>
                    <div><div>han</div><div>${playerformData.handling || '0'}</div></div>
                    <div><div>kic</div><div>${playerformData.kicking || '0'}</div></div>
                    <div><div>ref</div><div>${playerformData.reflexes || '0'}</div></div>
                    <div><div>spe</div><div>${playerformData.speed || '0'}</div></div>
                    <div><div>pos</div><div>${playerformData.positioning || '0'}</div></div>
                </div>
                <div class="footerDecart">
                    <div><img src="${playerformData.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="Flag"></div>
                    <div><img src="${playerformData.logo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="Team Logo"></div>
                </div>
            </div>
        </div>
    `;

    const playerCard = document.createElement('div');
    playerCard.classList.add('cart');
    playerCard.innerHTML = GoalKeeperInner;

    positionCell.appendChild(playerCard); 
    }else {
        const playerInner = `
        <div class="cartPerent">
        <div>
            <div class="toutal">
                 <div><h3>${playerformData.rating || 'N/A'}</h3></div>
                 <div><p>${playerformData.position || 'Position'}</p></div>
            </div>
            <div class="imagedejeue">
                <img src="${playerformData.photo || 'default_image_url'}" alt="${playerformData.name || 'Player Name'}">
            </div>
            <div class="nomeDejer flex ml-1">
                <h3>${playerformData.Nationality || 'Player Name'}</h3>
                <h3>${playerformData.name || 'Player Name'}</h3>
            </div>
            <div class="pawordeJeur">
                <div><div>rat</div><div>${playerformData.rating || '0'}</div></div>
                <div><div>pac</div><div>${playerformData.pace || '0'}</div></div>
                <div><div>sho</div><div>${playerformData.shooting || '0'}</div></div>
                <div><div>kic</div><div>${playerformData.kicking || '0'}</div></div>
                <div><div>pas</div><div>${playerformData.passing || '0'}</div></div>
                <div><div>dri</div><div>${playerformData.dribbling || '0'}</div></div>
                <div><div>def</div><div>${playerformData.defending || '0'}</div></div>
                  <div><div>phy</div><div>${playerformData.physical || '0'}</div></div>
            </div>
            <div class="footerDecart">
                <div><img src="${playerformData.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="Flag"></div>
                <div><img src="${playerformData.logo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="Team Logo"></div>
            </div>
        </div>
    </div>
    `;
    const playerCard = document.createElement('div');
    playerCard.classList.add('cart');
    playerCard.innerHTML = playerInner;

    positionCell.appendChild(playerCard); 
    }
    

}

// --------------------- [Save to LocalStorage Function] -----------------------
function saveToLocalStorage() {
    localStorage.setItem('playerformData', JSON.stringify(formData)); // Save formData to localStorage
}


//------------------------[Load formData from LocalStorage on Page Load]---------
// window.addEventListener('DOMContentLoaded', (event) => {
//     event.preventDefault();
//     const savedformData = localStorage.getItem('playerformData');
//     if (savedformData) {
//         formformData = JSON.parse(savedformData);
//         formformData.forEach(player => {
//             const inputPhoto = player.photo || 'https://cdn.sofifa.net/players/209/981/25_120.png';
//             const position = player.position || 'GK'; // Default to 'GK' if position is not provided
//             createPlayerCard(player, position,inputPhoto); // Create the player card
//         });
//     }
// });



