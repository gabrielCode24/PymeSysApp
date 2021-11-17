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

class EditarInfoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: url(),
    }
  }

  render() {

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/inventario" icon={arrowBackOutline} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          Editar Info Productos
        </IonContent>
      </IonPage >
    )
  }
}

export default EditarInfoProductos;
