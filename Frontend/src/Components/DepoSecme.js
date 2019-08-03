import React from 'react'
import axios from 'axios'
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class DepoSecme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            depolar: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/rest/v1/depo/').then(obj => {
            this.setState({ depolar : obj.data.depolar})
            console.log(this.state.depolar);
        });
    }

    render() {

        let kapsayici = {
            marginTop: 250,
            marginLeft:375,
            width:500,
            height:300,

        };

        let depo = {
            marginTop:5,
        };

        return(
            <div style={kapsayici}>
            <ListGroup>
                {this.state.depolar.map(
                    value => (
                        <Button onClick={this.props.depoSec} style={depo} variant='info'>{value.depo}</Button>
                    )
                )}
            </ListGroup>
            </div>
        );
    }
}

export default DepoSecme;