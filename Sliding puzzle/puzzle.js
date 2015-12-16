var table = document.getElementsByClassName("puzzle");
var nrMoves = 0;

var data = [];
var nrcasuta = 1;
for (var i = 0; i < 4; i++) {
    var newRow = [];
    for (var j = 0; j < 4; j++) {
        newRow.push({
            i: i,
            j: j,
            id: "c" + i + j,
        });
    }
    data.push(newRow);
}

console.log(data);

var blankspace;

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if ($("#" + data[i][j].id).html() === "") {
            blankspace = data[i][j];
        }
    }
}

var swap = function () {
    nrMoves++;
    var blanki = parseInt(blankspace.i);
    var blankj = parseInt(blankspace.j);
    var blankid = blankspace.id;

    var ID = this.id;

    var x = parseInt(ID[1]);
    var y = parseInt(ID[2]);

    if ((x === parseInt(blanki - 1) && y === blankj) ||
        (x === parseInt(blanki + 1) && y === blankj) ||
        (x === blanki && y === parseInt(blankj - 1)) ||
        (x === blanki && y === parseInt(blankj + 1))) {
        var cel1 = "#" + blankspace.id;
        var cel2 = "#" + data[x][y].id;

        var text1 = $("#" + cel1.id).text();
        var text2 = $("#" + data[x][y].id).text();

        $(cel1).text(text2);
        $(cel2).text(text1);

        $(cel1).css("background-color", "#0094ff");
        $(cel2).css("background-color", "#ffffff");

        blankspace = {
            i: x,
            j: y,
            id: ID
        };

        var won = true;

        for (var a = 0; a < 4; a++) {
            for (var b = 0; b < 4; b++) {
                if (a != 3 || b != 3) {
                    if (parseInt(a * 4 + b + 1) !== parseInt($("#" + data[a][b].id).text())) {
                        won = false;
                    }
                }
            }
        }
        if (won === true) {
            alert("Congratulations! You won in " + nrMoves + " moves!");
            location.reload();
        }
    }
}

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        $("#" + data[i][j].id).click(swap);
    }
}

var initialSwap = function (cel) {

    var cel1 = "#" + cel.id;
    var cel2 = "#" + blankspace.id;

    var text1 = $(cel1).text();
    var text2 = $(cel2).text();

    $(cel1).text(text2);
    $(cel2).text(text1);

    $(cel2).css("background-color", "#0094ff");
    $(cel1).css("background-color", "#ffffff");

    blankspace = {
        i: cel.i,
        j: cel.j,
        id: cel.id
    };
}

for (var it = 0 ; it < 50; it++) {
    var n = Math.floor((Math.random() * 10) + 1) % 4;
    var m = Math.floor((Math.random() * 10) + 1) % 4;
    initialSwap(data[m][n]);
}