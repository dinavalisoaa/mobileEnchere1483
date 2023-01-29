import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  useIonRouter,
  IonAvatar,
} from '@ionic/react';
import '../theme/styleGrid.css';
import Login from './Login';
import { NavContext } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { imageOutline, informationCircle } from 'ionicons/icons';
import { URL_IP } from './config';
const Info: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const ref = useRef(false);
  const params = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<any>("");

  const [list_, setList] = useState<any[]>([]);
  const [ok, setOk] = useState(false);

  const [list3mois, setList3mois] = useState<any[]>([]);
  const [list1mois, setList1mois] = useState<any[]>([]);
  const [ext, setExp] = useState<any>();
  var fin = useRef<HTMLIonInputElement>(null);
  var debut = useRef<HTMLIonInputElement>(null);
  var qtevato = useRef<HTMLIonInputElement>(null);
  var pointsourceid = useRef<HTMLIonSelectElement>(null);
  const [photos, setPhotos] = useState<any[]>([]);

  const initialize = async (): Promise<void> => {
    console.log('Entering initialize');
    try {
    }
    catch (err) {
      console.log(`Error: ${err}`);
      return;
    }
  }

  const openFileDialog = () => {
    (document as any).getElementById("file-upload").click();
    // State.bind;
  };
  const setImage = (_event: any) => {
    let f = _event.target.files![0];
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => {
      // console.log(reader.result);
      const kk = reader.result;
      setPhoto(kk);


      // setState({
      //     imgUp:reader.result;
      //   })
    }
  }
  // if (localStorage.length == 0 || ext == true) {
  //   // localStorage.clear();
  //   history.push('/dashboard/users/1');

  // }
  function addP() {
    // /users/{id}/encheres/{idc}/addPic")
    let url = URL_IP()+"/users/" + localStorage.getItem("iduser") + "/encheres/" + params.id + "/addPic";
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        photo: photo
      })
    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e);
      if (e.error != undefined) {
        // setExp(true);
      } else {
        setList(e.data);
        setOk(true);
      }

    }, (e) => {
    });

  }
  function addEnchere() {
    // /users/{id}/encheres/{idc}/addPic")
    let url = URL_IP()+"/users/" + localStorage.getItem("iduser") + "/encheres/" + params.id;
    console.log(url);
    fetch(url, {
      method: 'GET',

    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e);
      if (e.error != undefined) {
      } else {
        setList(e.data);
      }

    }, (e) => {
    });

  }
  const router = useIonRouter();

  //	A simple, hard-coded navigation
  useEffect(() => {
    addEnchere();
  }, [])
  if (ext == true) {
    localStorage.clear();
    setExp(false);
  }
  if (ok == true) {
    window.location.href = "addPic/" + params.id;

  }
  if (localStorage.length == 0) {
    // setExp(false);
    return (
      <Login />
    )
  }

  function up(): void {
    addP();
  }
  const allCentrifuge = list_.map(group => {
    let expira = "";
    let color = "";
    if (group.expiration == true) {
      expira = "EXPIRER";
      color = 'danger';
    } else {
      expira = "En cours";
      color = 'success';

    }
    let nom = "Pas encore d'enchere";
    let mise = "";
    if (group.userGagnant.id != -1) {
      nom = "Gagnant: " + group.userGagnant.nom;
      mise = "Montant Miser: " + group.userGagnant.miseGagnant + "Ariary";
    }
    // console.log("Test");
    return (
      <>
        {/* <IonCard>
          <img alt="Silhouette of mountains" src={require("../theme/test.PNG")} />
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Here's a small text description for the card content. Nothing more, nothing less.
          </IonCardContent>
        </IonCard> */}
        {/* <div className='grid-container'> */}

        <div>
          <IonCard style={{ "width": "400px" }}>

            <IonCardHeader>
              <IonCardTitle>Description:
                <strong>{group.descriProduit}</strong></IonCardTitle>
            </IonCardHeader>
            {/* <IonCardContent> */}
            <IonItem>
              <IonAvatar slot="start">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Trophy</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 464h160M256 464V336M384 224c0-50.64-.08-134.63-.12-160a16 16 0 00-16-16l-223.79.26a16 16 0 00-16 15.95c0 30.58-.13 129.17-.13 159.79 0 64.28 83 112 128 112S384 288.28 384 224z"/><path d="M128 96H48v16c0 55.22 33.55 112 80 112M384 96h80v16c0 55.22-33.55 112-80 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg> </IonAvatar>
              <IonLabel>
                {nom}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                {mise}
              </IonLabel>
              
            </IonItem>
        <IonItem>
          
        <IonButton color={color}>
                {expira}
              </IonButton>
        </IonItem>

            {/* </IonCardContent> */}
          </IonCard>
        </div> {
          photos.map((va) => {
            //    if()
            return (
              <IonCard style={{ "width": "400px", "height": "200px" }}>

                <><div>
                  <img width={"550px"} src={va.photo} />
                  <IonLabel>
                    {/* {va.} */}
                  </IonLabel>
                </div></>
              </IonCard>
            )
          })}
        {/* </div> */}
      </>
    )
  })

  return (
    <><>
      {/* <Menu /> */}
    </><IonPage>
    <IonTabBar slot="top">
        <IonTabButton tab="tab2" href={"/addPic/" + params.id}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={imageOutline}></IonIcon>
            </IonLabel>
            <IonLabel>Ajout Photo</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href={"/info/" + params.id}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={informationCircle}></IonIcon>

            </IonLabel>
            <IonLabel> More Info</IonLabel>
          </IonTabButton>
       
        </IonTabBar>
        <IonHeader>
          <IonToolbar>

            <IonTitle>Information</IonTitle>

          </IonToolbar>

        </IonHeader>
        <IonContent className="Ionpadding">

          {allCentrifuge}
        </IonContent>
      </IonPage></>

  );
};

export default Info;