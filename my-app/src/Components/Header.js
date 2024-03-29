import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, linkTo, onAdd }) => {
  // const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {/* {location.pathname === '/' && ( */}
        <Button
          color={'darkblue'}
          text={linkTo}
          onClick={onAdd}
        />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
