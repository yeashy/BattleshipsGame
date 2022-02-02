import { enemySpawnBigFunction } from "../components/functions/EnemySpawn";
import { getRandomInt } from "../components/functions/EnemySpawn";

import mainTheme from "../sounds/music/main-theme.mp3";
import gameTheme from "../sounds/music/game-theme.mp3";
import btnClick from "../sounds/sfx/btn-sound.mp3";
import bulletSpawnSound from "../sounds/sfx/bullet-spawn.mp3";
import bulletCrashSound from "../sounds/sfx/bullet-crash.mp3";
import catchBoostSound from "../sounds/sfx/catch-boost.mp3";
import enemyKilledSound from "../sounds/sfx/enemy-killed.mp3";
import gameLostSound from "../sounds/sfx/game-lost.mp3";
import playerLostHpSound from "../sounds/sfx/player-lost-hp.mp3";

let mainThemeS = new Audio(mainTheme);
let gameThemeS = new Audio(gameTheme);
let btnClickS = new Audio(btnClick);
let bulletSpawnS = new Audio(bulletSpawnSound);
let bulletCrashS = new Audio(bulletCrashSound);
let catchBoostS = new Audio(catchBoostSound);
let enemyKilledS = new Audio(enemyKilledSound);
let gameLostS = new Audio(gameLostSound);
let playerLostHpS = new Audio(playerLostHpSound);

const STARTED = "STARTED";
const MOVE = "MOVE";
const DIRECTION = "DIRECTION";
const BULLETSPAWN = "BULLETSPAWN";
const BULLETMOVE = "BULLETMOVE";
const LIFETIME = "LIFETIME";
const ENEMYSPAWN = "ENEMYSPAWN";
const ENEMYMOVE = "ENEMYMOVE";
const ENEMYSHOOT = "ENEMYSHOOT";
const ENEMYBULLETMOVE = "ENEMYBULLETMOVE";
const CHECKBOOM = "CHECKBOOM";
const FRAMECHANGE = "FRAMECHANGE";
const ENDALLGAME = "ENDALLGAME";
const INPUT = "INPUT";
const BOOSTMOVE = "BOOSTMOVE";
const BOOSTTIMEOUT = "BOOSTTIMEOUT";
const CHANGERULES = "CHANGERULES";
const CHANGEKEY = "CHANGEKEY";
const PAUSEGAME = "PAUSEGAME";
const GLOBALLIFETIME = "GLOBALLIFETIME";
const VOLUMECHANGE = "VOLUMECHANGE";

localStorage.setItem('leftKey', 'KeyA');
localStorage.setItem('rightKey', 'KeyD');

let gameMusicInterval, mainMusicInterval;

const gameReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case STARTED:
            newState.logic = { ...state.logic };
            newState.game.player = { ...state.game.player };

            newState.logic.difficulty = action.difficulty;
            if (action.screen === 'start') newState.game.player.score = 0;
            newState.logic.whichScreen = action.screen;

            if (action.screen === 'game') {
                newState.logic.screen.width = document.documentElement.clientWidth; // it is here to notice resolution change 'cause it makes enemies look bad
                newState.logic.screen.height = document.documentElement.clientHeight;

                newState.logic.volume = { ...state.logic.volume }

                mainThemeS.pause();
                clearInterval(mainMusicInterval);

                setTimeout(() => { // just like in screen container
                    gameThemeS.volume = newState.logic.volume.music;
                    gameThemeS.currentTime = 0;
                    gameThemeS.play();
                }, 1000);
                gameMusicInterval = setInterval(() => {
                    setTimeout(() => {
                        gameThemeS.volume = newState.logic.volume.music;
                        gameThemeS.currentTime = 0;
                        gameThemeS.play();
                    }, 1000);
                }, 411000);
            }

            btnClickS.play();

            return newState;

        case DIRECTION:
            newState.game.player = { ...state.game.player };
            if (action.direction !== 'same') newState.game.player.direction = action.direction; // if the direction is the same, the ship will move twice as fast
            return newState;

        case MOVE:
            newState.game.player = { ...state.game.player };
            newState.game.player.boost = { ...state.game.player.boost };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                if (action.direction === 'left') newState.game.player.position -= 0.15 * countPlayerSpeed(newState.game.player.boost.type); //simple moving logic
                else if (action.direction === 'right') newState.game.player.position += 0.15 * countPlayerSpeed(newState.game.player.boost.type);
            }

            return newState;

        case BULLETSPAWN:
            newState.game.player.bullets = { ...state.game.player.bullets };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                newState.game.player.bullets.bulletsArr.push({
                    x: document.getElementById('player').getBoundingClientRect().left + document.getElementById('player').clientWidth / 2 - 6, //quite weird way to set the bullet's x but it's ok
                    y: document.getElementById('player').clientHeight - 50,
                    id: newState.game.player.bullets.bulletCount
                });
                newState.game.player.bullets.bulletCount++;
                bulletSpawnS.play();
            }

            return newState;

        case BULLETMOVE:
            newState.game.player = { ...state.game.player };
            newState.game.enemies = { ...state.game.enemies };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                newState.game.player.bullets.bulletsArr.forEach((bullet, i) => {
                    bullet.y += 5;
                    if (document.documentElement.clientHeight - bullet.y < 30) newState.game.player.bullets.bulletsArr.splice(i, 1); // remove bullet if it's beyond the screen
                });
            }

            return newState;

        case ENEMYBULLETMOVE:
            newState.game.enemies.bullets = { ...state.game.enemies.bullets };
            newState.game = { ...state.game }; newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                newState.game.enemies.bullets.bulletsArr.forEach((el, i) => {
                    el.y -= 3;
                    if (el.y <= -50) newState.game.enemies.bullets.bulletsArr.splice(i, 1); // remove bullet if it's beyond the screen
                });
            }

            return newState;

        case LIFETIME:
            newState.game = { ...state.game };
            newState.logic.screen = { ...state.logic.screen };

            if (!newState.game.isPaused) newState.lifetime++; // actually i don't know what it's for when i have global lifetime, but i'm too lazy to re-associate whole gameplay process, so let it stay

            return newState;

        case GLOBALLIFETIME: // it needs only for change sfx volume in realtime
            newState.logic.screen = { ...state.logic.screen };
            newState.logic = { ...state.logic };
            newState.logic.volume = { ...state.logic.volume };
            newState.game = { ...state.game };

            newState.globalLifetime++;

            if (newState.logic.whichScreen === 'game') {
                if (document.documentElement.clientWidth !== newState.logic.screen.width || document.documentElement.clientHeight !== newState.logic.screen.height) {
                    newState.logic.screen.isChanged = true;
                    newState.game.isPaused = true;
                }
                else newState.logic.screen.isChanged = false;
            }

            gameThemeS.volume = newState.game.isPaused ? newState.logic.volume.music * 0.3 : newState.logic.volume.music;
            mainThemeS.volume = newState.logic.volume.music;
            btnClickS.volume = newState.logic.volume.sfx;
            bulletSpawnS.volume = newState.logic.volume.sfx;
            bulletCrashS.volume = newState.logic.volume.sfx;
            catchBoostS.volume = newState.logic.volume.sfx;
            enemyKilledS.volume = newState.logic.volume.sfx * 0.5;
            gameLostS.volume = newState.logic.volume.sfx;
            playerLostHpS.volume = newState.logic.volume.sfx;

            return newState;

        case ENEMYSPAWN:
            newState.game.enemies = { ...state.game.enemies };
            newState.logic = { ...state.logic };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                let newEnemies = enemySpawnBigFunction(newState.game.enemies.movingArr, newState.game.enemies.standingArr, state.logic.difficulty);
                newEnemies.forEach((el) => {
                    el.id = newState.game.enemies.enemyCount;
                    newState.game.enemies.allEnemies.push(el);
                    if (el.type === 'slowMoving' || el.type === 'fastMoving') { // enemy width and height depends on resolution. it makes the correct hitbox
                        if (el.type === 'slowMoving') {
                            el.width = document.documentElement.clientHeight / 8.9;
                            el.height = document.documentElement.clientHeight / 5.6;
                        }
                        else {
                            el.width = document.documentElement.clientHeight / 20.4;
                            el.height = document.documentElement.clientHeight / 10;
                        }
                        newState.game.enemies.movingArr.push(el);
                    }
                    else if (el.type === 'weakStanding' || el.type === 'strongStanding') {
                        if (el.type === 'weakStanding') {
                            el.width = document.documentElement.clientHeight / 15.6;
                            el.height = document.documentElement.clientHeight / 7.1;
                        }
                        else {
                            el.width = document.documentElement.clientHeight / 11.8;
                            el.height = document.documentElement.clientHeight / 6.9;
                        }
                        newState.game.enemies.standingArr.push(el);
                    }
                    newState.game.enemies.enemyCount++;
                });
            }

            return newState;

        case ENEMYMOVE:
            newState.game.enemies = { ...state.game.enemies };
            newState.game = { ...state.game };
            newState.game.player = { ...state.game.player };
            newState.game.player.boost = { ...state.game.player.boost };
            newState.logic = { ...state.logic };

            if (!newState.game.isPaused) {
                newState.game.enemies.allEnemies.forEach((el, i) => {
                    if (el.type === 'weakStanding' || el.type === 'strongStanding') {
                        if (el.y > el.y2) { // if standing enemy reached its cell, it has to stop moving
                            el.y -= countSpeedCoef(state.game.player.score, el.type, newState.game.player.boost.type);
                        }
                    }
                    else el.y -= countSpeedCoef(state.game.player.score, el.type, newState.game.player.boost.type);

                    if (newState.logic.enemyPassedScreen) { // if specified in the settings - kill the player if the opponent crossed the bottom edge of the screen
                        if (el.y <= 0) {
                            newState.game.player.hp = 0;
                        }
                    }
                    else { //else just remove enemy from all arrays
                        if (el.y <= (document.documentElement.clientHeight * -1) / 5) {
                            newState.game.enemies.allEnemies.splice(i, 1);
                            newState.game.enemies.standingArr.forEach((enemy, id) => {
                                if (el.id === enemy.id) newState.game.enemies.standingArr.splice(id, 1);
                            })
                            newState.game.enemies.movingArr.forEach((enemy, id) => {
                                if (el.id === enemy.id) newState.game.enemies.movingArr.splice(id, 1);
                            })
                            newState.game.enemies.allEnemies.splice(i, 1);
                        }
                    }
                });
            }

            return newState;

        case ENEMYSHOOT:
            newState.game.enemies = { ...state.game.enemies };
            newState.game.enemies.bullets = { ...state.game.enemies.bullets };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) {
                newState.game.enemies.standingArr.forEach(el => {

                    if (el.y <= el.y2) {
                        if (el.timer > 0) el.timer -= 20;
                        else { // if timer === 0 - enemy have to shoot and restore the timer
                            if (el.type === 'weakStanding') {
                                let shoot = true;

                                newState.game.enemies.allEnemies.forEach(enemy => {
                                    if (enemy.x === el.x && enemy.y < el.y && enemy.y > document.documentElement.clientHeight / 6) shoot = false; // don't shoot if enemy is beyond the gamescreen
                                })

                                if (shoot === true) {
                                    newState.game.enemies.bullets.bulletsArr.push({
                                        x: el.x + 15,
                                        y: el.y + 30,
                                        type: 'weakBullet',
                                        id: newState.game.enemies.bullets.bulletCount
                                    });
                                    newState.game.enemies.bullets.bulletCount++;
                                }
                                el.timer = (getRandomInt(2, 3) + getRandomInt(0, 9) / 10) * 1000; // it is quite random
                            }

                            else {
                                let shoot = true;

                                newState.game.enemies.allEnemies.forEach(enemy => {
                                    if (enemy.x === el.x && enemy.y < el.y && enemy.y > document.documentElement.clientHeight / 6) shoot = false;
                                })

                                if (shoot === true) {
                                    newState.game.enemies.bullets.bulletsArr.push({
                                        x: el.x + 15,
                                        y: el.y + 30,
                                        type: 'strongBullet',
                                        id: newState.game.enemies.bullets.bulletCount
                                    });
                                    newState.game.enemies.bullets.bulletCount++;
                                }
                                el.timer = (getRandomInt(2, 4) + getRandomInt(0, 9) / 10) * 1000; 
                            }
                        };
                    }
                });
            }

            return newState;

        case CHECKBOOM:
            newState.game.enemies = { ...state.game.enemies };
            newState.game.explosions = { ...state.game.explosions };
            newState.game.player = { ...state.game.player };
            newState.game.player.bullets = { ...state.game.player.bullets };
            newState.game.enemies.bullets = { ...state.game.enemies.bullets };
            newState.game = { ...state.game };
            newState.logic = { ...state.logic };
            newState.game.fallingBoost = { ...state.game.fallingBoost };
            newState.game.player.boost = { ...state.game.player.boost };

            if (!newState.game.isPaused) { 
                newState.game.enemies.allEnemies.forEach((enemy, i) => {// spawns explosion when enemy dies and removes the enemy
                    if (enemy.hp === 0) {
                        newState.game.player.score += 5 * Math.floor(newState.logic.difficulty * 2.9);

                        newState.game.enemies.standingArr.forEach((el, id) => {
                            if (el.id === enemy.id) newState.game.enemies.standingArr.splice(id, 1);
                        })
                        newState.game.enemies.movingArr.forEach((el, id) => {
                            if (el.id === enemy.id) newState.game.enemies.movingArr.splice(id, 1);
                        })
                        newState.game.enemies.allEnemies.splice(i, 1);

                        if (enemy.type !== 'slowMoving') newState.game.explosions.explosionsArr.push({
                            type: 'enemyDeath',
                            x: enemy.x - document.documentElement.clientHeight / 25,
                            y: enemy.y,
                            frame: 1,
                            id: newState.game.explosions.explosionCount
                        })
                        else newState.game.explosions.explosionsArr.push({
                            type: 'enemyDeath',
                            x: enemy.x - document.documentElement.clientHeight / 40,
                            y: enemy.y,
                            frame: 1,
                            id: newState.game.explosions.explosionCount
                        })
                        newState.game.explosions.explosionCount++;
                        enemyKilledS.play();

                        if (newState.game.fallingBoost.type === '' && newState.game.player.boost.type === '') { // probably spawns boost if enemy dies
                            let boostProbabilty = getRandomInt(1, 100);

                            if (boostProbabilty > 0 && boostProbabilty < 3) {
                                newState.game.fallingBoost.x = enemy.x + 15;
                                newState.game.fallingBoost.y = enemy.y + 30;
                                newState.game.fallingBoost.width = document.documentElement.clientHeight / 16;
                                newState.game.fallingBoost.type = 'heal';
                            }
                            else if (boostProbabilty > 2 && boostProbabilty < 5) {
                                newState.game.fallingBoost.x = enemy.x + 15;
                                newState.game.fallingBoost.y = enemy.y + 30;
                                newState.game.fallingBoost.width = document.documentElement.clientHeight / 21.8;
                                newState.game.fallingBoost.type = 'speed';
                            }
                            else if (boostProbabilty > 4 && boostProbabilty < 7) {
                                newState.game.fallingBoost.x = enemy.x + 15;
                                newState.game.fallingBoost.y = enemy.y + 30;
                                newState.game.fallingBoost.width = document.documentElement.clientHeight / 40;
                                newState.game.fallingBoost.type = 'shootSpeed';
                            }
                            else if (boostProbabilty > 6 && boostProbabilty < 9) {
                                newState.game.fallingBoost.x = enemy.x + 15;
                                newState.game.fallingBoost.y = enemy.y + 30;
                                newState.game.fallingBoost.width = document.documentElement.clientHeight / 8.3;
                                newState.game.fallingBoost.type = 'slow';
                            }
                        }
                    }

                    if ((enemy.y <= document.getElementById('player').clientHeight) && (enemy.x + enemy.width >= document.getElementById('player').getBoundingClientRect().left && enemy.x <= document.getElementById('player').clientWidth + document.getElementById('player').getBoundingClientRect().left)) {
                        newState.game.enemies.standingArr.forEach((el, id) => { // if enemy crashed into player - substracts players hp depending on difficulty and spawns enemydeath explosion 
                            if (el.id === enemy.id) newState.game.enemies.standingArr.splice(id, 1);
                        })
                        newState.game.enemies.movingArr.forEach((el, id) => {
                            if (el.id === enemy.id) newState.game.enemies.movingArr.splice(id, 1);
                        })
                        newState.game.enemies.allEnemies.splice(i, 1);
                        newState.game.player.hp -= Math.floor(2.9 * state.logic.difficulty) * 10;
                        playerLostHpS.play();

                        newState.game.explosions.explosionsArr.push({
                            type: 'enemyDeath',
                            x: enemy.x,
                            y: enemy.y,
                            frame: 1,
                            id: newState.game.explosions.explosionCount,
                            isPlayerDamaged: true
                        })
                        newState.game.explosions.explosionCount++;
                        enemyKilledS.play();
                    }

                    newState.game.player.bullets.bulletsArr.forEach((bullet, id) => { // if bullet hit the enemy - does what it has to do
                        if ((bullet.y <= enemy.y && bullet.y >= enemy.y - enemy.height + 40) && (bullet.x + 11 >= enemy.x && bullet.x <= enemy.x + enemy.width) && bullet.y <= document.documentElement.clientHeight - 120) {
                            enemy.hp--;
                            newState.game.player.bullets.bulletsArr.splice(id, 1);
                            newState.game.explosions.explosionsArr.push({
                                type: 'bulletCrash',
                                x: bullet.x - 20,
                                y: bullet.y + 42,
                                frame: 1,
                                id: newState.game.explosions.explosionCount
                            })
                            newState.game.explosions.explosionCount++;
                            bulletCrashS.play();
                        }
                    })
                })

                newState.game.enemies.bullets.bulletsArr.forEach((bullet, i) => { //if enemy bullet hit the player - substracts hp and spawn bulletcrash explosion. simple as always
                    if ((bullet.y <= document.getElementById('player').clientHeight) && (bullet.x + 15 >= document.getElementById('player').getBoundingClientRect().left && bullet.x <= document.getElementById('player').getBoundingClientRect().left + document.getElementById('player').clientWidth)) { // :))))
                        if (bullet.type === 'weakBullet') {
                            if (newState.logic.difficulty === 1) newState.game.player.hp -= 10;
                            else if (newState.logic.difficulty === 1.2) newState.game.player.hp -= 15;
                            else newState.game.player.hp -= 20;
                        }
                        else {
                            if (newState.logic.difficulty === 1) newState.game.player.hp -= 15;
                            else if (newState.logic.difficulty === 1.2) newState.game.player.hp -= 20;
                            else newState.game.player.hp -= 30;
                        }

                        playerLostHpS.play();

                        newState.game.enemies.bullets.bulletsArr.splice(i, 1);
                        newState.game.explosions.explosionsArr.push({
                            type: 'bulletCrash',
                            x: bullet.x - 20,
                            y: bullet.y - 28,
                            frame: 1,
                            id: newState.game.explosions.explosionCount,
                            isPlayerDamaged: true
                        })
                        newState.game.explosions.explosionCount++;
                        bulletCrashS.play();
                    }
                })

                if (newState.game.player.hp <= 0) { // spawns playerdeath explosion if player is dead
                    newState.game.explosions.explosionsArr.push({
                        type: 'playerDeath',
                        x: document.getElementById('player').getBoundingClientRect().left - document.getElementById('player').clientWidth / 2,
                        y: 0,
                        frame: 1,
                        id: newState.game.explosions.explosionCount
                    })
                    newState.game.player.position = -50;
                    newState.game.explosions.explosionCount++;
                    gameLostS.play();
                }
            }

            return newState;

        case FRAMECHANGE:
            newState.game.explosions = { ...state.game.explosions };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) { // this is for change frames of explosions on the screen
                newState.game.explosions.explosionsArr.forEach((el, i) => {
                    el.frame++;
                    if (el.frame >= 12) {
                        newState.game.explosions.explosionsArr.splice(i, 1);
                        if (el.type === 'playerDeath') {
                            newState.game.isEnded = true;
                        }
                    }
                });
            }

            return newState;

        case ENDALLGAME:
            let leaderboard = state.logic.leaderboard.slice();
            let score = state.game.player.score;
            // return almost all parametres to initial values
            newState.lifetime = 0;
            newState.game.player.hp = 100;
            newState.game.player.boost.type = '';
            newState.game.player.boost.timeout = 0;
            newState.game.player.direction = 'none';
            newState.game.player.position = 0;
            newState.game.player.bullets.bulletsArr = [];
            newState.game.player.bullets.bulletCount = 0;
            newState.game.enemies.bullets.bulletsArr = [];
            newState.game.enemies.bullets.bulletCount = 0;
            newState.game.enemies.movingArr = [];
            newState.game.enemies.standingArr = [];
            newState.game.enemies.allEnemies = [];
            newState.game.enemies.enemyCount = 0;
            newState.game.explosions.explosionCount = 0;
            newState.game.explosions.explosionsArr = [];
            newState.game.fallingBoost.type = '';
            newState.game.fallingBoost.x = 0;
            newState.game.fallingBoost.y = 0;
            newState.game.isEnded = false;
            newState.game.isPaused = false;

            if (action.typeOfEnd === 'lost') { // if player dies - end the game and move to the input or result screen
                newState.logic.screen.width = 0;
                newState.logic.screen.height = 0;
                newState.logic.screen.isChanged = false;
                let obj = sortInLeaderBoard(leaderboard, score);
                if (obj.inLeaderboard) { // if player score in top-5 on leaderboard
                    newState.logic.leaderboard = obj.array;
                    newState.logic.whichScreen = 'input';
                }
                else {
                    newState.logic.leaderboard = leaderboard;
                    newState.logic.whichScreen = 'result';
                }
                newState.game.player.score = score;
                newState.logic.difficulty = 0;

                gameThemeS.pause();
                clearInterval(gameMusicInterval);

                setTimeout(() => { // second run main theme and so on (like in screen container)
                    mainThemeS.currentTime = 0;
                    mainThemeS.play();
                }, 1000);
                mainMusicInterval = setInterval(() => {
                    setTimeout(() => {
                        mainThemeS.currentTime = 0;
                        mainThemeS.play();
                    }, 1000);
                }, 236000);
            }
            else if (action.typeOfEnd === 'restart') { // restart whole game, score doesn't sort in leaderboard
                newState.logic.whichScreen = 'game';
                newState.game.player.score = 0;

                gameThemeS.pause();
                clearInterval(gameMusicInterval);

                setTimeout(() => {
                    gameThemeS.currentTime = 0;
                    gameThemeS.play();
                }, 1000);
                gameMusicInterval = setInterval(() => {
                    setTimeout(() => {
                        gameThemeS.currentTime = 0;
                        gameThemeS.play();
                    }, 1000);
                }, 411000);
            }
            else if (action.typeOfEnd === 'backToMain') { // end game and score doesn't sort in leaderboard
                newState.logic.screen.width = 0;
                newState.logic.screen.height = 0;
                newState.logic.screen.isChanged = false;
                newState.logic.whichScreen = 'start';
                newState.game.player.score = 0;

                gameThemeS.pause();
                clearInterval(gameMusicInterval);

                setTimeout(() => {
                    mainThemeS.currentTime = 0;
                    mainThemeS.play();
                }, 1000);
                mainMusicInterval = setInterval(() => {
                    setTimeout(() => {
                        mainThemeS.currentTime = 0;
                        mainThemeS.play();
                    }, 1000);
                }, 236000);
            }

            return newState;

        case INPUT:
            newState.logic = { ...state.logic };
            newState.game.player = { ...state.game.player };
            newState.logic.leaderboard.forEach(el => {
                if (el.name === '!!!') el.name = action.name; // replace the name of new top-5 player after he enter it
            })
            newState.logic.whichScreen = 'result';

            return newState;

        case BOOSTMOVE:
            newState.game.fallingBoost = { ...state.game.fallingBoost };
            newState.game.player.boost = { ...state.game.player.boost };
            newState.game.player = { ...state.game.player };
            newState.game = { ...state.game };

            if (!newState.game.isPaused) { // just boost move, like bullets or enemies
                if (newState.game.fallingBoost.type !== '') {
                    newState.game.fallingBoost.y -= 1;
                    if (newState.game.fallingBoost.y <= -50) {
                        newState.game.fallingBoost.type = '';
                        newState.game.fallingBoost.x = 0;
                        newState.game.fallingBoost.y = 0;
                    }

                    if ((newState.game.fallingBoost.y <= document.getElementById('player').clientHeight) && (newState.game.fallingBoost.x + newState.game.fallingBoost.width >= document.getElementById('player').getBoundingClientRect().left && newState.game.fallingBoost.x <= document.getElementById('player').getBoundingClientRect().left + document.getElementById('player').clientWidth)) {
                        let isCatched = false;//cheks that player takes the boost
                        if (newState.game.fallingBoost.type === 'heal') {
                            if (newState.game.player.hp < 100) { // you don't need heal if your hp is 100 isn't it?
                                newState.game.player.boost.type = 'Heal (+40hp)';
                                newState.game.player.boost.timeout = 4;
                                newState.game.player.hp += 40;
                                isCatched = true;
                                if (newState.game.player.hp > 100) newState.game.player.hp = 100;
                            }
                        }
                        else if (newState.game.fallingBoost.type === 'speed') {
                            newState.game.player.boost.type = 'Increase move speed';
                            newState.game.player.boost.timeout = 15;
                            isCatched = true;
                        }
                        else if (newState.game.fallingBoost.type === 'slow') {
                            newState.game.player.boost.type = 'Decrease enemy speed';
                            newState.game.player.boost.timeout = 17;
                            isCatched = true;
                        }
                        else if (newState.game.fallingBoost.type === 'shootSpeed') {
                            newState.game.player.boost.type = 'Increase rate of fire';
                            newState.game.player.boost.timeout = 10;
                            isCatched = true;
                        }

                        if (isCatched) {
                            newState.game.fallingBoost.type = '';
                            newState.game.fallingBoost.y = 0;
                            newState.game.fallingBoost.x = 0;
                            catchBoostS.play();
                        }
                    }
                }
            }

            return newState;

        case BOOSTTIMEOUT:
            newState.game.player.boost = { ...state.game.player.boost };
            newState.lifetime++;

            if (!newState.game.isPaused) { // just moves boost timeout and removes boost if time === 0
                if (newState.game.player.boost.type !== '') {
                    newState.game.player.boost.timeout -= 1;
                    if (newState.game.player.boost.timeout <= 0) {
                        newState.game.player.boost.type = '';
                        newState.game.player.boost.timeout = 0;
                    }
                }
            }

            return newState;

        case CHANGERULES: // yeah i was born to change the rules!
            newState.logic = { ...state.logic };
            if (newState.logic.enemyPassedScreen) newState.logic.enemyPassedScreen = false;
            else newState.logic.enemyPassedScreen = true;

            return newState;

        case CHANGEKEY: //simple
            newState.logic.controls = { ...state.logic.controls }

            if (action.key === 'left') {
                newState.logic.controls.leftKey = action.code;
                localStorage.setItem('leftKey', action.code);
            }
            else if (action.key === 'right') {
                newState.logic.controls.rightKey = action.code;
                localStorage.setItem('rightKey', action.code);
            }

            return newState;

        case PAUSEGAME:
            newState.game = { ...state.game };
            newState.game.isPaused = newState.game.isPaused ? false : true

            return newState;

        case VOLUMECHANGE:
            newState.logic.volume = { ...state.logic.volume };

            if (action.target === 'sfx') newState.logic.volume.sfx = action.value;
            else newState.logic.volume.music = action.value;

            return newState;

        default:
            return newState;
    }
}

