import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button text = "good" handleClick={setGood}/>
      <Button text = "neutral" handleClick={setNeutral}/>
      <Button text = "bad" handleClick={setBad}/>
      <Statistics values={[good, neutral, bad]} />

    </div>
  )
}

export default App