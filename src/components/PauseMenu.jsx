import { endAllGame, PauseGame } from "../reducers/gameReducer";
import createReactClass from "create-react-class";
import { connect } from "react-redux";

var PauseMenuContainer = createReactClass({ // it's a container, because originally I made a function, but it didn't work, and I was too lazy to redo the whole thing
    pauseOrContinue: function (button) {
        if (button === 'mouse') { // made because of the keyboard navigation, so that the buttons are not pressed on the spacebar or enter
            if (this.props.isPaused) this.props.PauseGame();
        }
        else this.props.PauseGame();

    },
    restart: function (button) {
        if (button === 'mouse') {
            if (this.props.isPaused) this.props.endAllGame('restart');
        }
        else this.props.endAllGame('restart')
    },
    backToMain: function () {
        this.props.endAllGame('backToMain');
    },
    pauseBinds: function (e) {
        if (e.Handled) return;
        let isPaused = document.getElementById('pause-menu').style.opacity > 99 ? true : false;

        if (e.code === 'Escape') {
            this.pauseOrContinue('keyboard');
        }
        else if (e.code === 'KeyC' && isPaused) {
            this.pauseOrContinue('keyboard');
        }
        else if (e.code === 'KeyR' && isPaused) {
            this.restart();
        }
        else if (e.code === 'KeyB' && isPaused) {
            this.backToMain();
        }
        e.Handled = true;
    },
    showMenu: function () {
        return this.props.isPaused ? 'flex' : 'none'
    },
    componentDidMount: function () {
        document.addEventListener('keyup', this.pauseBinds);
    },
    componentWillUnmount: function () {
        document.removeEventListener('keyup', this.pauseBinds);
    },
    render: function () {
        return (
            <div className="menu flex-column align-items-center justify-content-around p-2" style={{ display: this.showMenu() }} id="pause-menu">
                <div className="d-flex"><h4><strong>Pause:</strong></h4></div>
                <div className="d-flex w-100 justify-content-evenly h-25">
                    <button onClick={() => { this.pauseOrContinue('mouse') }}>Continue (C)</button>
                    <button onClick={this.restart}>Restart (R)</button>
                </div>
                <button className="h-25" onClick={this.backToMain}>Back to main (B)</button>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        isPaused: state.gameSection.game.isPaused
    }
}

const PauseMenu = connect(mapStateToProps, { endAllGame, PauseGame })(PauseMenuContainer);

export default PauseMenu;