
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

            