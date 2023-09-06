import { useState } from 'react'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0))
  
  


  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button name ='Random Anecdote' handleClick ={() => setSelected(Math.floor(Math.random() * 8))}/>
        
        <Button name = 'Vote' handleClick = {() =>setVotes((inital) => {
			const copy = [...inital];
			copy[selected] += 1;
			return [...copy];
		})}/>
      </div>
      {votes.reduce((previous, current) => previous + current, 0) === 0 ? ("") :
      (<div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[votes.indexOf(
          votes.reduce((current, previous) => {
            if (current >= previous) {
              return current;
            } else {
              return previous;
            }
          }, 0)
        )]}
      </div>)}
    </div>
  )
}

export default App