import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Alert from "react-bootstrap/Alert";

class IlacEkleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            error: false,
        }
    }

    onClick = (event) => {
        let formVerileri = event.target.form;
        let tarih = formVerileri.skt.value.split('-');
        let formatliTarih = tarih[2]+'.'+tarih[1]+'.'+tarih[0];

        let etkenler = [];
        let etkenIsimleri = formVerileri.etkenler.value;

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
            skt: formatliTarih,
            etkenler: etkenler
        };

        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/';
        axios.post(url, {ilac:ilac}).then(res => {
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
                    <Form.Control type="text" placeholder="Lütfen ilacın adını giriniz." />
                </Form.Group>
                <Form.Group controlId="kod">
                    <Form.Label>İlaç Kodu</Form.Label>
                    <Form.Control type="text" placeholder="Lütfen ilacın kodunu giriniz." />
                </Form.Group>
                <Form.Group controlId="tur">
                    <Form.Label>İlaç Türü</Form.Label>
                    <Form.Control type="text" placeholder="Lütfen ilacın türünü giriniz." />
                </Form.Group>
                <Form.Group controlId="skt">
                    <Form.Label>Skt</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
                <Form.Group controlId="etkenler">
                    <Form.Label>Etkenler</Form.Label>
                    <Form.Control type="text" placeholder="Etken adlarını lütfen aralarına virgül koyarak giriniz."/>
                </Form.Group>
                <Button onClick={this.onClick} variant="success" block>
                    İlacı Kaydet
                </Button>
                <Button variant='info' onClick={()=>this.props.ilacEkleButonu()} block>Geri</Button>
            </Form>
            </div>
        );
    }
}

export default IlacEkleForm;