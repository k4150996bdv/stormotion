import React from "react"
const emoji = require("emoji-dictionary");
const item = emoji.getUnicode("exclamation");

const User = ({ matches, user }) => {
    return (
        <div>
            <div>
                {user === 1 ? <span>Your matches: </span> : <span>Computer matches: </span>}
                {matches.map((elem, i) => <span key={i}>{item}</span>)}
                {matches.length ? matches.length : null}
            </div>

        </div>
    )
}

export default User