import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonRow, IonCol, IonButtons, IonMenuButton, IonTabBar, IonTabButton, useIonViewDidEnter, IonTextarea, IonIcon, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonAvatar, IonCardContent, IonList } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import Login from './Login';
import { addCircleSharp, camera, checkmarkCircle, listOutline, logOutSharp, play, statsChartOutline, stopCircle, syncCircleSharp } from 'ionicons/icons';

import Head from './Head';
import { URL_IP } from './config';
const EtatDemande: React.FC = () => {
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
    // log();
    // voirSolde();

  }, []);

  useEffect(() => {
    demande();
  },[])
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
            <IonLabel>Expiration</IonLabel>
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
              <IonTitle size="large">Etat des demandes</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard color={'light'} style={{ "width": "450px" }}>
            <IonCardHeader>
              <IonCardTitle>Les demandes de Rechargement</IonCardTitle>
            </IonCardHeader>
            <IonCardContent color='dark'>
              <IonList>
                <IonItem color={'primary'}>
                  <IonLabel>Mise</IonLabel>
                  <IonLabel>Date</IonLabel>
                  <IonLabel>Validation</IonLabel>
                </IonItem>
                {allCentrifuge}

              </IonList>

            </IonCardContent>
          </IonCard>
        </IonContent>

      </IonPage></>

  );
};

export default EtatDemande;
