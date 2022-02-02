import React from "react";
import { useDispatch } from "react-redux";
import { inputActionCreator } from "../reducers/gameReducer";
import $ from 'jquery';

var Input = (props) => {
    let nameRef = React.createRef();
    const dispatch = useDispatch();

    function submit() {
        if (nameRef.current.value.match(/^[A-Za-z0-9]+$/) !== null) { //validation
            let duplicate = false;
            props.leaderboard.forEach(el => {
                if (el.name === nameRef.current.value) {
                    duplicate = true;
                }
            })
            if (!duplicate) dispatch(inputActionCreator(nameRef.current.value)) //check for duplication of names
            else {
                $('.text-danger').html('Your name is already taken! Please, take another name');
                $('.text-danger').addClass('opacity-100');
            }
        }
        else {
            $('.text-danger').html('Error! The name can only contain letters and numbers!');
            $('.text-danger').addClass('opacity-100');
        }
    }

    return (
        <div className="menu d-flex flex-column align-items-center justify-content-between p-2">
            <div className="d-flex mb-3"><h4><strong>Please, enter your name</strong></h4></div>
            <div>
                <input type="text" ref={nameRef} className="mt-2" />
                <div className="text-danger opacity-0 px-3"><p>Error! The name can only contain letters and numbers!</p></div>
            </div>

            <div className="d-flex align-items-center">
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default Input;