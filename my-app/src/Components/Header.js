import PropTypes from 'prop-types'

const Header = ( {topic, difficulty, question} ) => {
  return (
    <header>
      <h1>ChatGPT Trivia</h1>
      <h3>Topic</h3>
      {topic}
      <h3>Difficulty</h3>
      {difficulty}
      <h3>Question</h3>
      {question}
    </header>
  )
}

Header.defaultProps = {
    title: "ChatGPT"
}

Header.prototype = {
    title: PropTypes.String
}

export default Header
