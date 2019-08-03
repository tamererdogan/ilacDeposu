import React from 'react'
import AnaTablo from './Components/AnaTablo'
import DepoSecme from './Components/DepoSecme'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            depo: ''
        }
    }

    depoSec = (event) => {
        this.setState({depo:event.target.innerHTML})
    };

    render() {
        return(
        <div>
            { this.state.depo == '' ?
                <DepoSecme depoSec={this.depoSec}/>
                :
                <AnaTablo depo={this.state.depo}/>
            }
        </div>
        );
    }
}

export default App;