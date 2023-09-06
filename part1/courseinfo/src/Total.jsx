import React from 'react'

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach(part => {
    total += part.exercises;
    });
  return (
    <>
      <p>Total Exercies, {total}</p>
    </>
  )
}

export default Total
