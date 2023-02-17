const animals = [['🐭', 'mouse', 'Jerry'],
['🐹', 'hamster', 'Biscuit'],
['🐰', 'rabbit', 'Bugs'],
['🦊', 'fox', 'Mrs. Fox'],
['🐻', 'bear', 'Paddington']
];

const food = [['🍎', 'apple', 10],
['🍐', 'pear', 12],
['🍊', 'tangerine', 15],
['🍋', 'lemon', 5],
['🍌', 'banana', 7]
];

const universes = [['🖤', 'DC', ['Superman', 'Batman', 'Wonder Woman']],
['❤️', 'Marvel', ['Iron Man', 'the Hulk', 'Black Widow']]
];

function getInfo(name, arr) {
    if (Array.isArray(arr)) {
        let header = `<h1>${name}</h1>`;
        let table = '<table>';

        for (let i = 0; i < arr.length; i++) {
            let row = '<tr>';

            for (let j = 0; j < arr[i].length; j++) {
                let cell = Array.isArray(arr[i][j]) ? arr[i][j].join(';') : arr[i][j];
                row += `<th>${cell}</th>`;
            }

            row += '</tr>';
            table += row;
        }

        table += '</table>';
        return header + table;
    }
}

let dom = getInfo('Animals info', animals);
dom += getInfo('Fruits info', food);
dom += getInfo('Universes info', universes);

document.write(dom);
