import styled from "styled-components";

const Button = styled("button")`
  background: #051937;
  border: 1px solid #374462;
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
  border-left: none;
  height: 56px;
  width: 67px;
  cursor: pointer;

  @media (max-width: 1300px) {
    width: 67px;
    margin-bottom: 10px;

  }
  @media (max-width: 768px){
    font-size: 20px;
    height: 56px;
  }

`;

const Text = styled("div")`
  font-family: Inter;
  font-size: 1vw;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #1972f9;
  font-size: 15px;

  @media (max-width: 1300px) {
    font-size: 15px;
  }
`;

const MaxButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Text>MAX</Text>
    </Button>
  );
};

export default MaxButton;
