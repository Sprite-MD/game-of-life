const grid = document.querySelector('.grid_container');

let cellGrid = []
let cellState = [];
let height = document.querySelector('#user_row').value
let width = document.querySelector('#user_column').value

function create_grid(){
    grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for(row = 0; row <= height; row++){
        const gridRow = [];
        const cellRow = [];
        
        for (col = 0; col < width; col++){
            const cell = document.createElement('div');
            cell.setAttribute("onclick", `cell_click(${row},${col})`)
            cell.classList.add('cell');
            cell.classList.add('grid_item');

            gridRow.push(cell)
            cellRow.push(0)

            grid.append(cell)
        }

        cellGrid.push(gridRow)
        cellState.push(cellRow)
    }
    
    console.log(cellGrid)
    console.log(cellState)
}

function next(){
    let nextState = []

    for (row = 0; row < height; row++){
        const nextRow = []
        for (col = 0; col < width; col++){

            let liveNeighbors = 0

            for (i = row - 1; i <= row + 1; i++){
                for (j = col - 1; j <= col + 1; j++){
                    
                    if((0 <= j && j < width) && (0 <= i && i < height)){
                        liveNeighbors += cellState[i][j]
                    }

                }
            }

            liveNeighbors -= cellState[row][col]

            let nextValue = cellState[row][col] ? alive[liveNeighbors] : dead[liveNeighbors]
            nextRow.push(nextValue)
            
            if (cellState[row][col] != nextValue){
                cellGrid[row][col].classList.toggle('active')
            }

        }
        nextState.push(nextRow)
    }
    cellState = nextState
}

// Look up array for cell state
alive = [0,0,1,1,0,0,0,0,0]
dead = [0,0,0,1,0,0,0,0,0]

function cell_click(row, col){
    cellGrid[row][col].classList.toggle('active')
    if (cellState[row][col] == 0){
        cellState[row][col] = 1
    }
    else {
        cellState[row][col] = 0
    }
}

window.addEventListener('load', (e) => {
    create_grid();
})

let cont;

function pause(){
    clearTimeout(cont)
}

function play(){
    next()
    cont = setTimeout(play, speed)
}

let speed
const slideValue = document.querySelector('.slide_value')
const slider = document.querySelector('.slider')
slideValue.innerHTML = slider.value

slider.oninput = () => {
    slideValue.innerHTML = slider.value
    speed = slider.value * 5
}

// 50% chance for a cell to be active
function rng_generate(){
    for (row = 0; row < height; row++){
        for (col = 0; col < width; col++){
            if (Math.random() >= 0.5){
                cellGrid[row][col].classList.add('active')
                cellState[row][col] = 1
            }
        }
    }
}

function clear_grid(){
    for (row = 0; row < height; row++){
        for (col = 0; col < width; col++){
            if (cellState[row][col] == 1){
                cellGrid[row][col].classList.remove('active')
                cellState[row][col] = 0
            }
        }
    }
}

function save_settings(){
    height = document.querySelector('#user_row').value
    width = document.querySelector('#user_column').value

    // Deletes current grid and make new one 
    while (grid.firstChild){
        grid.removeChild(grid.lastChild);
    }
    cellGrid = []
    cellState = []
    create_grid()
}

function glider(){
    height = 50
    width = 50
    clear_grid()
    
    glider_box()
    queen_bee()
    shuttle()
    
}

function glider_box(){
    cellGrid[10][9].classList.add('active')
    cellState[10][9] = 1
    cellGrid[10][10].classList.add('active')
    cellState[10][10] = 1
    cellGrid[11][9].classList.add('active')
    cellState[11][9] = 1
    cellGrid[11][10].classList.add('active')
    cellState[11][10] = 1

    cellGrid[8][43].classList.add('active')
    cellState[8][43] = 1
    cellGrid[8][44].classList.add('active')
    cellState[8][44] = 1
    cellGrid[9][43].classList.add('active')
    cellState[9][43] = 1
    cellGrid[9][44].classList.add('active')
    cellState[9][44] = 1
}

function queen_bee(){
    cellGrid[10][19].classList.add('active')
    cellGrid[11][19].classList.add('active')
    cellGrid[12][19].classList.add('active')

    cellGrid[9][20].classList.add('active')
    cellGrid[13][20].classList.add('active')

    cellGrid[8][21].classList.add('active')
    cellGrid[8][22].classList.add('active')
    cellGrid[14][21].classList.add('active')
    cellGrid[14][22].classList.add('active')

    cellGrid[11][23].classList.add('active')
    cellGrid[9][24].classList.add('active')
    cellGrid[13][24].classList.add('active')

    cellGrid[10][25].classList.add('active')
    cellGrid[11][25].classList.add('active')
    cellGrid[12][25].classList.add('active')
    cellGrid[11][26].classList.add('active')

    cellState[10][19] = 1
    cellState[11][19] = 1
    cellState[12][19] = 1
    cellState[9][20] = 1
    cellState[13][20] = 1
    cellState[8][21] = 1
    cellState[8][22] = 1
    cellState[14][21] = 1
    cellState[14][22] = 1
    cellState[11][23] = 1
    cellState[9][24] = 1
    cellState[13][24] = 1
    cellState[10][25] = 1
    cellState[11][25] = 1
    cellState[12][25] = 1
    cellState[11][26] = 1
}

function shuttle(){
    cellGrid[8][29].classList.add('active')
    cellGrid[9][29].classList.add('active')
    cellGrid[10][29].classList.add('active')
    cellGrid[8][30].classList.add('active')
    cellGrid[9][30].classList.add('active')
    cellGrid[10][30].classList.add('active')

    cellGrid[7][31].classList.add('active')
    cellGrid[11][31].classList.add('active')
    cellGrid[6][33].classList.add('active')
    cellGrid[7][33].classList.add('active')
    cellGrid[11][33].classList.add('active')
    cellGrid[12][33].classList.add('active')

    cellState[8][29] = 1
    cellState[9][29] = 1
    cellState[10][29] = 1
    cellState[8][30] = 1
    cellState[9][30] = 1
    cellState[10][30] = 1
    cellState[7][31] = 1
    cellState[11][31] = 1
    cellState[6][33] = 1
    cellState[7][33] = 1
    cellState[11][33] = 1
    cellState[12][33] = 1


}