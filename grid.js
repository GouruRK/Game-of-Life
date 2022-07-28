class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createGrid(width, height);
        this.steps = 0;
    }

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
        return grid
    }

    changeStatus(x, y) {
        this.grid[y][x] = this.grid[y][x] == 1 ? 0 : 1;
    }

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

    setSteps(value) {
        this.steps = value;
        return this.steps
    }

    getSteps() {
        return this.steps;
    }
    
    reverseStatus(x, y) {
        this.grid[y][x] = this.grid[y][x] == 1 ? 0 : 1
    }

    reset() {
        this.grid = this.createGrid(this.width, this.height)
    }
}