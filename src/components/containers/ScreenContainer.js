import createReactClass from "create-react-class";
import React from "react";
import { connect } from "react-redux";
import GameScreen from "../GameScreen";
import StartScreen from "../StartScreen";
import LeaderboardScreen from "../LeaderBoardScreen";
import InputScreen from "../InputScreen";
import ResultScreen from "../ResultScreen";
import SettingsScreen from "../SettingsScreen";
import { globalLifetime, startActionCreator } from "../../reducers/gameReducer";

import mainTheme from "../../sounds/music/main-theme.mp3";
import InitialScreen from "../InitialScreen";

var innerScreenContainer = createReactClass({
    musicInterval: '',
    started: false,
    mainThemeS: new Audio(mainTheme),
    playMusic: function () {
        this.props.startActionCreator(0, 'start');

        if (this.props.screen !== 'game') {
            setTimeout(() => { // first music run 'cause setInterval first waits for the time
                this.mainThemeS.currentTime = 0;
                this.mainThemeS.play();
                this.started = true;
            }, 1000);
            this.musicInterval = setInterval(() => {
                setTimeout(() => {
                    this.mainThemeS.currentTime = 0;
                    this.mainThemeS.play();
                }, 1000);
            }, 236000); // setInterval is needed here to keep the music on re-repeat, the time between intervals equals the time of the music
        }
        document.removeEventListener('mousedown', this.playMusic);
        document.removeEventListener('keyup', this.playMusic);
    },
    componentDidMount: function () {
        setInterval(() => {
            this.props.globalLifetime();
        }, 20);
        document.addEventListener('mousedown', this.playMusic)
        document.addEventListener('keyup', this.playMusic)

    },
    componentDidUpdate: function () {
        this.mainThemeS.volume = this.props.musicVol;
        if (this.props.screen === 'game') {
            if (this.started) {
                clearInterval(this.musicInterval);
                this.mainThemeS.pause();
                this.started = false;
            }
        }
    },
    render: function () {
        if (document.documentElement.clientWidth >= 770 && document.documentElement.clientHeight >= 620) { // on super-little screens the game will looks not so good
            if(this.props.screen === 'initial') return <InitialScreen />
            if (this.props.screen === 'start') return <StartScreen />;
            else if (this.props.screen === 'game') {
                if (this.props.isScreenChanged) return <div className="w-100 h-100 menu d-flex align-items-center justify-content-center p-2">You changed the resolution while playing the game. Change it back to continue.</div>;
                else return <GameScreen />;
            }
            else if (this.props.screen === 'leaderboard') return <LeaderboardScreen />;
            else if (this.props.screen === 'input') return <InputScreen leaderboard={this.props.leaderboard} />;
            else if (this.props.screen === 'result') return <ResultScreen score={this.props.score} />;
            else if (this.props.screen === 'settings') return <SettingsScreen />;
        }
        else {
            if (this.props.screen === 'game') return <div className="w-100 h-100 menu d-flex align-items-center justify-content-center p-2">You changed the resolution while playing the game. Change it back to continue.</div>; /*if player changed the resolution enemies will be display incorrectly */
            else {
                return <div className="w-100 h-100 menu d-flex align-items-center justify-content-center p-2">Minimal resolution requirement is 770x620. Set this or higher resolution.</div>;
            }
        }
    }
})

function mapStateToProps(state) {
    return {
        screen: state.gameSection.logic.whichScreen,
        score: state.gameSection.game.player.score,
        leaderboard: state.gameSection.logic.leaderboard,
        flag: state.gameSection.logic.enemyPassedScreen,
        isScreenChanged: state.gameSection.logic.screen.isChanged,
        lifetime: state.gameSection.globalLifetime,
        musicVol: state.gameSection.logic.volume.music
    }
}

const ScreenContainer = connect(mapStateToProps, { globalLifetime, startActionCreator })(innerScreenContainer);

export default ScreenContainer;