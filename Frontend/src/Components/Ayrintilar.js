import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import ResimUpload from "./ResimUpload";

class Ayrintilar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ilac: [],
            etkenler: [],
        }
    }

    componentDidMount(props) {
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.props.id;
        axios.post(url).then(obj => {
            this.setState({ ilac : obj.data, etkenler : obj.data.etkenler})
        })
    }

    render() {

        let style = {
            backgroundColor: '#fff',
            marginLeft: 2,
            marginRight: 4,
        };

        let buton = {
            marginTop: 15
        };

        let margin =  {
            marginTop: 10,
        };

        let ilacResimDiv = {
            marginLeft: 20,
            marginTop: 35,
            width: 500,
            height: 250,
            border: '1px solid #000',
        };

        let ilacResim = {
            margin: 0,
            width: '100%',
            height: '100%',
        };

        return (
            <div>
                <Row style={style}>
                    <Col lg={6}>
                        <ListGroup style={margin} as="ul">
                            İlaç Bilgileri :
                        <ListGroup.Item style={margin} as="li"> İlaç Adı : {this.state.ilac.adi}</ListGroup.Item>
                        <ListGroup.Item as="li"> İlaç Kodu : {this.state.ilac.kodu}</ListGroup.Item>
                        <ListGroup.Item as="li"> İlaç Türü : {this.state.ilac.turu}</ListGroup.Item>
                        <ListGroup.Item as="li"> Son Kullanma Tarihi : {this.state.ilac.skt}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup style={margin} as="ul">
                        Etkenler :
                            <div style={margin}> </div>
                        {this.state.etkenler.map(
                            etken => (
                                <ListGroup.Item as="li">{etken.etkenadi}</ListGroup.Item>
                            )
                        )}
                        </ListGroup>
                        <div style={margin}> </div>
                    </Col>
                    <Col lg={6}>
                        {this.state.ilac.resim ?
                            <div style={ilacResimDiv}>
                                <Image style={ilacResim} src={'http://localhost:8000/uploads/'+this.state.ilac.resim}/>
                            </div>
                            :
                                <ResimUpload depo={this.props.depo} ilacKodu={this.state.ilac.kodu}/>
                            }
                    </Col>
                </Row>

                <Button style={buton} variant='info' onClick={()=>this.props.ayrintilarButonu()} block>Geri</Button>
            </div>
        );
    }
}

export default Ayrintilar;