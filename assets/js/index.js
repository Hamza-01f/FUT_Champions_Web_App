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

        const position = bench.id;
        sessionStorage.setItem('clickedPosition', position); 

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

const NameAndCountryRegix = /^[a-zA-Z\s]{4,50}$/; 
const CdnRegixes = /^https:\/\/cdn\.sofifa\.net\/.*\.(png|jpg|jpeg|gif)$/; 
const statisticsRegix = /^\d{2}$/; 

let IsValid = false;

//form validation for player cards 
function validateForm(form){
    IsValid = false; 
    inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        let MessageError = input.nextElementSibling; 

        // Check for required fields
        if (input.value === '') {
            MessageError.textContent = 'Please! This input is required ';
            IsValid = true;
        }
        // Validate player name
        else if (input.name === 'player-name' && !NameAndCountryRegix.test(input.value)) {
            MessageError.textContent = 'Invalid name, please enter a valid one';
            IsValid = true;
        }
        // Validate player photo URL
        else if (input.name === 'player-photo' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Image URL, please enter a valid one';
            IsValid = true;
        }
        // Validate player nationality
        else if (input.name === 'player-nationality' && !NameAndCountryRegix.test(input.value)) {
            MessageError.textContent = 'Invalid Nationality name';
            IsValid = true;
        }
        // Validate flag URL
        else if (input.name === 'player-flag' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Flag URL';
            IsValid = true;
        }
        // Validate logo URL
        else if (input.name === 'player-logo' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Logo URL';
            IsValid = true;
        }
        // Validate rating and stats (should be between 1 and 99)
        else if (input.name === 'player-rating' && !statisticsRegix.test(input.value)) {
            MessageError.textContent = 'Invalid rating, it should be between 1 and 99';
            IsValid = true;
        } else if (['player-pace', 'player-shooting', 'player-passing', 'player-dribbling', 'player-defending', 'player-physical'].includes(input.name) && !statisticsRegix.test(input.value)) {
            MessageError.textContent = `Invalid ${input.name.split('-')[1]}, it should be between 1 and 99`;
            IsValid = true;
        } else {
            MessageError.textContent = ''; // Clear error message if input is valid
        }
    });
}

//form validation for goalkeeper information

function validateKeeper(GoalkeeperForms){

    IsValid = false; 
    inputs = GoalkeeperForms.querySelectorAll('input');
    inputs.forEach(input => {
        let MessageError = input.nextElementSibling; 

        // Check for required fields
        if (input.value === '') {
            MessageError.textContent = 'Please! This input is required';
            IsValid = true;
        }
        // Validate player name
        else if (input.name === 'Goalkeeper-name' && !NameAndCountryRegix.test(input.value)) {
            MessageError.textContent = 'Invalid name, please enter a valid one';
            IsValid = true;
        }
        // Validate player photo URL
        else if (input.name === 'Goalkeeper-photo' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Image URL, please enter a valid one';
            IsValid = true;
        }
        // Validate player nationality
        else if (input.name === 'Goalkeeper-nationality' && !NameAndCountryRegix.test(input.value)) {
            MessageError.textContent = 'Invalid Nationality name';
            IsValid = true;
        }
        // Validate flag URL
        else if (input.name === 'Goalkeeper-flag' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Flag URL';
            IsValid = true;
        }
        // Validate logo URL
        else if (input.name === 'Goalkeeper-logo' && !CdnRegixes.test(input.value)) {
            MessageError.textContent = 'Invalid Logo URL';
            IsValid = true;
        }
        // Validate rating and stats (should be between 1 and 99)
        else if (input.name === 'Goalkeeper-rating' && !statisticsRegix.test(input.value)) {
            MessageError.textContent = 'Invalid rating, it should be between 1 and 99';
            IsValid = true;
        } else if (['Goalkeeper-diving', 'Goalkeeper-handling', 'Goalkeeper-kicking', 'Goalkeeper-reflexes', 'Goalkeeper-speed', 'Goalkeeper-positionning'].includes(input.name) && !statisticsRegix.test(input.value)) {
            MessageError.textContent = `Invalid ${input.name.split('-')[1]}, it should be between 1 and 99`;
            IsValid = true;
        } else {
            MessageError.textContent = ''; // Clear error message if input is valid
        }
    });
}


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

    let PlayerFormValid = document.getElementById('players-form')
    validateForm(PlayerFormValid)

    if(IsValid){
        return;
    }

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

    let GoalkeeperForms = document.getElementById('Goalkeepers-form')
    validateKeeper(GoalkeeperForms)

    if(IsValid){
        return;
    }
    
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
    createPlayerCard(goalkeeperInfo,position);

    saveToLocalStorage(); // Save to localStorage (if necessary)
});

