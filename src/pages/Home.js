import {
  IonContent, IonPage,
  IonGrid, IonRow,
  IonCol, IonButton, IonImg
} from '@ionic/react';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//import './Home.css';
import facturar from '../assets/images/facturar.jpeg'
import inventario from '../assets/images/inventario.jpg'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facturar: false,
      inventario: false
    }
  }

  redirigir = (modulo) => {
    switch (modulo) {
      case 'factura':
        this.setState({ facturar: true });
        break;
      case 'inventario':
        this.setState({ inventario: true })
    }
  }

  render() {

    if (this.state.facturar) {
      return (<Redirect to={'/factura'} />)
    }
    
    if(this.state.inventario){
      return (<Redirect to={'/inventario'} />)
    }

    return (
      <IonPage>
        <IonContent>
          <div>
            <h1 style={{ textAlign: "center" }}>PYME SYS</h1>
            <IonGrid>
              <IonRow>
                <IonCol size="6" onClick={() => this.redirigir('factura')} style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid", backgroundSize: "cover"
                }}><IonImg src={facturar} style={{ height: "100%" }}></IonImg></IonCol>

                <IonCol size="6" onClick={() => this.redirigir('inventario')} style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}><IonImg src={inventario} style={{ height: "100%" }}></IonImg></IonCol>
              </IonRow>
                
              <IonRow>
                <IonCol size="6" style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}></IonCol>

                <IonCol size="6" style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}></IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage >
    )
  }
}

export default Home;
