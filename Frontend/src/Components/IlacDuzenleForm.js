import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Alert from "react-bootstrap/Alert";

class IlacDuzenleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ilac: [],
            etkenler: '',
            response: '',
            error: false,
        }
    }

    componentDidMount(props) {
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.props.id;
        axios.post(url).then(obj => {
            this.setState({ ilac : obj.data})
            let etkenler = this.state.etkenler;
            this.state.ilac.etkenler.forEach(value => {
                etkenler += value.etkenadi+',';
            });
            etkenler = etkenler.slice(0, -1);
            this.setState({etkenler:etkenler})
        })
    }

    onClick = (event) => {
        let formVerileri = event.target.form;
        let etkenIsimleri = formVerileri.etkenler.value;

        let etkenler = [];
        if (etkenIsimleri)
        {
            etkenIsimleri = formVerileri.etkenler.value.split(',');
            etkenIsimleri.forEach(value => {
                var etken = {
                    etkenadi: value
                };
                etkenler.push(etken);
            });
        }

        let ilac = {
            adi: formVerileri.ad.value,
            kodu: formVerileri.kod.value,
            turu: formVerileri.tur.value,
            skt: formVerileri.skt.value,
            etkenler: etkenler
        };

        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.state.ilac.kodu;
        axios.put(url, {ilac:ilac}).then(res => {
            this.setState({response:res.data.message, error:false});
        }).then(null, error => this.setState({response:error.response.data.message, error:true}));
    };

    render() {
        let alert = {
            paddingTop:6,
            paddingBottom:6,
        };

        let status;
        if (this.state.error)
        {
            status = 'danger';
        }else {
            status = 'success';
        }

        return (
            <div>
                {this.state.response != '' && <Alert style={alert} variant={status}>{this.state.response}</Alert>}
            <Form>
                <Form.Group controlId="ad">
                    <Form.Label>İlaç Adı</Form.Label>
                    <Form.Control type="text" placeholder={this.state.ilac.adi}/>
                </Form.Group>
                <Form.Group controlId="kod">
                    <Form.Label>İlaç Kodu</Form.Label>
                    <Form.Control type="text" placeholder={this.state.ilac.kodu}/>
                </Form.Group>
                <Form.Group controlId="tur">
                    <Form.Label>İlaç Türü</Form.Label>
                    <Form.Control type="text" placeholder={this.state.ilac.turu}/>
                </Form.Group>
                <Form.Group controlId="skt">
                    <Form.Label>Skt</Form.Label>
                    <Form.Control placeholder={this.state.ilac.skt} type="text"/>
                </Form.Group>
                <Form.Group controlId="etkenler">
                    <Form.Label>Etkenler</Form.Label>
                    <Form.Control type="text" placeholder={this.state.etkenler} />
                </Form.Group>
                <Button onClick={this.onClick} variant="success" block>
                    İlacı Güncelle
                </Button>
                <Button variant="info" onClick={()=>this.props.guncelleButonu()} block>Geri</Button>
            </Form>
            </div>
        );
    }
}

export default IlacDuzenleForm;