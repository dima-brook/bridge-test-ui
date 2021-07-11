import ArrowSVG from './ArrowSVG';

const SwapChains = ({onClick, x, y}) => {

    const styles ={
        buttonExchange : {
            position: 'absolute',
            bottom: y,
            left: x,
            background: '#030c21',
            border: "1px solid #374462",
            boxSizing: "border-box",
            borderRadius: '50%',
            cursor: 'pointer',
            display:'flex inline'
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