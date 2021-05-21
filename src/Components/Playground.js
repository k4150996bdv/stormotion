import React from "react";

const emoji = require("emoji-dictionary");
const item = emoji.getUnicode("exclamation");

const Playground = ({ matches }) => {

    return (
        <div>
            <span>Matches: </span>
            {matches.map((elem, i) => <span key={i}>{item}</span>)}
        </div>
    )
}

export default Playground;