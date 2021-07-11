import styled from 'styled-components'


const Button = styled('button')`
margin-top: 1vw;
  height: 3vw;
  background: #045adb;
  opacity: 0.9;
  border: none;
  margin-bottom: 0.5vw;
  box-shadow: inset 0px 2px 2px rgba(104, 164, 255, 0.25);
  border-radius: 6px;
`

const ButtonText = styled("div")`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 126%;
display:flex;
  align-items: center;
  justify-content: center;
letter-spacing: 0.03em;
color: #FFFFFF;
`

const SendButton = ({onClick}) => {


    return (
        <Button
            onClick={onClick}
        >
            <ButtonText>Send</ButtonText>
        </Button>
    )

}

export default SendButton;