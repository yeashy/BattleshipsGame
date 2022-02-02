import { useDispatch } from "react-redux";
import { changeKeyActionCreator, changeRulesActionCreator, startActionCreator, changeVolumeActionCreator } from "../reducers/gameReducer";
import { useSelector } from "react-redux";
import React from "react";
import $ from 'jquery';

import btnClick from "../sounds/sfx/btn-sound.mp3";
let btnClickS = new Audio(btnClick);

var Settings = () => {

    let sfxRef = React.createRef();
    let musicRef = React.createRef();

    var flag = useSelector((state) => state.gameSection.logic.enemyPassedScreen);
    var controls = useSelector((state) => state.gameSection.logic.controls);
    var volume = useSelector((state) => state.gameSection.logic.volume)

    const dispatch = useDispatch();

    function click() {
        btnClickS.volume = volume.sfx;
        btnClickS.play();
        dispatch(changeRulesActionCreator());
    }

    function changeVolume(target, value) {
        dispatch(changeVolumeActionCreator(target, value));
    }

    function outKey(key) { // just returns innerText in control btns
        if (key === 'left') {
            if (controls.leftKey.length === 4 || controls.leftKey.length === 6) return `Button [${controls.leftKey[controls.leftKey.length - 1]}]`;
            else return `Button [${controls.leftKey}]`;
        }
        else if (key === 'right') {
            if (controls.rightKey.length === 4 || controls.rightKey.length === 6) return `Button [${controls.rightKey[controls.rightKey.length - 1]}]`;
            else return `Button [${controls.rightKey}]`;
        }
    }

    function changeKey(key) { // it's too complicated to explain how this function works, just don't touch it
        btnClickS.volume = volume.sfx;
        btnClickS.play();

        returnToDefs();

        function dispatchToState(e) {
            document.removeEventListener('keydown', dispatchToState);
            document.removeEventListener('mousedown', returnToDefs);
            if (key === 'left') {
                if (e.code === controls.leftKey) { // do nothing if the new key === old key
                    returnToDefs();
                    return;
                }
            }
            else {
                if (e.code === controls.rightKey) {
                    returnToDefs();
                    return;
                }
            }
            if ((e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 105)) { // it takes only letters and number but no arrows or spacebar 'cause keyboard navigation sucks
                dispatch(changeKeyActionCreator(key, e.code));
            }
            else returnToDefs();
        }

        function returnToDefs() { // return everything to its original colors and remove the "press the button" inscription in some cases
            document.removeEventListener('keydown', dispatchToState);
            document.removeEventListener('mousedown', returnToDefs);
            document.getElementById('left').innerHTML = outKey('left');
            document.getElementById('right').innerHTML = outKey('right');
            $('#left').removeClass('text-danger');
            $('#left').removeClass('border-danger');
            $('#right').removeClass('text-danger');
            $('#right').removeClass('border-danger');
            $('.opacity-0').removeClass('opacity-100');
        }

        if (document.getElementById(key).innerHTML !== 'Press the button') {
            document.getElementById(key).innerHTML = 'Press the button';
            document.addEventListener('keydown', dispatchToState);
            document.addEventListener('mousedown', returnToDefs);
        }
    }

    function whichText() {
        if (flag) return 'End game';
        else return 'Continue playing';
    }

    function onStart() { // control buttons can't be the same
        if (outKey('left') === outKey('right')) {
            $('#left').addClass('text-danger');
            $('#left').addClass('border-danger');
            $('#right').addClass('text-danger');
            $('#right').addClass('border-danger');
            $('.opacity-0').addClass('opacity-100');
        }
        else dispatch(startActionCreator(0, 'start'));
    }

    return (
        <div className="menu d-flex flex-column align-items-center justify-content-between p-2" style={{ height: '550px' }}>
            <div className="d-flex mb-1"><h4><strong>Logic:</strong></h4></div>
            <div className="d-flex col-12 justify-content-between align-items-center px-2 leader mb-2" style={{ height: '20%' }}>
                <p className="mb-0 col-8">If enemy pass to bottom of the screen - </p>
                <button className="mb-0 col-4 h-75" onClick={click}>{whichText()}</button>
            </div>

            <div className="d-flex mb-1"><h4><strong>Volume:</strong></h4></div>
            <div className="d-flex col-12 justify-content-between px-2 leader mb-2">
                <p className="mb-0">Music</p>
                <input type="range" min="0" max="100" id="music-vol" className="mb-1 col-5" ref={musicRef} onChange={() => { changeVolume('music', musicRef.current.value) }} value={volume.music * 100} />
            </div>
            <div className="d-flex col-12 justify-content-between px-2 leader mb-2">
                <p className="mb-0">SFX</p>
                <input type="range" min="0" max="100" id="sfx-vol" className="mb-1 col-5" ref={sfxRef} onChange={() => { changeVolume('sfx', sfxRef.current.value) }} value={volume.sfx * 100} />
            </div>

            <div className="d-flex mb-1"><h4><strong>Controls:</strong></h4></div>
            <div className="d-flex col-12 justify-content-between px-2 leader mb-2">
                <p className="mb-0">Left</p>
                <button className="mb-2 col-5" onClick={() => changeKey('left')} id="left">{outKey('left')}</button>
            </div>
            <div className="d-flex col-12 justify-content-between px-2 leader mb-0">
                <p className="mb-0">Right</p>
                <button className="mb-2 col-5" id="right" onClick={() => changeKey('right')}>{outKey('right')}</button>
            </div>
            <div className="d-flex col-12 justify-content-between px-2 leader mt-2">
                <p className="mb-0">Shoot</p>
                <p className="mb-2 col-5">Button [Space]</p> {/*it can't be changed 'cause space involved in navigation*/}
            </div>
            <p className="text-danger opacity-0 mb-0">buttons can't have the same value</p>
            <button onClick={onStart}>Back</button>

        </div>
    )
}

export default Settings;