import React from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios'


class ResimUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dosyaAdi: 'Resmi alana sürükleyip bırakın.',
            dosya: null,
        }
    }

    yukleButonu = (event) => {
        const veri = new FormData();
        veri.append('resim', this.state.dosya);
        let url = 'http://localhost:8000/rest/v1/depo/'+this.props.depo+'/ilac/'+this.props.ilacKodu+'/resim';
        axios.post(url, veri).then(res => {
            console.log(res.data.message);
                this.setState({dosyaAdi:res.data.message})
        }).then(null, error => this.setState({dosyaAdi:error.response.data.message}));
    };

    degisti = (event) => {
        this.setState({dosyaAdi:event.target.files[0].name, dosya:event.target.files[0]});
    };

    render() {

        let resimForm = {
            marginLeft: 20,
            marginTop: 35,
            width: 500,
            height: 250,
            border: '4px dashed #000',
        };

        let resimParagraf = {
            textAlign: 'center',
            lineHeight: 15,
            color: '#000',
            fontFamily: 'Arial',
        };

        let resimInput = {
            position: 'absolute',
            margin: 0,
            padding: 0,
            outline: 'none',
            opacity: 0,
            height: '240px',
        };

        let resimButon = {
            margin: 0,
            marginTop: 10,
            marginLeft: 19,
            height: 35,
            color: '#fff',
            background: '#16a085',
            border: 'none',
            width: '88%',
            borderRadius: 4,
            borderBottom: '4px solid #117A60',
            outline: 'none',
        };

        return (
            <div>
            <Form style={resimForm}>
                <Form.Control onChange={this.degisti} style={resimInput} type="file"/>
                <p style={resimParagraf}>{this.state.dosyaAdi}</p>
            </Form>
            <button style={resimButon} onClick={this.yukleButonu}>Yükle</button>
            </div>
        );
    }
}

export default ResimUpload;