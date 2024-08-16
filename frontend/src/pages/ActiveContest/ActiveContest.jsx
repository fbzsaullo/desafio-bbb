import { ActiveContestStyle } from "./ActiveContest.syle.js"

const ActiveContest = () => {
  return (
    <ActiveContestStyle>
      <div className="container">
        <div className="text">
          <h1>Paredão BBB24: Escolha quem deve ficar!</h1>
          <h3>Vote para definir quem deve ficar no BBB 2024!</h3>
        </div>
        <div className="contest">
          <div className="participants">
            <div className="participant">
              <h2>Bob Esponja</h2>
              <img src="https://via.placeholder.com/150" alt="participant 1" />
              
            </div>
          </div>
        </div>
      </div>
    </ActiveContestStyle>
  )
}

export default ActiveContest