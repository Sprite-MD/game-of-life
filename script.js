const grid = document.querySelector('.grid_container');

let cellGrid = []
let cellState = [];
let height = 20
let width = 20
let cont;

function create_grid(size){
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
    create_grid(20);
})

function pause(){
    clearTimeout(cont)
}

function play(){
    next()
    cont = setTimeout(play, 200)
}
