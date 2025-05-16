    // Keep track of player and computer score for game
    let humanScore = 0;
    let computerScore = 0;
    // Keep track of which player and computer have the higher strike count
    let playerRoundStrike = 0;
    let computerRoundStrike = 0;

    let gameOver = false;
    let displayCurrentRound = false;
    let round = 0;
    const maxRound = 5;

    function selectRPSChoice(button_id) {
        if (gameOver) {
            return;
        }
        console.log("User chose: " + button_id)
        playerChoice = button_id;
        playRound(playerChoice, getComputerChoice());
    }

    function resetGame() {
        round = 0;
        humanScore = 0;
        computerScore = 0;
        resetStrikeCount();
        gameOver = false;
        resetButton.style.display = "none";
        clearResultsBoard();
        updateScore();
    }

    const rpsButtons = document.querySelectorAll("button")
    rpsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id != "reset") {
                selectRPSChoice(button.id);
            }
        });
    });

    const resetButton = document.querySelector("#reset")
    resetButton.style.display = "none";
    resetButton.addEventListener("click", resetGame);
    

    function determineVictor() {
        let result = ""; // Set result to be empty
        // Check whoever has the lowest round strike within current round
        if (playerRoundStrike < computerRoundStrike) {
            result = "YOU WIN THIS ROUND!"
            humanScore += 1;
        }
        else {
            result = "YOU LOSE THIS ROUND!"
            computerScore += 1;
        }
        return result;
    }

    function checkRockPaper(humanChoice, computerChoice) {
        let isMatchup = false;
        // Check if this matchup is valid
        if ((humanChoice == "ROCK" || computerChoice == "ROCK") && 
            (humanChoice == "PAPER" || computerChoice == "PAPER")) {
            // Give strike point to whichever one has the losing matchup
            if (humanChoice == "ROCK") {
                playerRoundStrike += 1 
            }
            if (computerChoice == "ROCK") {
                computerRoundStrike += 1;
            }
            isMatchup = true;
        }
        return isMatchup;
    }

    function checkRockScissors(humanChoice, computerChoice) {
        let isMatchup = false;
        // Check if this matchup is valid
        if ((humanChoice == "ROCK" || computerChoice == "ROCK") && 
            (humanChoice == "SCISSORS" || computerChoice == "SCISSORS")) {
            // Give strike point to whichever one has the losing matchup
            if (humanChoice == "SCISSORS") {
                playerRoundStrike += 1 
            }
            if (computerChoice == "SCISSORS") {
                computerRoundStrike += 1;
            }
            isMatchup = true;
        }
        return isMatchup;
    }

    function checkPaperScissors(humanChoice, computerChoice) {
        let isMatchup = false;
        // Check if this matchup is valid
        if ((humanChoice == "PAPER" || computerChoice == "PAPER") && 
            (humanChoice == "SCISSORS" || computerChoice == "SCISSORS")) {
            // Give strike point to whichever one has the losing matchup
            if (humanChoice == "PAPER") {
                playerRoundStrike += 1 
            }
            if (computerChoice == "PAPER") {
                computerRoundStrike += 1;
            }
            isMatchup = true;
        }
        return isMatchup;
    }

    function checkMatchups(humanChoice, computerChoice) {
        // Set default value to DRAW in case both users are tied
        let result = "DRAW! NO WINNER!";
        // Check to see which matchup it is
        if (checkRockPaper(humanChoice, computerChoice)) {
            result = determineVictor()
        }
        if (checkPaperScissors(humanChoice, computerChoice)) {
            result = determineVictor()
        }
        if (checkRockScissors(humanChoice, computerChoice)) {
            result = determineVictor()
        }
        return result;
    }

    function getComputerChoice() {
        // Once call randomly get a value for these choices: rock paper and scissors
        let choice = "NONE";
        // Set min number value of 0
        const minNum = Math.ceil(0);
        // set max number value of 2
        const maxNum = Math.floor(3);
        // randomly choose between the values of 0, 1, 2 to determine computer choice
        let randChoice = Math.floor(Math.random() * (maxNum - minNum) + minNum);
        // Check if random value is equal to one of these values
        if (randChoice == 0){
            choice = "ROCK";
        }
        if (randChoice == 1) {
            choice = "PAPER";
        }
        if (randChoice == 2) {
            choice = "SCISSORS";
        }
        // If they are, output the value that was chosen
        return choice;
    }

    function updateScore() {
        // Display human score
        console.log("Human Score: " + humanScore);
        const userScoreContainer = document.querySelector("#user-score");
        userScoreContainer.textContent = "User Score: " + humanScore.toString();

        // Display computer score
        console.log("Computer Score: " + computerScore);
        const computerScoreContainer = document.querySelector("#computer-score");
        computerScoreContainer.textContent = "Computer Score: " + computerScore.toString();
    }

    function clearResultsBoard() {
        if (displayCurrentRound) {
            const decisionContainer = document.querySelector("#decision-container");
            while (decisionContainer.firstChild) {
                decisionContainer.removeChild(decisionContainer.lastChild);
            }
        }
    }

    function resetStrikeCount() {
        playerRoundStrike = 0;
        computerRoundStrike = 0;
    }

    // get parameters prompt to play round
    function playRound(humanChoice, computerChoice) {
        clearResultsBoard();
        
        // Display what the user chose
        console.log("You chose: " + humanChoice);
        const decisionContainer = document.querySelector("#decision-container");
        const userChoice = document.createElement("p");
        userChoice.classList.add("user-selection");
        userChoice.textContent = "User chose: " + humanChoice;
        decisionContainer.appendChild(userChoice);
        
        // Display what the computer chose
        console.log("Opponnent chose: " + computerChoice);
        const opponentChoice = document.createElement("p");
        opponentChoice.classList.add("computer-selection");
        opponentChoice.textContent = "Computer chose: " + computerChoice;
        decisionContainer.appendChild(opponentChoice);
        
        // Begin matchup for this round and output the end result
        let endRound = checkMatchups(humanChoice.toUpperCase(), computerChoice.toUpperCase());
        
        // Display end result
        console.log(endRound);
        const resultWinner = document.createElement("p");
        resultWinner.classList.add("result-factor");
        resultWinner.textContent = endRound;
        decisionContainer.appendChild(resultWinner);
        displayCurrentRound = true;
        
        updateScore();
        resetStrikeCount();
    
        round += 1;
        if (round >= maxRound) {
            stopGame();
        }
    }

    function stopGame() {
        resetButton.style.display = "block";
        gameOver = true;
    }

    function playGame() {
        const maxRound = 5;
        while (round < maxRound) {
            // Play round for game
            playRound(getHumanChoice(), getComputerChoice());
            round += 1;
        }
    }