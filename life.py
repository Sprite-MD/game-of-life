
def next(grid, rows, cols):
    future = [[0 for i in range(rows)] for j in range(cols)]

    # Loop through all cell
    for row in rows:
        for col in cols:

            # Num of living neighbors
            liveNeighbors = 0
            for i in range(-1, 2):
                for j in range(-1, 2):
                    if ((row + i >= 0 and row + i < rows) and (col + j > 0 and col + j < cols)):
                        liveNeighbors += grid[row + i][col + j]

            # current cell must be subtracted since ^^ added it to the counter
            liveNeighbors -= grid[row][col]

            # Rule One: Lonely cell dies
            if grid[row][col] == 1 and liveNeighbors < 2:
                future[row][col] == 0

            # Rule Two: Overpopulated cell dies
            elif grid[row][col] == 1 and liveNeighbors > 3:
                future[row][col] == 0

            # Rule Three: New cell is born
            elif grid[row][col] == 0 and liveNeighbors == 3:
                future[row][col] == 1

            # Nothing changes
            else:
                future[row][col] == grid[row][col]