let initialState = {
    globalLifetime: 0,
    lifetime: 0,
    logic: {
        controls: {
            leftKey: 'KeyA',
            rightKey: 'KeyD',
            shootKey: 'Space'
        },
        difficulty: 0,
        whichScreen: 'initial',
        leaderboard: [{ name: '', score: 0 }, { name: "", score: 0 }, { name: "", score: 0 }, { name: "", score: 0 }, { name: "", score: 0 }],
        enemyPassedScreen: true,
        screen: {
            width: 0,
            height: 0,
            isChanged: false
        },
        volume: {
            music: 1,
            sfx: 1
        }
    },
    game: {
        player: {
            hp: 100,
            score: 0,
            direction: 'none',
            position: 0,
            bullets: {
                bulletCount: 0,
                bulletsArr: []
            },
            boost: {
                type: '',
                timeout: 0
            }
        },
        enemies: {
            movingArr: [],
            standingArr: [],
            allEnemies: [],
            enemyCount: 0,
            bullets: {
                bulletCount: 0,
                bulletsArr: []
            }
        },
        explosions: {
            explosionsArr: [],
            explosionCount: 0
        },
        fallingBoost: {
            x: 0,
            y: 0,
            width: 0,
            type: ''
        },
        isEnded: false,
        isPaused: false
    }
}

