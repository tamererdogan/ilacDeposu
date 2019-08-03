import React from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from "react-bootstrap/Pagination";

class IlacTablosu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ilaclar: [],
            loading: true,
            ilacDuzenle: false,
            response: '',
            sayfa: 0,
            sayfaSayisi: 0,

        };
    }

    componentDidMount() {
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.state.sayfa;
        axios.get('http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilacSayisi/').then( sayi => {
            var toplamIlacSayisi = sayi.data.ilacSayisi;
            var sayfaSayisiHesap = Math.ceil(toplamIlacSayisi/10);
            this.setState({ sayfaSayisi: sayfaSayisiHesap});
            axios.get(url).then(obj => {
                this.setState({ ilaclar : obj.data.ilaclar, loading: false})
            })
        })
    }

    silButonu = (event) => {
        let ilacKodu = event.target.id;
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+ilacKodu;
        axios.delete(url).then(res => {
            this.setState({response:res.data.message})
            this.componentDidMount();
        });
    };

    sayfalamaButonu = (event) => {
        var sayfa = event.target.id-1;
        this.setState({loading:true, ilaclar:[]});
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+sayfa;
        axios.get(url).then(obj => {
            this.setState({ ilaclar : obj.data.ilaclar, loading: false, sayfa:sayfa})
        })
    };

    render() {
        var gri = {
            backgroundColor:'#dee2e6',
            paddingTop: 5,
            paddingBottom: 5,
            textAlign: 'center',
            borderBottom:'1px solid #000',
            borderLeft:'1px solid #000',
            borderRight:'1px solid #000',
        };

        var baslik = {
            backgroundColor:'#fff',
            marginTop: 5,
            paddingTop: 5,
            paddingBottom: 5,
            textAlign: 'center',
            borderTop:'1px solid #000',
            borderLeft:'1px solid #000',
            borderRight:'1px solid #000',
            borderBottom:'1px solid #000',
        };
        var margin = {
            marginTop:15,
            marginLeft:15,
            marginRight:15,
        };

        var alert = {
            marginLeft: -15,
            marginRight: -15,
            paddingTop:6,
            paddingBottom:6,
        };

        var pagination = {
            marginTop: 10,
            float: 'right',
        };

        var yukleniyor = {
            fontSize: 35,
            color: '#5d5da3',
            marginTop: 100,
            textAlign: 'center',

        };

        let aktif = this.state.sayfa+1;
        let sayfalar = [];
        for (let i = 1; i <= this.state.sayfaSayisi; i++) {
            sayfalar.push(
                <Pagination.Item onClick={this.sayfalamaButonu} id={i} key={i} active={i === aktif}>
                    {i}
                </Pagination.Item>,
            );
        }

        return (
            <div style={margin}>

                {this.state.response == '' ? '' :<Alert style={alert} variant="success">{this.state.response}</Alert>
                }
                {this.state.loading ?
                    <div style={yukleniyor}><b>Yükleniyor..</b></div>
                    :
                    <Row style={baslik}>
                        <Col lg={2}>İlaç Adı</Col>
                        <Col lg={2}>İlaç Kodu</Col>
                        <Col lg={2}>İlaç Türü</Col>
                        <Col lg={3}>İlaç SKT</Col>
                        <Col lg={3}>İşlemler</Col>
                    </Row>
                }
                {this.state.ilaclar.map(ilac => (
                    <Row style={gri}>
                        <Col lg={2}>{ilac.adi}</Col>
                        <Col lg={2}>{ilac.kodu}</Col>
                        <Col lg={2}>{ilac.turu}</Col>
                        <Col lg={3}>{ilac.skt}</Col>
                        <Col lg={1}><Button size='sm' variant='secondary' onClick={ () => this.props.ayrintilarButonu(ilac.kodu)}>Ayrıntılar</Button></Col>
                        <Col lg={1}><Button size='sm' variant='info' onClick={ () => this.props.guncelleButonu(ilac.kodu)}>Güncelle</Button></Col>
                        <Col lg={1}><Button size='sm' variant='danger' id={ilac.kodu} onClick={this.silButonu}>  Sil  </Button></Col>
                    </Row>
                ))}
                <Pagination style={pagination} size='sm'>
                    {sayfalar}
                </Pagination>
            </div>
        );
    }
}

export default IlacTablosu;