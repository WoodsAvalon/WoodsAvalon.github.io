

var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [];

var solution = [];

var puzzles = [
    "--74916-52---6-3-9-----7-1--586----4--3----9---62--1879-4-7---367-83----81--45---",
    "---26-7-168--7--9-19---45--82-1---4---46-29---5---3-28--93---74-4--5--367-3-18---",
    "1--489--673-----4------1295--712-6--5--7-3--8--6-967--9146------2-----378--512--4",
    "12-6-8---5842397-1-6-14----37--6158-691-8-2744587-2-13-3--2415-2-985-436---3-6-92"
]

var solutions = [
    "387491625241568379569327418758619234123784596496253187934176852675832941812945763",
    "435269781682571493197834562826195347374682915951743628519326874248957136763418259",
    "152489376739256841468371295387124659591763428246895713914637582625948137873512964",
    "123678945584239761967145328372461589691583274458792613836924157219857436745316892"
]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i<=9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    //pick puzzle/solution
    let ran = Math.floor(Math.random() * puzzles.length);
    for (let a = 0; a < 9; a++) {
        board[a] = puzzles[ran].slice(a*9,a*9+10);
        solution[a] = solutions[ran].slice(a*9,a*9+10);
    }

    // Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                console.log("horizontal line added r: " + r.toString() + " c: " + c.toString());
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                console.log("vertical line added r: " + r.toString() + " c: " + c.toString());
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") { 
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}