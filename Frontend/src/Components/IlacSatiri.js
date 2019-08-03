import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class IlacSatiri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ayrinti: false,
            silindi: false,
        };
    }

    etkenlerButonu = () => {
        this.setState({ayrinti: !this.state.ayrinti});
        // console.log(this.props.veri);
    };

    silButonu = (event) => {
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.props.veri.kodu;
        axios.delete(url).then(res => {
            console.log(res.data.message);
            this.setState({silindi:true})
        });
    };

    render() {
        return (
            <span>
            {this.state.silindi ? '<Row></Row>' :
                <Row>
                    <Col lg={1}>{this.props.veri.adi}</Col>
                    <Col lg={1}>{this.props.veri.kodu}</Col>
                    <Col lg={1}>{this.props.veri.turu}</Col>
                    <Col lg={3}>{this.props.veri.skt}</Col>
                    <Col lg={2}><Button onClick={this.etkenlerButonu}>Etkenler</Button></Col>
                    <Col lg={2}><Button>Güncelle</Button></Col>
                    <Col lg={2}><Button onClick={this.silButonu}>Sil</Button></Col>
                </Row>
            }
            </span>
        )
    }
}

export default IlacSatiri;