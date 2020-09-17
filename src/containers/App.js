import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
class App extends React.Component {
constructor() {
    super();
    this.state = {
      robot : [],
      searchfield: ' '
    };
}

componentDidMount()
{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(user => this.setState({robot : user}));
}

onSearchChange= (event) =>{
  this.setState({ searchfield : event.target.value })
}

render(){
  //const{robots, searchfield}=this.state; We can remove this.state using this(destructring)
  const filteredRobots = this.state.robot.filter(robot => {
    return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  if(this.state.robot.length === 0) //!robot.length
  {
    return <h1>Loading</h1>
  }
  else
  {
     return (
     <div className='tc'>
       <h1 className='f2'>RoboFriends</h1>
       <SearchBox searchChange={this.onSearchChange}/>
       <Scroll>
           <ErrorBoundry>
             <CardList robot={filteredRobots}/>
          </ErrorBoundry>
       </Scroll>
     </div>
      );
  }
}

}
 
export default App;
