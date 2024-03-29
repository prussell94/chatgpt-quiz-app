import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Draggable from 'react-draggable';

// Styled component for the navigation bar container
const NavBarContainer = styled.nav`
  background-color: darkblue;
  padding: 10px 20px;
`;

// Styled component for the unordered list of navigation links
const NavLinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

// Styled component for each navigation link item
const NavItem = styled.li`
  display: inline;
  margin-right: 20px;

  // Style for the last navigation link item to remove margin
  &:last-child {
    margin-right: 0;
  }
`;

// Creating a styled div
// const StyledDiv = styled.div`
//   background-color: lightblue;
//   padding: 20px;
//   border-radius: 5px;
// `;

// Styled component for the navigation link
const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  // Style for the active navigation link
  &.active {
    font-weight: bold;
  }
`;

// Custom navigation bar component
const EventCard = (props) => {
  return (
    <Draggable>
        <div className="eventCard">
            {props.title}
        </div>
    </Draggable>
  )
}

export default EventCard;
  