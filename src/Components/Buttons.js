import React from "react"

const Buttons = ({removeMatches, activeUser}) => {
   return [...Array(3).keys()].map((elem, i) => (
        <button key={i} disabled={activeUser === 1 ? false : true} className="btn1" onClick={() => removeMatches(i + 1)}>{i + 1}</button>))
    }


export default Buttons