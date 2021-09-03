const boardStatus = [[null, null, null],
                     [null, null, null],
                     [null, null, null]
                    ]

let gameStatus = true
                    

const playerIcon = {
    '1' : 'X',
    '2' : 'O'
}
let whosTurnFlag = true

function getWhosTurn() {
    let player = null
    
    whosTurnFlag ? player = 1 : player = 2

    whosTurnFlag = !whosTurnFlag

    return player
}

function setBoardVal(box, playerIconID) {
    const row =  Math.floor(box.dataset.id / 3)
    const column = box.dataset.id % 3;
    if(boardStatus[row][column] === null) {
        boardStatus[row][column] = playerIcon[playerIconID]
        box.innerHTML = playerIcon[playerIconID]
    } else {
        alert('You cannot place your item there!')
    }
}


function reset_game() {
    gameStatus = true
    whosTurnFlag = true 
    
    document.querySelectorAll('.box').forEach((ele) => {
        ele.innerHTML = '';
    })

    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3 ; j++){
            boardStatus[i][j] = null
        }
    }

    const msg = 'Player 1\'s move! (Symbol: ' +  playerIcon[1] + ')'
    updateInformationBox(msg)
}

function box_click(e) {
    if (gameStatus === false) return
    const whosTurn = getWhosTurn()
    setBoardVal(e.target, whosTurn)
    const nextPlayer = whosTurn === 1 ? 2 : 1
    const msg = 'Player ' + nextPlayer + '\'s move! (Symbol: ' +  playerIcon[nextPlayer] + ')'
    updateInformationBox(msg)
    checkForWinner(whosTurn)
}
function updateInformationBox(message) {
    const infoBox = document.querySelector('#information_box')
    infoBox.innerHTML = message
}


function checkForWinner(currentPlayer){
    let foundMatch = false
    let isTie = false

    for(i = 0; i < 3; i++){
        // check for row
        if(boardStatus[i][1] !== null && (boardStatus[i][0] === boardStatus [i][1]) && (boardStatus [i][1] === boardStatus[i][2])){
            foundMatch = true
        }
        // check for column
        if(boardStatus[1][i] !== null && (boardStatus[0][i] === boardStatus [1][i]) && (boardStatus [1][i] === boardStatus[2][i])){
            foundMatch = true
        }

        if(foundMatch) {
            break
        }
    }

    if(!foundMatch && boardStatus[1][1] !== null) {
        // check for cross
        if(((boardStatus[0][0] === boardStatus[1][1]) && (boardStatus[1][1] == boardStatus[2][2]))
            || ((boardStatus[0][2] === boardStatus[1][1]) && (boardStatus[1][1] == boardStatus[2][0]))
        ) {
            foundMatch = true
        }
    }

    if(!foundMatch) {
        isTie = true
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3 ; j++){
                isTie = isTie && (boardStatus[i][j] !== null)
            }
        }
    
    }

    if(foundMatch) updateInformationBox(`Game won by <b>Player ${currentPlayer}</b>!`);
    if(isTie) updateInformationBox('It\'s a tie!')

    if(foundMatch || isTie) {
        gameStatus = false
    }
}

window.addEventListener('DOMContentLoaded', () => {
    reset_game()
    document.querySelectorAll('.box').forEach((box) => {
        box.addEventListener('click', box_click)
    })
    console.log('Game loaded.')
})