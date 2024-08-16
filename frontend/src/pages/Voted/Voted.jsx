import { VotedStyle } from "./Voted.style";
import Button from "../../components/Button/Button";

const Voted = () => {
  return (
    <VotedStyle>
      <div className="container">
        <h1>Obrigado por votar!</h1>
        <Button to="/">Votar novamente</Button>
      </div>
    </VotedStyle>
  );
}

export default Voted;
