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


//--------------------[functionalities to show up whether goalkeeper form or player form]---------------------
benchPlayers.forEach(bench => {
    bench.addEventListener('click', function(event){
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
    cell.addEventListener('click', function(event){
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

    form.querySelectorAll('input').forEach(input => {
        let errorMessage = input.nextElementSibling;

      
        if (input.value === '') {
            valid = false;
            errorMessage.textContent = "This field cannot be empty";
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
        console.log('Player added:', playerData);  
    }
});


