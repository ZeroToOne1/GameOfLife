const N = 100;
const ON = 1;
const OFF = 0;

let grid = new Array(N).fill(null).map(() => new Array(N).fill(OFF));
let intervalId;

function createCell(row, col) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener("click", toggleCellState);
    return cell;
}

function toggleCellState(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    grid[row][col] = 1 - grid[row][col];
    updateGridUI();
}

function updateGridUI() {
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.innerHTML = "";

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const cell = createCell(row, col);
            if (grid[row][col] === ON) {
                cell.classList.add("active");
            }
            gridContainer.appendChild(cell);
        }
    }
}

function updateGrid() {
    const newGrid = new Array(N).fill(null).map(() => new Array(N).fill(OFF));

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const total = (
                grid[(row - 1 + N) % N][(col - 1 + N) % N] + grid[(row - 1 + N) % N][col] + grid[(row - 1 + N) % N][(col + 1) % N] +
                grid[row][(col - 1 + N) % N] + grid[row][(col + 1) % N] +
                grid[(row + 1) % N][(col - 1 + N) % N] + grid[(row + 1) % N][col] + grid[(row + 1) % N][(col + 1) % N]
            );
            if (grid[row][col] === ON) {
                newGrid[row][col] = (total === 2 || total === 3) ? ON : OFF;
            } else {
                newGrid[row][col] = (total === 3) ? ON : OFF;
            }
        }
    }

    grid = newGrid;
    updateGridUI();
}

function setInitialState() {
    const select = document.getElementById("initialStateSelect");
    const selectedValue = select.value;

    if (selectedValue === "random") {
        randomizeInitialState();
    } else if (selectedValue === "glider") {
        setGliderInitialState();
    } else if (selectedValue === "blinker") {
        setBlinkerInitialState();
    } else if (selectedValue === "beehive") {
        setBeehiveInitialState();
    } else if (selectedValue === "boat") {
        setBoatInitialState();
    }
    // 添加更多初始状态设置的分支 ...

    updateGridUI();
}

function randomizeInitialState() {
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            grid[row][col] = Math.random() > 0.9 ? ON : OFF;
        }
    }
}

function setGliderInitialState() {
    // 设置滑翔机初始状态的代码
    // 将指定的细胞设为ON，形成一个滑翔机的形状
    // 获取滑翔机的初始坐标
    const gliderCoords = [
        [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ];

    // 清空当前的细胞状态
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            grid[row][col] = OFF;
        }
    }

    // 设置滑翔机的细胞状态
    for (const [row, col] of gliderCoords) {
        grid[row][col] = ON;
    }
}

function setCustomInitialState(coords) {
    // 清空当前的细胞状态
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            grid[row][col] = OFF;
        }
    }

    // 设置自定义初始状态的细胞
    for (const [row, col] of coords) {
        grid[row][col] = ON;
    }
}

// 示例：闪烁器（Blinker）
function setBlinkerInitialState() {
    const blinkerCoords = [
        [1, 1], [1, 2], [1, 3]
    ];
    setCustomInitialState(blinkerCoords);
}

// 示例：蜂巢（Beehive）
function setBeehiveInitialState() {
    const beehiveCoords = [
        [1, 2], [1, 3], [2, 1], [2, 4], [3, 2], [3, 3]
    ];
    setCustomInitialState(beehiveCoords);
}

// 示例：船（Boat）
function setBoatInitialState() {
    const boatCoords = [
        [1, 1], [1, 2], [2, 1], [2, 3], [3, 2]
    ];
    setCustomInitialState(boatCoords);
}

function startSimulation() {
    intervalId = setInterval(updateGrid, 200);
}

function stopSimulation() {
    clearInterval(intervalId);
}

updateGridUI();