function createCard(Data , benchLB , hidePosition){
    hidePosition.classList.add('hidden');
    if(benchLB === 'GK'){
        return `
            <div class="benchCardContainer">
                <div class="toutal">
                    <div><h3>${Data.rating || 'N/A'}</h3></div>
                    <div><p>${benchLB}</p></div>
                </div>
                <div class="playerImage">
                    <img src="${Data.photo }" alt="${Data.name || 'Player Name'}">
                </div>
                <div class="nomeDejer flex ml-1">
                    <h3>${Data.Nationality || 'Player Name'}</h3>
                    <h3>${Data.name || 'Player Name'}</h3>
                </div>
                <div class="playerStatistics">
                    <div>
                    <div>div</div>
                    <div>${Data.diving || '0'}</div>
                    </div>
                    <div>
                    <div>han</div>
                    <div>${Data.handling || '0'}</div>
                    </div>
                    <div>
                    <div>kic</div>
                    <div>${Data.kicking || '0'}</div>
                    </div>
                    <div>
                    <div>ref</div>
                    <div>${Data.reflexes || '0'}</div>
                    </div>
                    <div>
                    <div>spe</div>
                    <div>${Data.speed || '0'}</div>
                    </div>
                    <div>
                    <div>pos</div>
                    <div>${Data.positioning || '0'}</div>
                    </div>
                </div>
                <div class="cardFooter">
                    <div><img src="${Data.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="Flag"></div>
                    <div><img src="${Data.logo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="Team Logo"></div>
                </div>
            </div>
        `;
    }else{
        return `
                <div class="benchCardContainer">
                <div class="toutal">
                    <div><h3>${Data.rating || 'N/A'}</h3></div>
                    <div><p>${benchLB}</p></div>
                </div>
                <div class="playerImage">
                    <img src="${Data.photo }" alt="${Data.name || 'Player Name'}">
                </div>
                <div class="nomeDejer flex ml-1">
                    <h3>${Data.Nationality || 'Player Name'}</h3>
                    <h3>${Data.name || 'Player Name'}</h3>
                </div>
                <div class="playerStatistics">
                    <div>
                    <div>pac</div>
                    <div>${Data.pace || '0'}</div>
                    </div>
                    <div>
                    <div>sho</div>
                    <div>${Data.shooting || '0'}</div>
                    </div>
                    <div>
                    <div>pas</div>
                    <div>${Data.passing || '0'}</div>
                    </div>
                    <div>
                    <div>dri</div>
                    <div>${Data.dribbling || '0'}</div>
                    </div>
                    <div>
                    <div>def</div>
                    <div>${Data.defending || '0'}</div>
                    </div>
                    <div>
                    <div>phy</div>
                    <div>${Data.physical || '0'}</div>
                    </div>
                </div>
                <div class="cardFooter">
                    <div><img src="${Data.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="Flag"></div>
                    <div><img src="${Data.logo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="Team Logo"></div>
                </div>
            </div>
            `;
    }
}

//------------------------------------[function to create both player and goalkeeper card starts here]-----------------------------

