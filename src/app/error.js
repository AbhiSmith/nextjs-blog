'use client'

const error = ({ error, reset }) => {
  return (
    <center>
      <h2 >Ouch! That hurts</h2>
      &nbsp; &nbsp; 
        <div >{error.message}</div>
        &nbsp; 
       <div>
       <button className="custom-button" onClick={() => reset()}>
          Try again
        </button>
       </div>
    </center>
  )
}

export default error