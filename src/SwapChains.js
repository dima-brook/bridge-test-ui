import ArrowSVG from './assets/SVG/ArrowSVG';

/**
 * Swaps the Source <=> Target blockchains
 * @param {Event} onClick 
 * @returns round button JSX
 */
const SwapChains = ({onClick}) => {

    const styles ={
        buttonExchange : {
            background: '#030c21',
            border: "1px solid #374462",
            boxSizing: "border-box",
            borderRadius: '50%',
            cursor: 'pointer',
            display:'flex inline',
            // marginTop: '0.5vw'
          }
    }

    return (
        <button
            style={styles.buttonExchange}
            onClick={onClick}
        >
            <ArrowSVG />
        </button>
    )

}

export default SwapChains;