export function chooseDir(btn) {
    if (btn === localStorage.getItem('rightKey')) return (dispatch) => {
        dispatch(directionPlayerActionCreator('right'))
    }
    else if (btn === localStorage.getItem('leftKey')) return (dispatch) => {
        dispatch(directionPlayerActionCreator('left'))
    }
    else if (btn === 'none') return (dispatch) => {
        dispatch(directionPlayerActionCreator('none'))
    }
    else return (dispatch) => {
        dispatch(directionPlayerActionCreator('same'))
    }
}

export function chooseMoveDir(direction) {
    if ((document.getElementById('player').clientWidth + document.getElementById('player').getBoundingClientRect().left < document.documentElement.clientWidth) // cheks borders of the screen
        && direction === 'right') {
        return (dispatch) => {
            dispatch(movePlayerActionCreator('right'));
        };
    }
    else if (document.getElementById('player').getBoundingClientRect().left > 0 && direction === 'left') { // same as right
        return (dispatch) => {
            dispatch(movePlayerActionCreator('left'));
        };
    }
    else return (dispatch) => {
        dispatch(movePlayerActionCreator('none'));
    }
}

export function bulletSpawn() {
    return (dispatch) => {
        dispatch(bulletSpawnActionCreator());
    };
}

export function bulletMove() {
    return (dispatch) => {
        dispatch(bulletMoveActionCreator());
    }
}

