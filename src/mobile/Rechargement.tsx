import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonRow, IonCol, IonButtons, IonMenuButton, IonTabBar, IonTabButton, useIonViewDidEnter, IonTextarea, IonIcon, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonAvatar, IonCardContent, IonList } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import Login from './Login';
import { addCircleSharp, camera, checkmarkCircle, listOutline, logOutSharp, play, statsChartOutline, stopCircle, syncCircleSharp } from 'ionicons/icons';

import Head from './Head';
import { URL_IP } from './config';
const Rechargement: React.FC = () => {
  const ref = useRef(false);
  const { control, handleSubmit } = useForm();
  const [Error, setError] = useState<string>("");
  const [categorie, setCategorie] = useState<any[]>([]);
  const [demandes, setDemandes] = useState<any[]>([]);

  const [descri, setDescri] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [Montant, setMontant] = useState('');
  const [durer, setDurer] = useState('');
  const [message, setMessage] = useState("Ajout Non Reussi");

  const [error, seterror] = useState<string>("");
  const [showAlert1, setShowAlert1] = useState(false);

  const [solde, setSolde] = useState(0);
  const params = useParams<{ id: string }>();

  const [login, setLogin] = useState('ramanga@u.com');
  // sonct 
  const [password, setPassword] = useState('ramanga');
  const [redirect, setRedirect] = useState(false);
  const [Expiration, setExpiration] = useState(false);

  function log() {
    console.log(login);
    console.log(password);


    var fors = new FormData();
    fors.append("Montant", Montant);
    fors.append("categorieId", categorieId);
    fors.append("descriProduit", descri);
    fors.append("durer", durer);
    fors.append("pwds", password);
    fetch(URL_IP() + "/categories", {
      method: 'GET',
    }).then((result) => {
      return result.json();

    }).then((e) => {
      setCategorie(e.data);
      // console.log(categorie.length);      
      if (e.data.error != undefined) {
        setError(e.data.error);
        // localStorage.setItem("tokenHash", e.datas.name);
        // localStorage.setItem("iduser", e.datas.id);
        // setRedirect(true);
      } else {
        // setSolde()
        // setError(e.datas.message);
      }
    }, (e) => {
    });

  }
  // "users/{idusers}/demandes"
  function addEnchere() {
    var fors = new FormData();
    fors.append("montant", Montant);
    fetch(URL_IP() + "/users/" + localStorage.getItem("iduser") + "/demandes", {
      method: 'POST',
      body: fors,
      headers: {
        'token': `${localStorage.getItem("tokenHash")}`
      }
    }).then((result) => {
      return result.json();
    }).then((e) => {
      // setCategorie(e.data);
      console.log(e);
      if (e.error != undefined) {
        // setNisyError(true);
        setMessage(e.error.message);
        setShowAlert1(true);
      }
      else if (e.timestamp != undefined) {
        setMessage(e.message);
        setShowAlert1(true);
      }
      else {
        setMessage("Rechargement:" + Montant + " Ar effectuer");
        setShowAlert1(true);
        // setOk(true);

      }
    }, (e) => {
    });

  }
  // http://localhost:8080/users/1/comptes/currentsolde
  function voirSolde() {
    var fors = new FormData();
    fors.append("montant", Montant);
    fetch(URL_IP() + "/users/" + localStorage.getItem("iduser") + "/comptes/currentsolde", {
      method: 'GET'
    }).then((result) => {
      return result.json();
    }).then((e) => {
      // setCategorie(e.data);
      console.log(e);
      if (e.error != undefined) {
      }

      else {
        setSolde(e.data);
      }
    }, (e) => {
    });

  }
  function demande() {
    var fors = new FormData();
    fors.append("montant", Montant);
    // @GetMapping("users/{idusers}/demandes")
    fetch(URL_IP() + "/users/" + localStorage.getItem("iduser") + "/demandes", {
      method: 'GET'
    }).then((result) => {
      return result.json();
    }).then((e) => {
      // setCategorie(e.data);
      console.log(e);
      if (e.error != undefined) {
      }

      else {
        setDemandes(e.data);

      }
    }, (e) => {
    });

  }
  if (redirect) {
    // navigate(0);
    // navigate(props.url);
    // re
    setRedirect(false);
    // navigate(0);
  }

  const registerUser = (data: any) => {
    addEnchere();
  }
  useEffect(() => {
    log();
    voirSolde();

  }, []);

  // useEffect(() => {
  //   demande();
  // })
  if (Expiration == true) {
    localStorage.clear();
    setExpiration(false);
  }
  if (localStorage.getItem("tokenHash") == null) {
    // localStorage.clear();
    return (
      <Login />
    )


  }
  // @GetMapping("users/{idusers}/demandes")
  const openFileDialog = () => {
    (document as any).getElementById("file-upload").click();
    // State.bind;
  };
  const setImage = (_event: any) => {
    let f = _event.target.files![0];
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => {
      console.log(reader.result);
    }
  }

  const allCentrifuge = demandes.map(group => {
    let color = "";
    if (group.state == 1) {
      color = "Valider";
    } else {
      color = "En cours";
    }

    // console.log("Test");
    return (
      <>

        <IonItem>
          <IonLabel>{group.montant}</IonLabel>
          <IonLabel>{group.dateDemande}</IonLabel>
          <IonLabel>
            {color}
          </IonLabel>

        </IonItem>

        {/* </div> */}
      </>
    )
  })
  return (

    <><>
      {/* <Menu /> */}
    </><IonPage>
        <Head />
        <IonTabBar slot="top">
          <IonTabButton tab="tab4" href={"/etatDemande"}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={statsChartOutline}></IonIcon>
              
            </IonLabel>
            <IonLabel>Etat de demandes</IonLabel>
          </IonTabButton>
       
        </IonTabBar>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Rechargement</IonTitle>
          </IonToolbar>
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            header={'Message'}
            // subHeader={'Subtitle'}
            message={message}
            buttons={['OK']} />
        </IonHeader>


        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Rechargement</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonRow justify-content-center>
            {/* <IonCol size-md-0 size-lg-0 size-xl-0 size-xs-0></IonCol> */}
            <IonCol size-md-12 size-lg-11 size-xl-11 size-xs-11>
              <form onSubmit={handleSubmit(registerUser)} id="forme">
                <IonItem>
                  <IonLabel>Recharger


                  </IonLabel>
                  <IonInput name="Montantimale" value={Montant} type="number" onIonChange={(e: any) => { setMontant(e.target.value); }}></IonInput>
                </IonItem>

                <IonButton expand="block" onClick={(e) => { addEnchere(); }} type="submit" className="ion-margin-top">
                  RECHARGER
                </IonButton>
              </form>

              {<p>{error}</p>}</IonCol>

          </IonRow>
          <IonCard style={{ "width": "400px" }}>

            <IonCardHeader>
              <IonCardTitle>Solde:
                <strong></strong></IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonAvatar slot="start">
                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Logo Bitcoin</title><path d="M410.47 279.2c-5-11.5-12.7-21.6-28.1-30.1a98.15 98.15 0 00-25.4-10 62.22 62.22 0 0016.3-11 56.37 56.37 0 0015.6-23.3 77.11 77.11 0 003.5-28.2c-1.1-16.8-4.4-33.1-13.2-44.8s-21.2-20.7-37.6-27c-12.6-4.8-25.5-7.8-45.5-8.9V32h-40v64h-32V32h-41v64H96v48h27.87c8.7 0 14.6.8 17.6 2.3a13.22 13.22 0 016.5 6c1.3 2.5 1.9 8.4 1.9 17.5V343c0 9-.6 14.8-1.9 17.4s-2 4.9-5.1 6.3-3.2 1.3-11.8 1.3h-26.4L96 416h87v64h41v-64h32v64h40v-64.4c26-1.3 44.5-4.7 59.4-10.3 19.3-7.2 34.1-17.7 44.7-31.5s14-34.9 14.93-51.2c.67-14.5-.03-33.2-4.56-43.4zM224 150h32v74h-32zm0 212v-90h32v90zm72-208.1c6 2.5 9.9 7.5 13.8 12.7 4.3 5.7 6.5 13.3 6.5 21.4 0 7.8-2.9 14.5-7.5 20.5-3.8 4.9-6.8 8.3-12.8 11.1zm28.8 186.7c-7.8 6.9-12.3 10.1-22.1 13.8a56.06 56.06 0 01-6.7 1.9v-82.8a40.74 40.74 0 0111.3 3.4c7.8 3.3 15.2 6.9 19.8 13.2a43.82 43.82 0 018 24.7c-.03 10.9-2.83 19.2-10.33 25.8z" /></svg>
              </IonAvatar>
              <IonLabel>
                Solde Actuel:
                {solde} Ariary
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                {/* {mise} */}
              </IonLabel>

            </IonItem>
            <IonItem>

              {/* <IonButton color={color}> */}
              {/* {expira} */}
              {/* </IonButton> */}
            </IonItem>

            {/* </IonCardContent> */}
          </IonCard>
        </IonContent>

      </IonPage></>

  );
};

export default Rechargement;
