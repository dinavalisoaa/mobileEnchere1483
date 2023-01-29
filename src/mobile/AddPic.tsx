import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  useIonModal,
  useIonViewWillEnter,
  IonSelect,
  IonSelectOption,
  IonMenu,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  useIonRouter,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/react';
import '../theme/styleGrid.css';
import Login from './Login';
import { NavContext } from '@ionic/react';
import { Link, useParams } from 'react-router-dom';
import { atOutline, backspace, camera, cameraReverseOutline, cloudUpload, fileTraySharp, imageOutline, information, informationCircle, informationCircleOutline, wineOutline } from 'ionicons/icons';
import Head from './Head';
import { URL_IP } from './config';
const AddPic: React.FC = () => {
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
        // setExp(true);
      } else {
        setList(e.data);
        setPhotos(e.photo);

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



  async function deleP(id: any) {
    try {
    }
    catch (err) {
      console.log(`Error: ${err}`);
      return;
    }

  }
  async function update(id: any, debut: any, fin: any, qtevato: any, pointsourceid: any) {
    try {
    }
    catch (err) {
      console.log(`Error: ${err}`);
      return;
    }

  } function up(): void {
    addP();
  }

  const allCentrifuge = list_.map(group => {


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
              <IonCardTitle>
                <strong>{group.descriProduit}</strong></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <img width={"550px"} src={photo} />
              <input type={"file"} id="file-upload" onChange={setImage} />
              <IonButton onClick={openFileDialog}><IonIcon slot="icon-only" icon={camera}></IonIcon></IonButton>
              <IonButton style={{ "width": "200px" }} onClick={() => up()} expand="block" >
                UPLOAD
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
       
         
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

            <IonTitle>Ajout Contenu Visuel</IonTitle>

          </IonToolbar>

        </IonHeader>
        <IonContent className="Ionpadding">

          {allCentrifuge}
          <IonGrid>
                    <IonRow>
                        {photos.map((va) => (
                            <IonCol size="6" >
                                {/* <IonIcon icon={closeCircleOutline} onClick={() => supPh(p[1])}>{p[1]}</IonIcon> */}
                                <IonImg src={va.photo} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid> 
        </IonContent>
      </IonPage></>

  );
};

export default AddPic;