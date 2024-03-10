import PropTypes from 'prop-types'

const Button = ({colour, text, onClick}) => {
    // const onClick = () => {
    //     console.log("Click")
    // }
 
    return (
        <button style={{ backgroundColor: colour }} className="btn" id="next-question" onClick={() => { onClick();}}>
            {text}
        </button>
        )
}

Button.defaultProps = {
    colour: 'green'
}

Button.propTypes = {
    text : PropTypes.string,
    colour : PropTypes.string
}

export default Button