export function enemyBulletMove() {
    return (dispatch) => {
        dispatch(enemyBulletMoveActionCreator());
    }
}

export function enemyMove() {
    return (dispatch) => {
        dispatch(enemyMoveActionCreator());
    }
}

export function spawnEnemy() {
    return (dispatch) => {
        dispatch(spawnEnemyActionCreator());
    }
}

export function checkEnemyShoot() {
    return (dispatch) => {
        dispatch(checkEnemyShootActionCreator());
    }
}

export function checkBooms() {
    return (dispatch) => {
        dispatch(checkBoomsActionCreator());
    }
}

export function frameChange() {
    return (dispatch) => {
        dispatch(frameChangeActionCreator());
    }
}

export function endAllGame(type) {
    return (dispatch) => {
        dispatch(endAllGameActionCreator(type));
    }
}

export function boostMove() {
    return (dispatch) => {
        dispatch(boostMoveActionCreator());
    }
}

export function boostTimeout() {
    return (dispatch) => {
        dispatch(boostTimeoutActionCreator());
    }
}

export function PauseGame() {
    return (dispatch) => {
        dispatch(PauseGameActionCreator());
    }
}

export function lifeTime() {
    return (dispatch) => {
        dispatch(lifetimeAC())
    }
}

export function globalLifetime() {
    return (dispatch) => {
        dispatch(globalLifetimeActionCreator());
    }
}

