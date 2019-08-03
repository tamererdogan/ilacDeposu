import React from 'react'
import IlacEkleForm from './IlacEkleForm'
import IlacTablosu from './IlacTablosu'
import Button from 'react-bootstrap/Button';
import IlacDuzenleForm from "./IlacDuzenleForm";
import Ayrintilar from "./Ayrintilar";

class AnaTablo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ilacEkle: false,
            ilacDuzenle: false,
            ilacKodu: '',
            ayrinti: false,
        }
    }

    ilacEkleButonu = () => {
        this.setState({ilacEkle: !this.state.ilacEkle})
    };

    guncelleButonu = (ilacKodu) => {
        this.setState({ilacDuzenle: !this.state.ilacDuzenle, ilacKodu: ilacKodu})
    };

    ayrintilarButonu = (ilacKodu) => {
        this.setState({ayrinti: !this.state.ayrinti, ilacKodu: ilacKodu})
    };

    render() {
        let margin = {
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 20,
        };

        let style = {
            backgroundColor:'#5D5DA3',
        };

        return (
        <div style={margin}>
            <h3>İlaçlar</h3>
            {(!this.state.ilacEkle && !this.state.ilacDuzenle && !this.state.ayrinti ) && <Button style={style} onClick={this.ilacEkleButonu} block>İlaç Ekle</Button>}
            {this.state.ilacEkle && <IlacEkleForm ilacEkleButonu={this.ilacEkleButonu} depo={this.props.depo}/>}
            {this.state.ilacDuzenle && <IlacDuzenleForm id={this.state.ilacKodu} guncelleButonu={this.guncelleButonu} depo={this.props.depo}/>}
            {this.state.ayrinti && <Ayrintilar id={this.state.ilacKodu} ayrintilarButonu={this.ayrintilarButonu} depo={this.props.depo}/>}
            {(!this.state.ilacEkle && !this.state.ilacDuzenle && !this.state.ayrinti) &&
            <IlacTablosu ayrintilarButonu={this.ayrintilarButonu} guncelleButonu={this.guncelleButonu} depo={this.props.depo}/>}
        </div>
        );
    }
}

export default AnaTablo;