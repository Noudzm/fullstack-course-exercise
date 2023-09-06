import StatisticLine from "./StatisticLine"
const Statistics = (props) => {
  const all = props.values.reduce((total,current) => total +current, 0);
  const positve =  (props.values[0]/ all)*100;
  
  if(props.values.every((value)=> value == 0)){
    return (
        <div>
            <h2>Statistics</h2>
            <p>No Feedback Given</p>
        </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine name ="Good" value = {props.values[0]}/>
          <StatisticLine name ="Neutral" value = {props.values[1]}/>
          <StatisticLine name ="Bad" value = {props.values[2]}/>
          <StatisticLine name ="All" value = {all}/>
          <StatisticLine name ="Average" value = {all / 3}/>
          <StatisticLine name ="Positive" value = {`${positve}%`}/>
        </tbody>
        
      </table>
    </div>
  )
}

export default Statistics
