class Grid {
    
    /**
     * Constructor
     * @param {number} width - width of the grid 
     * @param {number} height - height of the grid
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createGrid(width, height);
        this.steps = 0;
    }

    /**
     * Create an empty grid of a specific size
     * @param {number} width 
     * @param {number} height 
     * @returns {Array[Array[number]]}
     */
    createGrid(width, height) {
        let grid = [];
        let line;
        for (let y = 0; y < height; y++) {
            line = [];
            for (let x = 0; x < width; x++) {
                line.push(0)
            }
            grid.push(line);
        }
        return grid;
    }

    /**
     * As a cell can be dead of alive, this function
     * change a cell status from one to the other
     * @param {number} x - abscissa of the cell
     * @param {number} y - ordinate of the cell
     * @returns {number} the new status of the cell
     */
    reverseStatus(x, y) {
        this.grid[y][x] = this.grid[y][x] == 1 ? 0 : 1;
        return this.grid[y][x]
    }

    /**
     * Get all neighors cells status
     * @param {number} x
     * @param {number} y 
     * @returns {Array[number]}
     */
    getNeighors(x, y) {
        let neighborsCoords = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
            [x, y + 1],
            [x - 1, y + 1],
            [x - 1, y]
        ];
        let neighbors = [];
        neighborsCoords.forEach(neighbor => {
            let [xi, yi] = neighbor;
            if (0 <= xi && xi < this.width && 0 <= yi && yi < this.height) {
                neighbors.push(this.grid[yi][xi]);
            }
        });
        return neighbors;
    }

    /**
     * Update the whole grid according to Conway's rules
     */
    addStep() {
        let grid = [];
        let neighbors;
        let cellsAlive;
        let line;
        for (let y=0; y < this.height; y++) {
            line = [];
            for (let x=0; x < this.width; x++) {
                neighbors = this.getNeighors(x, y);
                cellsAlive = neighbors.reduce((prev, current) => {
                    return current == 1 ? prev + 1 : prev;
                }, 0);
                line.push(Number((cellsAlive == 3) || (this.grid[y][x] == 1 && cellsAlive == 2)))
            }
            grid.push(line);
        }
        this.grid = grid;
        this.setSteps(this.getSteps() + 1);
    }

    /**
     * Change the number of steps
     * @param {number} value 
     * @returns {number} the new value
     */
    setSteps(value) {
        this.steps = value;
        return this.steps;
    }

    /**
     * Get the number of steps
     * @returns {number}
     */
    getSteps() {
        return this.steps;
    }

    /**
     * Replace the actual grid by a new one completly empty
     */
    reset() {
        this.grid = this.createGrid(this.width, this.height);
    }
}