function movePlayerActionCreator(direction) {
    return {
        type: MOVE,
        direction: direction
    }
}

function directionPlayerActionCreator(direction) {
    return {
        type: DIRECTION,
        direction: direction
    }
}

function bulletSpawnActionCreator() {
    return {
        type: BULLETSPAWN
    }
}

function bulletMoveActionCreator() {
    return {
        type: BULLETMOVE
    }
}

function enemyMoveActionCreator() {
    return {
        type: ENEMYMOVE
    }
}

function spawnEnemyActionCreator() {
    return {
        type: ENEMYSPAWN
    }
}

function checkEnemyShootActionCreator() {
    return {
        type: ENEMYSHOOT
    }
}

function enemyBulletMoveActionCreator() {
    return {
        type: ENEMYBULLETMOVE
    }
}

function checkBoomsActionCreator() {
    return {
        type: CHECKBOOM
    }
}

function frameChangeActionCreator() {
    return {
        type: FRAMECHANGE
    }
}

function boostMoveActionCreator() {
    return {
        type: BOOSTMOVE
    }
}

function boostTimeoutActionCreator() {
    return {
        type: BOOSTTIMEOUT
    }
}

function PauseGameActionCreator() {
    return {
        type: PAUSEGAME
    }
}

function lifetimeAC() {
    return {
        type: LIFETIME
    }
}

