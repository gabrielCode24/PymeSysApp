import {
  IonContent, IonPage,
  IonGrid, IonRow,
  IonCol, IonButton, IonImg
} from '@ionic/react';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Home.css';
import facturar from '../assets/images/facturar.jpeg'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  redirigir = (modulo) => {
    switch (modulo) {
      case 'factura':
        this.setState({ facturar: true });
        break;
    }
  }

  render() {

    if (this.state.facturar) {
      return (<Redirect to={'/factura'} />)
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
                  borderWidth: "1px", borderStyle: "solid", backgroundSize:"cover"
                }}><IonImg src={facturar} style={{ height:"100%" }}></IonImg></IonCol>
                <IonCol size="6" style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}>ion-col row1</IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="6" style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}>ion-col row2</IonCol>
                <IonCol size="6" style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}>ion-col row2</IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage >
    )
  }
}

export default Home;
