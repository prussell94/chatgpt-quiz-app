// LandingPage.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
// import MultipleChoiceQuiz from './Components/MultipleChoiceQuiz';
// import Header from './Components/Header';
// import { Link } from 'react-router-dom';

// const Home = () => <h1>Home Page</h1>;

import React from 'react';
import { Link, Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import QuizApp from './Components/MultipleChoiceQuiz';
import NavigationBar from './Components/NavigationBar';
import HistoricalOrderingQuiz from './Components/HistoricalOrderingQuiz.js';
import DraggableApp from './Components/DraggableQuiz';

import NewDraggableQuiz from './Components/NewDraggableQuiz';
import SimpleDnD from './Components/SimpleDnD';
import SortableQuiz from './Components/SortableQuiz';
import SortableComponent from './Components/SortableComponent';


const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;

const InitialPage = () => {
    const location = useLocation();

    return (
        <div>
            <NavigationBar>
            </NavigationBar>
            <hr />
                <Routes location={location}>
                    <Route path="/MultipleChoiceQuiz" element={<QuizApp />} />
                    {/* <Route path="/HistoricalOrderingQuiz" element={<DraggableApp />} /> */}
                    {/* <Route path="/HistoricalOrderingQuiz" element={<NewDraggableQuiz />} /> */}
                    <Route path="/HistoricalOrderingQuiz" element={<SortableQuiz />} />


                </Routes>

            {/* <Route path="/about" component={About} /> */}
        </div>
    );
};

const LandingPage = () => {

    return (
        <Router>
            <InitialPage />
        </Router>
    );
};

// const LandingPage = () => {
//     return (
//         <div id="landingPage">
//             <nav>
//                 <ul>
//                 <li><Link to="/MultipleChoiceQuiz">Home</Link></li>
//                     {/* <li><Link to="/about">About</Link></li>
//                     <li><Link to="/about">About</Link></li> */}
//                 </ul>
//             </nav>
//             <div class="lp-heading">
//                 <Header colour="blue" linkToText="MultipleChoiceQuiz" onAdd="test"/>
//                 <h3>CHAT GPT QUIZ</h3>
//             </div>
//             <Router>
//                 <Routes>
//                     <Route path="/MultipleChoiceQuiz" element={<MultipleChoiceQuiz />}  />
//                 </Routes>  
//             </Router>
  
//         </div>
//       );
// };

export default LandingPage;
        
// export default LandingPage;

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import NotFound from './components/NotFound';

// function LandingPage() {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//           <Route path="/play" component={Play} />
//           <Route component={NotFound} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;