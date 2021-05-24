import { useEffect, useState } from 'react';
import './App.css';
import Buttons from './Components/Buttons';
import Playground from './Components/Playground';
import User from './Components/User';

function App() {

  const [matches, setMatches] = useState(25);
  const [userMatchesOne, setUserMatchesOne] = useState(0); //player state
  const [userMatchesTwo, setUserMatchesTwo] = useState(0); //computer state
  const [activeUser, setActiveUser] = useState(1);
  const [newGame, setNewGame] = useState(false);


  const removeMatches = (count) => {
    if (count > matches) {
      alert("chose less matches")
      return
    }
    setActiveUser(activeUser === 1 ? 2 : 1)
    if (activeUser === 1) {
      setUserMatchesOne(userMatchesOne + count)
    } else {
      setUserMatchesTwo(userMatchesTwo + count)
    }
    setMatches(matches - count)
  }

  const timeout = (count) => {
    setTimeout(() => {
      removeMatches(count)
    }, 500)
  }

  useEffect(() => {

    if (activeUser === 2) {
      if (matches === 25) {
        timeout(3)
      }
      

      else if (matches === 3) {
        if (userMatchesTwo % 2 > 0) {
          timeout(3)
        }
        else {
          timeout(2)
        }
      }
      else if (matches === 2 && userMatchesTwo % 2 === 0) {
        timeout(2)
      }
      else if (matches === 1) {
        timeout(1)
      }
      else if (matches > 0) {
        let intelligence = ((24 - (userMatchesOne + userMatchesTwo)) % 4)
        if (intelligence === 0) {
          timeout(3)
        }
        else {
          timeout(intelligence)
        }
      }
    }
  }, [matches, activeUser, timeout, userMatchesOne, userMatchesTwo])
  
  useEffect(() => {
    if (newGame === true) {
      setMatches(25)
      setUserMatchesOne(0)
      setUserMatchesTwo(0)
      setActiveUser(1)
      setNewGame(false)
    }
  }, [newGame])

  return (
    <div className="app">

      <div className="intelligence">
        {activeUser === 1 && matches === 25
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
          <Buttons activeUser={activeUser} removeMatches={removeMatches} />
        </div>
      </div>
      <div className={matches === 0 ? "showWinner" : "hide"}>
        <div className="modal">
          {userMatchesOne % 2 === 0 ? <span>  Congratulations, you won !!!</span> : <span>You lose, try again</span>}
          <button onClick={() => setNewGame(true)} >ok</button>
        </div>
      </div>

    </div>
  );
}

export default App;
