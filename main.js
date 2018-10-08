MINES = 40; //Quantidade de minas
HEIGHT = 20; //Altura
WIDTH = 15; //Largura

function getUniqueRandomIndexesIn2DArray(table, indexes) {
    indexes = indexes ? indexes : [];
    for (var i = indexes.length; i < MINES; i++) {
        var random_cell = Math.floor(Math.random() * WIDTH); //De acordo com a largura
        var random_row = Math.floor(Math.random() * HEIGHT); //De acordo com a altura
        for (var j = 0; j < indexes.length; j++) { //indexes é um argumento da função
            if (indexes[j][0] === random_cell && 
                indexes[j][1] === random_row) {
                return arguments.callee(table, indexes);
            }
        }
        indexes.push([random_row, random_cell]);
    }
    return indexes;
}

//Números em torno das minas
function getAdjacentCellIndexes(x, y) {
    return $.grep([
        [ x - 1, y - 1 ], 
        [ x, y - 1 ], 
        [ x + 1, y - 1 ],
        [ x - 1, y ],
        [ x + 1, y ],
        [ x - 1, y + 1 ],
        [ x, y + 1 ],
        [ x + 1, y + 1 ]
    ], function (element) {
        return element[0] >= 0 && element[1] >= 0 &&
        element[1] < WIDTH && element[0] < HEIGHT
    });
}

//Criação da tabela
var field_matrix = [];
var field = $("#field table");
for (var i = 0; i < HEIGHT; i++) {
    var row_vector = [];
    var row = $("<tr>");
    for (var j = 0; j < WIDTH; j++) {
        var mine = $("<td>");
        mine.data("mines", 0);

        row.append(mine);
        row_vector.push(mine)
    }
    field.append(row);
    field_matrix.push(row_vector);
}

var mine_indexes = getUniqueRandomIndexesIn2DArray(field_matrix);
$.each(mine_indexes, function(index, coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    var mine = $(field_matrix[x][y]);
    mine.addClass("mine");
});

$.each(mine_indexes, function (index, coordinates) {
    var adjacent_cells = getAdjacentCellIndexes(coordinates[0], coordinates[1]);
    $.each(adjacent_cells, function(index, coordinates) {
        var x = coordinates[0];
        var y = coordinates[1];
        var cell = $(field_matrix[x][y]);
        if (!cell.hasClass("mine")) {
            var num_mines = cell.data("mines") + 1;
            cell.data("mines", num_mines);
            switch (num_mines) {
                case 1:
                    cell.css("color", "blue");
                    break;
                case 2:
                    cell.css("color", "green");
                    break;
                case 3:
                    cell.css("color", "red");
                    break;
                case 4:
                    cell.css("color", "navy");
                    break;
                case 5:
                    cell.css("color", "maroon");
                    break;
                case 6:
                    cell.css("color", "teal");
                    break;
                case 7:
                    cell.css("color", "DarkMagenta");
                    break;
                case 8:
                    cell.css("color", "black");
                    break;
            }
        }
    })
});


$.each(field_matrix, function(index, row) {
    $.each(row, function(index, cell) {
        var number = $(cell).data("mines");
        console.log(number)
        if (number > 0) {
            $(cell).append(number);
        }
    });
});