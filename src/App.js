import { useEffect, useState } from 'react';
import './App.css';
import Playground from './Components/Playground';
import User from './Components/User';

function App() {

  const defaultMatches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  const [matches, setMatches] = useState(defaultMatches);
  const [userMatchesOne, setUserMatchesOne] = useState([]); //player state
  const [userMatchesTwo, setUserMatchesTwo] = useState([]); //computer state
  const [activeUser, setActiveUser] = useState(1);
  const [newGame, setNewGame] = useState(false)

  const removeMatches = (count) => {
    if (count > matches.length) {
      alert("chose less matches")
      return
    }
    const selectedMatches = []
    for (let i = 0; i < count; i++) {
      selectedMatches.push(i)
    }

    setActiveUser(activeUser === 1 ? 2 : 1)
    if (activeUser === 1) {
      setUserMatchesOne([...selectedMatches, ...userMatchesOne])
    } else {
      setUserMatchesTwo([...selectedMatches, ...userMatchesTwo])
    }
    matches.splice(0, count)
    setMatches([...matches])
  }

  useEffect(() => {
    if (activeUser === 2) {
        if (matches.length > 0) {
        setTimeout(() => {
          removeMatches(1)
        }, 500)
      }
    }
  }, [activeUser])

  useEffect(() => {
    if (newGame === true) {
      setMatches(defaultMatches)
      setUserMatchesOne([])
      setUserMatchesTwo([])
      setActiveUser(1)
      setNewGame(false)
    }
  }, [newGame])

  return (
    <div className="app">
      <div className="intelligence">
        {activeUser === 1 && matches.length === 25
          ? <><span> Activate artificial intelligence &rArr;</span> <button onClick={() => setActiveUser(activeUser + 1)}>activate</button></>
          : null}
      </div>
      <div className="app-container">

        <div className="active-user">
          {activeUser === 1 ? <span>Your turn</span> : <span>Computer is thinking...</span>}
        </div>
        <div className="playground-wrapper">
          <Playground matches={matches} />
          <User user={1} matches={userMatchesOne} />
          <User user={2} matches={userMatchesTwo} />
        </div>
        <div className="btn-wrapper">
          <button disabled={activeUser === 1 ? false : true} className="btn1" onClick={() => removeMatches(1)}>1</button>
          <button disabled={activeUser === 1 ? false : true} className="btn2" onClick={() => removeMatches(2)}>2</button>
          <button disabled={activeUser === 1 ? false : true} className="btn3" onClick={() => removeMatches(3)}>3</button>
        </div>
      </div>
      <div className={matches.length === 0 ? "showWinner" : "hide"}>
        <div className="modal">
          {userMatchesOne.length % 2 === 0 ? <span>  Congratulations, you won !!!</span> : <span>You lose, try again</span>}
          <button onClick={() => setNewGame(true)} >ok</button>
        </div>
      </div>

    </div>
  );
}

export default App;
