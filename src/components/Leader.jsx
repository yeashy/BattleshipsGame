var Leader = (props) => {

    function decide() {
        if (props.score === 0) return 0;
        else return 100;
    }

    return (
        <div className="d-flex col-12 justify-content-between px-2 leader mb-2" style={{opacity: decide()}}>
            <p className="mb-0">{props.name}</p>
            <p className="mb-0">{props.score}</p>
        </div>
    )
}

export default Leader;