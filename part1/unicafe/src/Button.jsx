const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick = {() => handleClick((inital) => inital + 1)}>{text}</button>
    </>
  )
}

export default Button
