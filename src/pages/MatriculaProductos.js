import {
  IonContent, IonPage,
  IonHeader, IonToolbar, IonButtons,
  IonBackButton, IonList, IonItem, IonLabel,
  IonInput, IonButton, IonSelect, IonSelectOption
} from '@ionic/react';
import { Component } from 'react'
//import { Redirect } from 'react-router-dom'
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {
  arrowBackOutline
} from 'ionicons/icons';
//import './Home.css';
import { url, prepararPost } from '../utilities/utilities.js'

class MatriculaProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: url(),
      aplica_isv: 1,
      sending: false,
      max_id_producto: 0
    }
  }

  escanear = async () => {
    const data = await BarcodeScanner.scan();

    document.getElementById('barra').value = data.text;
  }

  opcionSeleccionadaISV = (e) => {
    let aplica_isv = e.target.value;
    this.setState({ aplica_isv: aplica_isv });
  }

  registrarProducto = () => {

    var barra = document.getElementById('barra').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var aplica_isv = this.state.aplica_isv;
    var fec_ing = "NOW()";
    var usr_ing = "admin";

    if (barra.length > 0 && nombre.length > 4
      && (precio != null && precio.length > 0 && typeof (precio) != undefined && precio != "")) {
      this.setState({ sending: true });

      var values = {
        barcode: barra, nombre: nombre, aplica_isv: aplica_isv,
        fec_ing: fec_ing, usr_ing: usr_ing
      }

      const requestOptions = prepararPost(values, "productos", "setJsons", "jsonSingle");

      fetch(this.state.url, requestOptions)
        .then((response) => {
          if (response.status === 200) {

            setTimeout(() => {
              let ParametersMaxIdFacturaDetalle = '?action=getJSON&get=max_producto_id';
              console.log(this.state.url + ParametersMaxIdFacturaDetalle)

              fetch(this.state.url + ParametersMaxIdFacturaDetalle)
                .then((res) => res.json())
                .then((responseJson) => {
                  
                  if (responseJson.length > 0) {
                    this.setState({
                      max_id_producto: responseJson[0].producto_id,
                    });

                    setTimeout(() => {
                      var max_id_producto = this.state.max_id_producto;

                      var valuesPrecio = {
                        producto_id: max_id_producto, producto_barra: barra, precio: precio,
                        fec_ing: fec_ing
                      }

                      const requestOptionsProductoPrecio = prepararPost(valuesPrecio, "productos_precios", "setJsons", "jsonSingle");

                      fetch(this.state.url, requestOptionsProductoPrecio)
                        .then((response) => {
                          if (response.status === 200) {
                            this.setState({
                              sending: false
                            })
                            alert("Producto registrado exitosamente.");
                            document.getElementById('barra').value = "";
                            document.getElementById('nombre').value = "";
                            document.getElementById('precio').value = "";
                            this.setState({ aplica_isv: 1 })
                          } else {
                            alert("Ocurrió un error al registrar el producto.")
                          }
                        })
                    }, 1000)
                  }
                })
            }, 1000)

          } else {
            alert("Ocurrió un error.")
          }
        })
    } else {
      alert("Datos incorrectos/incompletos, favor verifique los datos del producto");
    }

  }

  verificarCodigoBarra = () => {
    var barra = document.getElementById('barra').value;

    let Parameters = '?action=getJSON&get=verificar_producto_existe&barcode=' + barra;

    fetch(this.state.url + Parameters)
      .then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.length > 0) {
          //Si el producto en función del código de barra escaneado, ya existe, limpiamos el textbox del código de barras
          alert("Ya está registrado un producto con este código de barras, favor de verificar.")
          document.getElementById('barra').value = "";
        }
      })
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
          <IonList>
            <IonItem>
              <IonLabel>Barra:</IonLabel>
              <IonInput id="barra" placeholder="Barra del producto" onIonChange={() => this.verificarCodigoBarra()} readonly></IonInput>
              <IonButton expand="block" onClick={() => this.escanear()}>Escanear</IonButton>
            </IonItem>

            <IonItem>
              <IonLabel>Nombre:</IonLabel>
              <IonInput id="nombre" placeholder="Nombre del producto"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Precio:</IonLabel>
              <IonInput id="precio" type="number" placeholder="Precio (L)"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>¿Aplica ISV?</IonLabel>
              <IonSelect okText="Aceptar" cancelText="Cancelar" onIonChange={(e) => this.opcionSeleccionadaISV(e)} placeholder="Sí aplica" interface="action-sheet">
                <IonSelectOption value="1">Sí aplica</IonSelectOption>
                <IonSelectOption value="0">No aplica</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton expand="block" onClick={() => this.registrarProducto()}>Registrar Producto</IonButton>
          </IonList>
        </IonContent>
      </IonPage >
    )
  }
}

export default MatriculaProductos;
