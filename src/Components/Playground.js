import React from "react";

const Playground = ({ matches }) => {

    return (
        <div>
            <span>Matches: </span>
            {[...Array(matches).keys()].map((elem, i) => <span key={i}>❗</span>)}
        </div>
    )
}

export default Playground;