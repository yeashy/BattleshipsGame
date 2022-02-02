export function enemySpawnBigFunction(movingArr, standingArr, difficulty) {

    let newEnemyQ = getRandomInt(1, Math.ceil(3 * difficulty)); // quantity of new enemies depends on difficulty
    let newEnemyArr = []

    for (let i = 0; i < newEnemyQ; i++) {
        let type = getRandomInt(1, 4); // totally random type yeah

        if (type === 1) {
            type = 'slowMoving';
            let coords = getRandomCoordinates(newEnemyArr, 1); // new enemies can't spawn at the same coordinates because of the check
            let enemy = secondCheck(coords, type, movingArr, standingArr, newEnemyArr, 0); // it's very complicated recursive check
            if (enemy.spawn) {
                let newEnemy = {
                    x: enemy.x,
                    y: enemy.y,
                    hp: getRandomInt(1, Math.ceil(2 * difficulty)),
                    type: type
                }
                newEnemyArr.push(newEnemy);
            }
        }

        if (type === 2) {
            type = 'fastMoving';
            let coords = getRandomCoordinates(newEnemyArr, 1);
            let enemy = secondCheck(coords, type, movingArr, standingArr, newEnemyArr, 0);
            if (enemy.spawn) {
                let newEnemy = {
                    x: enemy.x,
                    y: enemy.y,
                    hp: 1,
                    type: type
                }
                newEnemyArr.push(newEnemy);
            }
        }

        if (type === 3) {
            type = 'weakStanding';
            let coords = getRandomCoordinates(newEnemyArr, 1);
            coords.y2 = (document.documentElement.clientHeight - 58) / 6 * getRandomInt(2, 5);
            let enemy = secondCheck(coords, type, movingArr, standingArr, newEnemyArr, 0);
            if (enemy.spawn) {
                let newEnemy = {
                    x: enemy.x,
                    y: enemy.y,
                    y2: enemy.y2,
                    hp: getRandomInt(1, 3),
                    type: type,
                    timer: (getRandomInt(2, 3) + getRandomInt(0, 9) / 10) * 1000
                }
                newEnemyArr.push(newEnemy);
            }
        }

        if (type === 4) {
            type = 'strongStanding';
            let coords = getRandomCoordinates(newEnemyArr, 1);
            coords.y2 = (document.documentElement.clientHeight - 58) / 6 * getRandomInt(3, 5);
            let enemy = secondCheck(coords, type, movingArr, standingArr, newEnemyArr, 0);
            if (enemy.spawn) {
                let newEnemy = {
                    x: enemy.x,
                    y: enemy.y,
                    y2: enemy.y2,
                    hp: getRandomInt(Math.ceil(2 * difficulty), Math.floor(3 * difficulty)),
                    type: type,
                    timer: (getRandomInt(2, 4) + getRandomInt(0, 9) / 10) * 1000
                }
                newEnemyArr.push(newEnemy);
            }
        }
    }

    return newEnemyArr;
}

export function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getRandomCoordinates(arr, attempt) { //like is said previously - // new enemies can't spawn at the same coordinates because of the check
    let x;

    if (document.documentElement.clientWidth < 1200) {
        x = (document.documentElement.clientWidth / 10) * getRandomInt(0, 9);
    }
    else x = (document.documentElement.clientWidth / 20) * getRandomInt(0, 19);

    let y = document.documentElement.clientHeight + 100;

    return firstCheck(x, y, arr, attempt); // first check verifies that enemies will spawn at different coords, otherwise this function will change coords
}

function firstCheck(x, y, arr, attempt) {
    let spawn = true;

    for (let i = 0; i < arr.length; i++) {
        if (x === arr[i].x && y === arr[i].y) {
            spawn = false;
            break;
        }
    }

    if (spawn === false) {
        if (attempt === 1) {
            return getRandomCoordinates(arr, attempt); // i hate the recursion 'cause it's easy to get confused in it
        }
        else {
            return {
                x: -1,
                y: -1
            }
        }
    }
    else {
        return {
            x: x,
            y: y
        }
    }
}

function secondCheck(coords, type, movingArr, standingArr, arr, attempt) { // i don't know how i made it
    let posibbleCells = [];
    let spawn = true;

    if (attempt >= help('countAttempts')) {
        if (type === 'weakStanding' || type === 'strongStanding') {
            if (posibbleCells.length > 0) {
                coords.x = posibbleCells[getRandomInt(0, getRandomInt(posibbleCells.length - 1))].x;
                coords.y2 = (document.documentElement.clientHeight - 58) / 6 * 5;
                spawn = true;
            }

            else return {
                spawn: false
            }
        }

        else return {
            spawn: false
        }
    }

    if (type === 'slowMoving') {
        standingArr.forEach(el => {
            if (el.x === coords.x) {
                spawn = false;
            }
        });
    }

    else if (type === 'fastMoving') {
        standingArr.forEach(el => {
            if (el.x === coords.x) {
                spawn = false;
            }
        });

        movingArr.forEach(el => {
            if (el.x === coords.x) {
                if (el.type === 'slowMoving') {
                    if (el.y > document.documentElement.clientHeight * 0.7) {
                        spawn = false;
                    }
                }
            }
        });
    }

    else if (type === 'weakStanding' || type === 'strongStanding') {
        standingArr.forEach(el => {
            if (el.x === coords.x) {
                if (el.y2 >= coords.y2) {
                    if (el.y2 < (document.documentElement.clientHeight - 58) / 6 * 5) {
                        posibbleCells.push(el.x);
                    }
                    spawn = false;
                }
            }
        });


    }

    if (spawn) {
        if (type === 'slowMoving' || type === 'fastMoving') return {
            spawn: spawn,
            x: coords.x,
            y: coords.y
        }
        else return {
            spawn: spawn,
            x: coords.x,
            y: coords.y,
            y2: coords.y2
        }
    }
    else return checkAnotherCell(coords, type, arr, ++attempt, movingArr, standingArr);
}

function checkAnotherCell(coords, type, arr, attempt, m, s) {
    let coordinates = firstCheck(coords.x, coords.y, arr, 2);
    if (coordinates.x === -1) return checkAnotherCell(coords.x + help('countX'), coords.y, type, arr, ++attempt, m, s);
    else {
        return secondCheck(coords, type, m, s, arr, ++attempt);
    }
}

function help(forWhat){ // quantity of cells where enemy can spawn depends on resolution (width)
    if(forWhat === 'countX'){
        if (document.documentElement.clientWidth < 1200) {
            return (document.documentElement.clientWidth / 10) 
        }
        return (document.documentElement.clientWidth / 20)
    }
    else if (forWhat === 'countAttempts'){
        if (document.documentElement.clientWidth < 1200) {
            return 11
        }
        return 21
    }
    
}