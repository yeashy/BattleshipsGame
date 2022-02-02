import React from "react";
import createReactClass from "create-react-class";
import { connect } from "react-redux";
import Enemy from "../Enemy";
import { spawnEnemy, enemyMove } from "../../reducers/gameReducer";

var innerEnemyContainer = createReactClass({
    enemySpawn: '',
    enemyMove:'',
    componentDidMount: function () {
        this.enemySpawn = setInterval(() => {
            this.props.spawnEnemy();
        }, this.props.difficulty * 5 * 1000); // spawn speed depending on difficulty

        this.enemyMove = setInterval(() => {
                this.props.enemyMove();
        }, 28 / this.props.difficulty) // move speed depending on difficulty
    },
    componentWillUnmount: function(){
        clearInterval(this.enemySpawn);
        clearInterval(this.enemyMove);
    },
    render: function () {
        return (
            this.props.enemies.map(value => {
                return (
                    <Enemy type={value.type} x={value.x} y={value.y} key={value.id} hp={value.hp}/>
                )
            })
        )
    }
})

function mapStateToProps(state) {
    return {
        enemies: state.gameSection.game.enemies.allEnemies,
        lifetime: state.gameSection.lifetime,
        difficulty: state.gameSection.logic.difficulty
    }
}

const EnemyContainer = connect(mapStateToProps, { spawnEnemy, enemyMove })(innerEnemyContainer);

export default EnemyContainer;