function globalLifetimeActionCreator() {
    return {
        type: GLOBALLIFETIME
    }
}

export function endAllGameActionCreator(typeOfEnd) {
    return {
        type: ENDALLGAME,
        typeOfEnd: typeOfEnd
    }
}

export function startActionCreator(difficulty, screen) {
    return {
        type: STARTED,
        difficulty: difficulty,
        screen: screen
    }
}

export function inputActionCreator(name) {
    return {
        type: INPUT,
        name: name
    }
}

export function changeRulesActionCreator() {
    return {
        type: CHANGERULES
    }
}

export function changeKeyActionCreator(key, code) {
    return {
        type: CHANGEKEY,
        key: key,
        code: code
    }
}

export function changeVolumeActionCreator(target, value) {
    return {
        type: VOLUMECHANGE,
        target: target,
        value: value * 0.01
    }
}

export default gameReducer;

//helping functions at the bottom

function countSpeedCoef(score, type, boostType) {
    let coef = score - score % 100;
    coef = coef / 1000 + 1;
    coef = coef * document.documentElement.clientHeight / 1000;
    if (boostType === 'Decrease enemy speed') coef /= 1.5;
    if (type === 'slowMoving') return coef;
    else if (type === 'fastMoving') return coef * 1.5;
    else return coef * 0.75;
}

function sortInLeaderBoard(array, score) {
    let found = false;

    for (let i = 0; i < array.length; i++) {
        if (score > array[i].score) {
            array.splice(i, 0, {
                name: '!!!',
                score: score
            });
            found = true;
            break;
        }
    }
    if (found) {
        array.splice(array.length - 1, 1);
        return {
            array: array,
            inLeaderboard: true
        }
    }
    else return {
        inLeaderboard: false
    }
}

function countPlayerSpeed(type) {
    if (type === 'Increase move speed') return 1.5;
    else return 1;
}