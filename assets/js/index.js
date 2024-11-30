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


function createPlayerCard(playerformData, position) {
    const positionCell = document.getElementById(position); // Get the position cell dynamically
    alert(position)

    if (playerformData) {
        const playerCard = document.createElement('div');
        playerCard.classList.add('cart');
        
        // Add a class to track if it's full of information
        playerCard.classList.add('player-card');
        
        if(position != 'GK'){
            // Create the inner HTML for the player card
            const playerInner = `
                <div class="CardContainer">
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
            `;

            playerCard.innerHTML = playerInner;
        }else{
                const GoalKeeperInner = `
                <div class="CardContainer">
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

            playerCard.innerHTML = GoalKeeperInner;
        }


        // Add buttons for update and delete
        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');
        buttons.innerHTML = `
                        <button class="update-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                            </svg>
                        </button>
                        <button class="delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                        </button>
        `;
        playerCard.appendChild(buttons);

        // Append the card to the position cell
        positionCell.appendChild(playerCard);

        // Add event listeners for buttons
        buttons.querySelector('.update-btn').addEventListener('click', function () {
            if(position != 'GK'){
                openPlayerEditModal(playerformData,positionCell,playerCard);
            }else{
                openGoalkeeperEditModal(playerformData,positionCell,playerCard)
            }
           
        });

        buttons.querySelector('.delete-btn').addEventListener('click', function () {
            // Delete player info
            positionCell.removeChild(playerCard);
        });
    }
}

//----------------------------[add player edit model goes here]------------------------
function openPlayerEditModal(playerformData,positionCell,playerCard) {
    // Show player edit modal
    document.getElementById('edit-player-modal').classList.remove('hidden');

    // Populate modal with current data
    document.getElementById('edit-player-name').value = playerformData.name || '';
    document.getElementById('edit-player-photo').value = playerformData.photo || '';
    document.getElementById('edit-player-nationality').value = playerformData.Nationality || '';
    document.getElementById('edit-player-flag').value = playerformData.flag || '';
    document.getElementById('edit-player-logo').value = playerformData.logo || '';
    document.getElementById('edit-player-rating').value = playerformData.rating || '';
    document.getElementById('edit-player-pace').value = playerformData.pace || '';
    document.getElementById('edit-player-shooting').value = playerformData.shooting || '';
    document.getElementById('edit-player-passing').value = playerformData.passing || '';
    document.getElementById('edit-player-dribbling').value = playerformData.dribbling || '';
    document.getElementById('edit-player-defending').value = playerformData.defending || '';
    document.getElementById('edit-player-physical').value = playerformData.physical || '';

    // Handle save action
    document.getElementById('save-edit-player').addEventListener('click', function (event) {
        event.preventDefault();
        playerformData.name = document.getElementById('edit-player-name').value;
        playerformData.photo = document.getElementById('edit-player-photo').value;
        playerformData.Nationality = document.getElementById('edit-player-nationality').value;
        playerformData.flag = document.getElementById('edit-player-flag').value;
        playerformData.logo = document.getElementById('edit-player-logo').value;
        playerformData.rating = document.getElementById('edit-player-rating').value;
        playerformData.pace = document.getElementById('edit-player-pace').value;
        playerformData.shooting = document.getElementById('edit-player-shooting').value;
        playerformData.passing = document.getElementById('edit-player-passing').value;
        playerformData.dribbling = document.getElementById('edit-player-dribbling').value;
        playerformData.defending = document.getElementById('edit-player-defending').value;
        playerformData.physical = document.getElementById('edit-player-physical').value;
        
        document.getElementById('edit-player-modal').classList.add('hidden');

        // Recreate the player card with updated info
        positionCell.removeChild(playerCard);
        createPlayerCard(playerformData, playerformData.position);
    });

    // Handle cancel action
    document.getElementById('cancel-edit-player').addEventListener('click', function () {
        document.getElementById('edit-player-modal').classList.add('hidden');
    });
}

//goal keeper edit functionality starts here
function openGoalkeeperEditModal(goalkeeperformData,positionCell,playerCard) {
    // Show goalkeeper edit modal
    document.getElementById('edit-goalkeeper-modal').classList.remove('hidden');

    // Populate modal with current data
    document.getElementById('edit-goalkeeper-name').value = goalkeeperformData.name || '';
    document.getElementById('edit-goalkeeper-photo').value = goalkeeperformData.photo || '';
    document.getElementById('edit-Goalkeeper-nationality').value = goalkeeperformData.Nationality || '';
    document.getElementById('edit-Goalkeeper-flag').value = goalkeeperformData.flag || '';
    document.getElementById('edit-Goalkeeper-logo').value = goalkeeperformData.logo || '';
    document.getElementById('edit-Goalkeeper-rating').value = goalkeeperformData.rating || '';
    document.getElementById('edit-Goalkeeper-diving').value = goalkeeperformData.diving || '';
    document.getElementById('edit-Goalkeeper-handling').value = goalkeeperformData.handling || '';
    document.getElementById('edit-Goalkeeper-kicking').value = goalkeeperformData.kicking || '';
    document.getElementById('edit-Goalkeeper-reflexes').value = goalkeeperformData.reflexes || '';
    document.getElementById('edit-Goalkeeper-speed').value = goalkeeperformData.speed || '';
    document.getElementById('edit-Goalkeeper-positionning').value = goalkeeperformData.positioning || '';

    // Handle save action
    document.getElementById('save-edit-goalkeeper').addEventListener('click', function (event) {
        event.preventDefault();
        goalkeeperformData.name = document.getElementById('edit-goalkeeper-name').value;
        goalkeeperformData.photo = document.getElementById('edit-goalkeeper-photo').value;
        goalkeeperformData.Nationality = document.getElementById('edit-Goalkeeper-nationality').value;
        goalkeeperformData.flag = document.getElementById('edit-Goalkeeper-flag').value;
        goalkeeperformData.logo = document.getElementById('edit-Goalkeeper-logo').value ;
        goalkeeperformData.rating = document.getElementById('edit-Goalkeeper-rating').value;
        goalkeeperformData.diving = document.getElementById('edit-Goalkeeper-diving').value;
        goalkeeperformData.handling = document.getElementById('edit-Goalkeeper-handling').value;
        goalkeeperformData.kicking = document.getElementById('edit-Goalkeeper-kicking').value;
        goalkeeperformData.reflexes = document.getElementById('edit-Goalkeeper-speed').value;
        goalkeeperformData.speed = document.getElementById('edit-Goalkeeper-speed').value;
        goalkeeperformData.positioning = document.getElementById('edit-Goalkeeper-positionning').value;


        // Close modal after save
        document.getElementById('edit-goalkeeper-modal').classList.add('hidden');

        // Recreate the goalkeeper card with updated info
        positionCell.removeChild(playerCard);
        createPlayerCard(goalkeeperformData, 'GK');
    });

    // Handle cancel action
    document.getElementById('cancel-edit-goalkeeper').addEventListener('click', function () {
        document.getElementById('edit-goalkeeper-modal').classList.add('hidden');
    });
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



