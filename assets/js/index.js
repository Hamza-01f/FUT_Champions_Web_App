//---------------------[main variables declaration]-------------------------
let allPlayerForm = document.getElementById('all-player-form');
let Playersform = document.getElementById('players-form');
let GoalkeepersForm = document.getElementById('Goalkeepers-form');
let clickOnCard = document.getElementById('click on card');
let goalkeeperForm = document.getElementById('goalkeeper-form');
let addPlayer = document.getElementById('add-player');
let addGoalkeeper = document.getElementById('add-goalkeeper');
let benchPlayers = document.querySelectorAll('.bench');
let formationCells = document.querySelectorAll('.formation-cell');
let formData = [];

//-------------------------------------[regixes]------------------------------------
let PlayerGoalkeeperNameRegix = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/i;

//--------------------[functionalities to show up whether goalkeeper form or player form]---------------------
benchPlayers.forEach(bench => {
    bench.addEventListener('click', function(event) {
        event.preventDefault();

        if (bench.textContent.trim().toUpperCase() === 'GK') {
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
        if (cell.id === 'GK') {
            goalkeeperForm.classList.remove('hidden');
            allPlayerForm.classList.add('hidden');
        } else {
            goalkeeperForm.classList.add('hidden');
            allPlayerForm.classList.remove('hidden');
        }
        clickOnCard.classList.add('hidden');
    });
});

//------------------------[Reusable Form Validation Function]------------------------
function validateForm(form) {
    let valid = true;
    let formData = {};  

    form.querySelectorAll('input,select').forEach(input => {
        let errorMessage = input.nextElementSibling;

        if (input.value === '') {
            valid = false;
            errorMessage.textContent = "This field cannot be empty";
        } else if(input.name === 'player-name' && !PlayerGoalkeeperNameRegix.test(input.value)){
            valid = false;
            errorMessage.textContent = "Invalid Name";
        } else {
            formData[input.name] = input.value;
            errorMessage.textContent = ''; 
        }
    });

    return { valid, formData };
}

//------------------------[Add Player Form Submission Logic]------------------------
addPlayer.addEventListener('click', function(event) {
    event.preventDefault();

    const { valid, formData: playerData } = validateForm(Playersform);

    if (valid) {
        formData.push(playerData);
        const fileInput = document.getElementById('Goalkeeper-photo').files[0];
        const inputPhoto = fileInput ? URL.createObjectURL(fileInput) : 'https://cdn.sofifa.net/players/209/981/25_120.png';

        console.log('Player added:', playerData);

        createPlayerCard(playerData, 'RB', inputPhoto); 

        // Save player data to localStorage
        saveToLocalStorage();
    }
});

//------------------------[Add Goalkeeper Form Submission Logic]------------------------
addGoalkeeper.addEventListener('click', function(event) {
    event.preventDefault();

    const { valid, formData: goalkeeperData } = validateForm(GoalkeepersForm);

    if (valid) {
        formData.push(goalkeeperData);
        const fileInput = document.getElementById('Goalkeeper-photo').files[0];
        const inputPhoto = fileInput ? URL.createObjectURL(fileInput) : 'https://cdn.sofifa.net/players/209/981/25_120.png';

        console.log('Goalkeeper added:', goalkeeperData);

        createPlayerCard(goalkeeperData, 'GK', inputPhoto);

        // Save goalkeeper data to localStorage
        saveToLocalStorage();
    }
});

//-------------------------[Function to create Player Card]------------------------
function createPlayerCard(playerData, position, inputPhoto) {
    const positionCell = document.getElementById(position);

    const existingCard = positionCell.querySelector('.cart');
    if (existingCard) {
        positionCell.removeChild(existingCard);
    }

    const playerCard = document.createElement('div');
    playerCard.classList.add('cart');

    const playerCardInner = `
        <div class="cartPerent">
            <div>
                <div class="toutal">
                    <div><h3>${playerData.rating || 'N/A'}</h3></div>
                    <div><p>${playerData.position || 'Position'}</p></div>
                </div>
                <div class="imagedejeue">
                    <img src="${inputPhoto || 'https://cdn.sofifa.net/players/209/981/25_120.png'}" alt="${playerData.name || 'Player Name'}">
                </div>
                <div class="nomeDejer">
                    <h3>${playerData.name || 'Player Name'}</h3>
                </div>
                <div class="pawordeJeur">
                    <div><div>rat</div><div>${playerData.rat || '0'}</div></div>
                    <div><div>div</div><div>${playerData.div || '0'}</div></div>
                    <div><div>han</div><div>${playerData.han || '0'}</div></div>
                    <div><div>kic</div><div>${playerData.kic || '0'}</div></div>
                    <div><div>ref</div><div>${playerData.ref || '0'}</div></div>
                    <div><div>pos</div><div>${playerData.pos || '0'}</div></div>
                </div>
                <div class="footerDecart">
                    <div><img src="${playerData.flag || 'https://cdn.sofifa.net/flags/ma.png'}" alt="${playerData.name || 'Flag'}"></div>
                    <div><img src="${playerData.teamLogo || 'https://cdn.sofifa.net/meta/team/7011/120.png'}" alt="${playerData.name || 'Team Logo'}"></div>
                </div>
            </div>
        </div>
    `;

    playerCard.innerHTML = playerCardInner;
    positionCell.appendChild(playerCard);
}

//--------------------------[Save to LocalStorage]-------------------------------
function saveToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(formData));
}

//------------------------[Load data from LocalStorage on page load]----------------
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        formData = JSON.parse(savedData);
        formData.forEach(player => {
            const inputPhoto = player.photo || 'https://cdn.sofifa.net/players/209/981/25_120.png';
            const position = player.position || 'GK'; // Default to RB if no position is provided
            createPlayerCard(player, position, inputPhoto);
        });
    }
});
