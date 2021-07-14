import {XPButton, XPButtonText} from './StyledComponents'

/**
 * The button that triggers liquidity transfer
 * @param {Event} onClick param
 * @returns a JSX button
 */
const SendButton = ({onClick}) => {

    return (
        <XPButton onClick={onClick}>
            <XPButtonText>Send</XPButtonText>
        </XPButton>
    )
}

export default SendButton;