function createPlayerCard(playerformData, position) {
    const positionCell = document.getElementById(position); // Get the position cell dynamically

    if (playerformData) {
        const playerCard = document.createElement('div');
        
        playerCard.classList.add('cart', 'player-card');
        let playerInner = '';
        let GoalKeeperInner = '';
        
        if(position != 'GK' && position != 'bench-GK'){
            if(position === 'bench-LB' || position === 'bench-LCB' || position === 'bench-RCB' || position === 'bench-RB' || position === 'bench-LM' || position === 'bench-LCM' || position === 'bench-RCM' || position === 'bench-RM' || position === 'bench-RST' || position === 'bench-LST'){
                switch(position){
                    case 'bench-LB' : 
                                  var benchLB = 'LB';
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchLB,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-LCB' :
                                  let benchLcb = 'LCB';
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchLcb,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-RCB' : 
                                  let benchRCB = 'RCB'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchRCB,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-RB'  : 
                                  let benchRB = 'RB'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchRB,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-LM'  : 
                                  let benchLM = 'LM'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData, benchLM ,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-LCM' : 
                                  let benchLCM = 'LCM'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchLCM,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-RCM' : 
                                  let benchRCM = 'RCM'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchRCM,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-RM': 
                                  let benchRM = 'RM'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchRM,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-RST' : 
                                  let benchRST = 'RST'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchRST,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                    case 'bench-LST' : 
                                  let benchLST = 'LST'
                                  var hidePosition = positionCell.querySelector('p');
                                  playerInner = createCard(playerformData,benchLST ,hidePosition);
                                  positionCell.style.backgroundImage = 'none';
                                  break;
                }
            }else{

                playerInner = `
                        <div class="CardContainer">
                            <div class="toutal">
                                <div><h3>${playerformData.rating || 'N/A'}</h3></div>
                                <div><p>${playerformData.position || 'Position'}</p></div>
                            </div>
                            <div class="imagedejeue">
                                <img src="${playerformData.photo || 'default_image_url'}" alt="${playerformData.name || 'Player Name'}">
                            </div>
                            <div class="nomeDejer flex ml-2">
                                <h3>${playerformData.Nationality || 'Player Name'}</h3>
                                <h3>${playerformData.name || 'Player Name'}</h3>
                            </div>
                            <div class="pawordeJeur">
                                <div>
                                <div>pac</div>
                                <div>${playerformData.pace || '0'}</div>
                                </div>
                                <div>
                                <div>sho</div>
                                <div>${playerformData.shooting || '0'}</div>
                                </div>
                                <div>
                                <div>pas</div>
                                <div>${playerformData.passing || '0'}</div>
                                </div>
                                <div>
                                <div>dri</div>
                                <div>${playerformData.dribbling || '0'}</div>
                                </div>
                                <div>
                                <div>def</div>
                                <div>${playerformData.defending || '0'}</div>
                                </div>
                                <div>
                                <div>phy</div>
                                <div>${playerformData.physical || '0'}</div>
                                </div>
                            </div>
                            <div class="footerDecart">
                                <div><img src="${playerformData.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="Flag"></div>
                                <div><img src="${playerformData.logo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="Team Logo"></div>
                            </div>
                        </div>
                `;
            }

          playerCard.innerHTML = playerInner;
        }else{
             if(position === 'bench-GK'){
                let benchGK = 'GK'
                var hidePosition = positionCell.querySelector('p');
                GoalKeeperInner = createCard(playerformData,benchGK,hidePosition);
                positionCell.style.backgroundImage = 'none';
             }else{
                    GoalKeeperInner = `

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

            }

            playerCard.innerHTML = GoalKeeperInner;
        }


        // Add buttons for update and delete
        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');
        if(position === 'bench-GK' || position === 'bench-LB' || position === 'bench-LCB' || position === 'bench-RCB' || position === 'bench-RB' || position === 'bench-LM' || position === 'bench-LCM' || position === 'bench-RCM' || position === 'bench-RM' || position === 'bench-RST' || position === 'bench-LST'){
            buttons.innerHTML = `
            <button class="update-btn-bench">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
            </button>
            <button class="delete-btn-bench">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
         `;
          playerCard.appendChild(buttons);
        }else{
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
        }


        // Append the card to the position cell
        positionCell.appendChild(playerCard);

        // Add event listeners for buttons
        buttons.querySelector('.update-btn, .update-btn-bench').addEventListener('click', function () {
            if(position === 'GK' || position === 'bench-GK'){
                openGoalkeeperEditModal(playerformData,positionCell,playerCard)
            }else{
                openPlayerEditModal(playerformData,positionCell,playerCard);
            }
           
        });

        buttons.querySelector('.delete-btn, .delete-btn-bench').addEventListener('click', function () {
            // Delete player info
            positionCell.removeChild(playerCard);
        });
    }
}

//----------------------------[add player edit model goes here]------------------------
function openPlayerEditModal(playerformData,positionCell,playerCard) {
    // Show player edit modal
    let playerEditModal = document.getElementById('edit-player-modal');
    playerEditModal.classList.remove('hidden');

    // Populate modal with current data
    document.getElementById('edit-player-name').value = playerformData.name ;
    document.getElementById('edit-player-photo').value = playerformData.photo ;
    document.getElementById('edit-player-nationality').value = playerformData.Nationality ;
    document.getElementById('edit-player-flag').value = playerformData.flag ;
    document.getElementById('edit-player-logo').value = playerformData.logo ;
    document.getElementById('edit-player-rating').value = playerformData.rating ;
    document.getElementById('edit-player-pace').value = playerformData.pace ;
    document.getElementById('edit-player-shooting').value = playerformData.shooting ;
    document.getElementById('edit-player-passing').value = playerformData.passing ;
    document.getElementById('edit-player-dribbling').value = playerformData.dribbling ;
    document.getElementById('edit-player-defending').value = playerformData.defending ;
    document.getElementById('edit-player-physical').value = playerformData.physical ;

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
    document.getElementById('edit-goalkeeper-name').value = goalkeeperformData.name;
    document.getElementById('edit-goalkeeper-photo').value = goalkeeperformData.photo ;
    document.getElementById('edit-Goalkeeper-nationality').value = goalkeeperformData.Nationality ;
    document.getElementById('edit-Goalkeeper-flag').value = goalkeeperformData.flag ;
    document.getElementById('edit-Goalkeeper-logo').value = goalkeeperformData.logo ;
    document.getElementById('edit-Goalkeeper-rating').value = goalkeeperformData.rating ;
    document.getElementById('edit-Goalkeeper-diving').value = goalkeeperformData.diving ;
    document.getElementById('edit-Goalkeeper-handling').value = goalkeeperformData.handling ;
    document.getElementById('edit-Goalkeeper-kicking').value = goalkeeperformData.kicking ;
    document.getElementById('edit-Goalkeeper-reflexes').value = goalkeeperformData.reflexes ;
    document.getElementById('edit-Goalkeeper-speed').value = goalkeeperformData.speed ;
    document.getElementById('edit-Goalkeeper-positionning').value = goalkeeperformData.positioning ;

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



