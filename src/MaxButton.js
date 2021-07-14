import styled from "styled-components";

const Button = styled('button')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-bottom-right-radius: 6px;
border-top-right-radius: 6px;
border-left: none;
height: 2.5vw;
width: 3vw;
cursor: pointer;
`

const Text = styled('div')`
font-family: Inter;
font-size: 13px;
height: 10px;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 0.03em;
color: #1972f9;
`

const MaxButton = ({onClick}) => {
    return (
        <Button
        onClick={onClick}
        >
            <Text>MAX</Text>
        </Button>
    )
}

export default MaxButton;