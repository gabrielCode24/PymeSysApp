import {
  IonContent, IonPage,
  IonHeader, IonToolbar, IonButtons,
  IonBackButton, IonGrid, IonRow, IonCol,
  IonImg
} from '@ionic/react';
import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  arrowBackOutline
} from 'ionicons/icons';
//import './Home.css';
import { url } from '../utilities/utilities.js'
import escaner from '../assets/images/escaner.png'
import editar from '../assets/images/editar_producto.png'

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: url(),
      matricula: false,
      editar_producto: false
    }
  }

  redirigir = (modulo) => {
    switch (modulo) {
      case 'matricula':
        this.setState({ matricula: true });
        break;
      case 'editar_productos':
        this.setState({ editar_producto: true })
    }
  }

  render() {

    if (this.state.matricula) {
      return (<Redirect to={'/matricula-productos'} />)
    }
    
    if(this.state.editar_producto){
      return (<Redirect to={'/editar-info-productos'} />)
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
              <IonRow>
                <IonCol size="6" onClick={() => this.redirigir('matricula')} style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid", backgroundSize: "cover"
                }}><IonImg src={escaner} style={{ height: "100%" }}></IonImg></IonCol>

                <IonCol size="6" onClick={() => this.redirigir('editar_productos')} style={{
                  height: "140px", borderColor: "#C0C0C0",
                  borderWidth: "1px", borderStyle: "solid"
                }}><IonImg src={editar} style={{ height: "100%" }}></IonImg></IonCol>
              </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage >
    )
  }
}

export default Inventario;
