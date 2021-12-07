import {
  IonContent, IonPage,
  IonHeader, IonToolbar,
  IonTitle, IonButtons, IonIcon,
  IonButton, IonList, IonItem,
  IonLabel, IonInput, IonSelect,
  IonSelectOption, IonBackButton
} from '@ionic/react';
import {
  arrowBackOutline
} from 'ionicons/icons';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//import './Home.css';
import { url, prepararPost } from '../utilities/utilities.js'
import Swal from 'sweetalert2'

class UsuarioCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: url(),
      logged: true,
      facturar: false,
      inventario: false,
      usuarios: false
    }
  }

  registrarUsuario = () => {
    var nombre = document.getElementById('nombre').value;
    var usuario = document.getElementById('usuario').value;
    var clave = document.getElementById('clave').value;
    var repetir_clave = document.getElementById('repetir_clave').value;
    var tipo_usuario = document.getElementById('tipo_usuario').value;

    if (clave == repetir_clave) {

      let Parameters = '?action=getJSON&get=verificar_usuario_existe&usr=' + usuario;

      fetch(this.state.url + Parameters)
        .then((res) => res.json())
        .then((responseJson) => {
          if (responseJson.length > 0) {
            //Si el producto en función del código de barra escaneado, ya existe, limpiamos el textbox del código de barras
            alert("Ya está registrado un producto con este código de barras, favor de verificar.")
            document.getElementById('barra').value = "";
          }
        })

    } else {
      Swal.fire({
        title: 'Algo falló',
        text: 'Las contraseñas no coinciden.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'yellow'
      });
    }

  }

  render() {

    if (!this.state.logged) {
      return (<Redirect to={'/login'} />)
    }

    if (this.state.facturar) {
      return (<Redirect to={'/factura'} />)
    }

    return (
      <IonPage>
        <IonContent>
          <IonHeader style={{ textAlign: "right" }}>
            <IonToolbar>

              <IonButtons slot="start">
                <IonBackButton defaultHref="/usuarios" icon={arrowBackOutline} />
              </IonButtons>

              <IonTitle style={{ fontFamily: "sans-serif" }}><b>CREAR USUARIO</b></IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItem>
              <IonLabel>Nombre:</IonLabel>
              <IonInput id="nombre" type="text" placeholder="Nombre del usuario"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Usuario:</IonLabel>
              <IonInput id="usuario" type="text" placeholder="Usuario"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Clave:</IonLabel>
              <IonInput id="clave" type="password" placeholder="Clave"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Rescriba la clave:</IonLabel>
              <IonInput id="repetir_clave" type="password" placeholder="Rescriba la clave"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Tipo de Usuario</IonLabel>
              <IonSelect okText="Aceptar" id="tipo_usuario" cancelText="Cancelar" placeholder="Vendedor" interface="action-sheet">
                <IonSelectOption value="2">Vendedor</IonSelectOption>
                <IonSelectOption value="1">Administrador</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton expand="block" onClick={() => this.registrarUsuario()}>Registrar Producto</IonButton>
          </IonList>

        </IonContent>
      </IonPage >
    )
  }
}

export default UsuarioCrear;
