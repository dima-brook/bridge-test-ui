import { XPButton, XPButtonText } from './StyledComponents'
import { stateColors, stateText } from './consts';


function sanitizeState(inactive, state) {
    if (inactive) {
        return state || 'disabled';
    } else {
        return 'enabled';
    }
}

/**
 * The button that triggers liquidity transfer
 * @param {Event} onClick param
 * @returns a JSX button
 */
 const SendButton = ({ onClick, inactive, state }) => {
    const stateS = sanitizeState(inactive, state);

    return (
        <XPButton
            onClick={onClick}
            disabled={inactive}
            style={{ "background": stateColors[stateS] }}
        >
            <XPButtonText
                disabled={inactive}
            >
                {stateText[stateS]}
            </XPButtonText>
        </XPButton>
    )
}


export default SendButton;