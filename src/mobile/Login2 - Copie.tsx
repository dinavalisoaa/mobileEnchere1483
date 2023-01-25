import { IonContent, IonPage, IonTitle, IonButton, IonInput, IonItem, IonCol, IonIcon, IonGrid, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import AjoutEnchere from './AjoutEnchere';
import { Link } from 'react-router-dom';

const Logon: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { control, handleSubmit } = useForm();

  const [login, setLogin] = useState('ramanga@u.com');
  const [password, setPassword] = useState('ramanga');
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  function log() {
    console.log(login);
    console.log(password);

    var fors = new FormData();
    fors.append("logins", login);
    fors.append("pwds", password);
    fetch("http://localhost:8080/login", {
      method: 'POST',
      body: fors
    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e.datas);
      if (e.datas.name != undefined) {
        localStorage.setItem("tokenHash", e.datas.name);
        localStorage.setItem("iduser", e.datas.id);
        setRedirect(true);
        // window.location.href="ajout";
      } else {
        setError(e.datas.message);
      }
    }, (e) => {
    });

  }
  if (redirect) {
    // navigate(0);
    // navigate(props.url);
    return (
      <AjoutEnchere />
    );
    setRedirect(false);
    // navigate(0);
  }

  const registerUser = (data: any) => {

    log();
  }

  return (


    <IonPage>
      {/*     
      <IonHeader style={{"background-color":"black","color":"white"}}><IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
      
      </IonToolbar>
        <IonToolbar style={{"height":"100px"}}>
          <IonTitle  style={{"text-align":"center"}}>
            <IonIcon icon={login}></IonIcon>Login</IonTitle>
            <IonLabel> <IonIcon icon={login}></IonIcon></IonLabel>
        </IonToolbar>
      </IonHeader> */}
      <IonCard>

      </IonCard>
      {/* <IonCard style={{ "width": "350px", "margin-top": "100px" }}> */}
        {/* <div className='flex-container'>

        </div> */}
       
          <form onSubmit={handleSubmit(registerUser)} id="forme">
            <IonGrid>
              {/* <IonRow color="primary" justify-content-center> */}
                <IonCol>
                  {/* <div text-center > */}
                  <h1 style={{"marginTop":"10px","fontSize":"50px"}} >
                    <svg style={{ "width": "120px", "marginLeft": "75px" }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-15.36 -15.36 542.72 542.72" xmlSpace="preserve" fill="#000000" stroke="#000000" stroke-width="0.00512" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"><path transform="translate(-15.36, -15.36), scale(16.96)" d="M16,29.086845646146685C18.124924411520066,28.74541059727304,20.457806773959174,29.101617744858356,22.254123771949516,27.916237261636105C24.02021068267648,26.750805459792588,24.510369958822363,24.445210379630776,25.692917972071573,22.690538200176825C26.861444065975444,20.956671832835493,29.220430571202364,19.69412057185209,29.204443138318595,17.603309673200215C29.187994304470443,15.452157494494653,26.182876373914137,14.428537379066935,25.61387891430445,12.353936658194995C24.955637688268858,9.953947521199872,27.622184851380418,6.634040613452083,25.74713781021397,4.997755808547877C23.864383557280433,3.35474520251666,20.938519165494284,6.001421100702889,18.4414149185353,6.094790304886105C16.724534315107476,6.158986173286424,15.087356977707223,5.125810935621477,13.401964122481097,5.459354095496016C11.68879920934781,5.7983934101227534,10.466640071497002,7.215903930056579,8.897966155054739,7.9834609770095994C6.741216044857653,9.038765542379675,3.928939591136021,8.990596366225308,2.400517147395801,10.842396462617257C0.8503019471293609,12.720600141867585,-0.2073794031702969,15.613464981627615,0.7533543439416341,17.85127795304566C1.7827824162181998,20.249098889603207,5.811485026611095,19.863858334386478,7.217383587510312,22.062202401234583C8.705507309193708,24.389118471342947,6.436891101385788,28.3859424621712,8.593881920961998,30.11117902932057C10.568819088695783,31.690802729465094,13.503077899908154,29.488053667785763,16,29.086845646146685" fill="#66d9ff" strokeWidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.072"></g><g id="SVGRepo_iconCarrier"> <path style={{ "fill": "#FFDC64;" }} d="M461.228,405.641H341.511c-4.722,0-8.551,3.829-8.551,8.551v34.205h136.818v-34.205 C469.779,409.468,465.95,405.641,461.228,405.641z"></path> <path style={{ "fill": "#FFC850;" }} d="M384.267,405.641h-42.756c-4.722,0-8.551,3.829-8.551,8.551v34.205h42.756v-34.205 C375.716,409.468,379.545,405.641,384.267,405.641z"></path> <g> <path style={{ "fill": "#ff000d;" }} d="M222.18,179.516L13.026,388.671c-6.68,6.68-6.678,17.507,0,24.186c6.678,6.678,17.507,6.68,24.186,0 l209.155-209.155L222.18,179.516z"></path> <path style={{ "fill": "#ff000d;" }} d="M240.32,149.284l-24.186,24.186c-3.339,3.339-3.339,8.753,0,12.093l24.186,24.186 c3.339,3.339,8.754,3.339,12.093,0l24.186-24.186L240.32,149.284z"></path> </g> <rect x="208.192" y="115.076" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 366.6294 450.4235)" style={{ "fill": "#FFDC64;" }} width="136.817" height="68.409"></rect> <rect x="193.074" y="151.575" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 330.1282 465.5476)" style={{ "fill": "#FFC850;" }} width="136.817" height="25.653"></rect> <g> <path style={{ "fill": "#9B735A;" }} d="M191.948,137.19l-24.186-24.186c-3.339-3.339-3.339-8.754,0-12.093l60.466-60.466 c3.339-3.339,8.754-3.339,12.093,0l24.186,24.186c3.339,3.339,3.339,8.754,0,12.093l-60.466,60.466 C200.701,140.531,195.287,140.531,191.948,137.19z"></path> <path style={{ "fill": "#9B735A;" }} d="M312.879,258.122l-24.186-24.186c-3.339-3.339-3.339-8.754,0-12.093l60.466-60.466 c3.339-3.339,8.754-3.339,12.093,0l24.186,24.186c3.339,3.339,3.339,8.754,0,12.093l-60.466,60.466 C321.633,261.462,316.218,261.462,312.879,258.122z"></path> </g> <g> <path style={{ "fill": "#ff000d;" }} d="M210.087,119.051l-24.186-24.186c-3.339-3.339-3.339-8.754,0-12.093l-18.14,18.14 c-3.339,3.339-3.339,8.753,0,12.093l24.186,24.186c3.339,3.339,8.754,3.339,12.093,0l18.14-18.14 C218.841,122.39,213.427,122.39,210.087,119.051z"></path> <path style={{ "fill": "#ff000d;" }} d="M331.019,239.982l-24.186-24.186c-3.339-3.339-3.339-8.754,0-12.093l-18.14,18.14 c-3.339,3.339-3.339,8.753,0,12.093l24.186,24.186c3.339,3.339,8.754,3.339,12.093,0l18.14-18.14 C339.772,243.322,334.358,243.322,331.019,239.982z"></path> <path style={{ "fill": "#ff000d;" }} d="M498.671,452.799c-1.904-7.614-8.744-12.954-16.591-12.954H320.66 c-7.848,0-14.688,5.341-16.591,12.954l-3.985,15.938c-0.674,2.699,1.366,5.312,4.148,5.312h194.276 c2.781,0,4.823-2.615,4.148-5.312L498.671,452.799z"></path> </g> <path style={{ "fill": "#7D4B41;" }} d="M358.744,468.736l3.985-15.938c1.904-7.614,8.744-12.954,16.591-12.954h-58.66 c-7.848,0-14.688,5.341-16.591,12.954l-3.985,15.938c-0.674,2.698,1.366,5.312,4.147,5.312h58.66 C360.11,474.05,358.069,471.435,358.744,468.736z"></path> <path d="M318.926,268.644c4.426,0,8.586-1.723,11.715-4.853l60.465-60.465c3.13-3.13,4.854-7.29,4.854-11.715 s-1.723-8.586-4.853-11.715l-24.186-24.186c-3.13-3.13-7.29-4.853-11.715-4.853c-4.426,0-8.586,1.723-11.715,4.853l-0.378,0.378 l-73.314-73.315l0.378-0.378c3.13-3.129,4.853-7.29,4.853-11.715c0-4.425-1.723-8.586-4.853-11.715l-24.186-24.186 c-6.459-6.46-16.972-6.459-23.43,0l-60.465,60.465c-6.459,6.459-6.459,16.97,0,23.43l24.186,24.186c6.459,6.46,16.971,6.46,23.43,0 l0.378-0.378l12.849,12.849l-12.471,12.471c-3.13,3.13-4.854,7.29-4.854,11.715c0,1.573,0.228,3.109,0.649,4.581L7.357,383.003 C2.613,387.746,0,394.055,0,400.764c0,6.709,2.613,13.018,7.357,17.762c4.897,4.898,11.329,7.345,17.762,7.345 s12.865-2.449,17.762-7.345l198.905-198.905c1.472,0.421,3.008,0.649,4.581,0.649c4.426,0,8.586-1.723,11.715-4.853l12.471-12.471 l12.849,12.849l-0.377,0.377c-3.13,3.13-4.854,7.29-4.854,11.715s1.723,8.586,4.853,11.715l24.186,24.186 C310.339,266.92,314.499,268.644,318.926,268.644z M31.543,407.19c-3.542,3.541-9.306,3.541-12.849,0 c-1.716-1.716-2.662-3.998-2.662-6.425c0-2.427,0.945-4.708,2.662-6.424L216.135,196.9l12.849,12.849L31.543,407.19z M246.744,204.082c-0.038,0.038-0.156,0.156-0.377,0.156c-0.221,0-0.339-0.118-0.378-0.156l-24.187-24.188 c-0.038-0.038-0.156-0.156-0.156-0.377c0-0.221,0.118-0.339,0.156-0.378l12.471-12.471l24.943,24.943L246.744,204.082z M294.205,227.889c0-0.221,0.118-0.339,0.156-0.378l6.047-6.047c3.131-3.131,3.131-8.207,0-11.337l-78.984-78.984l18.518-18.518 c3.131-3.131,3.131-8.207,0-11.337c-3.131-3.131-8.207-3.131-11.337,0l-30.234,30.234c-0.208,0.207-0.547,0.207-0.756,0 l-24.186-24.186c-0.208-0.208-0.208-0.548,0-0.757l60.465-60.465c0.21-0.21,0.548-0.208,0.757,0l24.186,24.186 c0.208,0.208,0.208,0.547,0,0.756c0,0-5.627,5.627-6.018,6.017c-0.045,0.045-0.09,0.091-0.135,0.137 c-3.03,3.147-2.983,8.141,0.106,11.23l78.984,78.984l-18.518,18.518c-1.565,1.565-2.348,3.617-2.348,5.668 c0,2.051,0.782,4.103,2.348,5.668c3.131,3.131,8.207,3.131,11.337,0l30.234-30.234c0.039-0.038,0.156-0.156,0.377-0.156 c0.221,0,0.34,0.118,0.378,0.156l24.186,24.186c0.038,0.038,0.156,0.157,0.156,0.378s-0.118,0.339-0.156,0.378l-60.466,60.466 c-0.038,0.038-0.156,0.156-0.377,0.156c-0.221,0-0.339-0.118-0.378-0.156l-24.187-24.187 C294.323,228.228,294.205,228.11,294.205,227.889z"></path> <path d="M511.761,472.106l-5.312-21.25c-2.801-11.203-12.821-19.027-24.369-19.027h-4.284v-17.637 c0-9.136-7.432-16.568-16.568-16.568H341.511c-9.136,0-16.568,7.432-16.568,16.568v17.637h-4.284 c-11.547,0-21.568,7.824-24.369,19.027l-5.312,21.25c-0.6,2.394-0.061,4.932,1.458,6.878s3.85,3.083,6.319,3.083h205.228 c2.469,0,4.799-1.137,6.319-3.083C511.823,477.039,512.359,474.5,511.761,472.106z M309.024,466.033l2.822-11.29 c1.013-4.052,4.638-6.882,8.814-6.882h29.402c4.427,0,8.017-3.589,8.017-8.017c0-4.427-3.589-8.017-8.017-8.017h-9.085v-17.637 c0-0.295,0.239-0.534,0.534-0.534h119.716c0.295,0,0.534,0.239,0.534,0.534v17.637h-77.499c-4.427,0-8.017,3.589-8.017,8.017 c0,4.427,3.589,8.017,8.017,8.017h97.817c4.176,0,7.801,2.829,8.814,6.882l2.822,11.29H309.024z"></path> <path d="M393.353,328.68v42.756c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017V328.68 c0-4.427-3.589-8.017-8.017-8.017C396.942,320.664,393.353,324.252,393.353,328.68z"></path> <path d="M431.989,378.606c1.151,0.576,2.374,0.848,3.579,0.848c2.941,0,5.772-1.625,7.177-4.433l8.551-17.102 c1.981-3.96,0.375-8.776-3.585-10.755c-3.959-1.981-8.775-0.375-10.755,3.585l-8.551,17.102 C426.423,371.81,428.029,376.626,431.989,378.606z"></path> <path d="M355.029,347.164c-3.96,1.98-5.566,6.795-3.585,10.755l8.551,17.102c1.405,2.809,4.235,4.433,7.177,4.433 c1.205,0,2.427-0.273,3.579-0.848c3.96-1.98,5.566-6.795,3.585-10.755l-8.551-17.102 C363.804,346.787,358.989,345.182,355.029,347.164z"></path> </g></svg>
                  Lavente
                  </h1> {/* <IonTitle >
                       <IonIcon style={{ "text-align": "center","height": "70px","width": "70px","margin-left":"100px"}} icon={personCircleOutline}></IonIcon></IonTitle> */}

                    <IonTitle style={{ "text-align": "center" }}>LOGIN</IonTitle>
                  {/* </div> */}
                  {/* <div padding> */}
                  <IonItem>
                    <IonInput name="login" value={login} type="text" onIonChange={(e: any) => { setLogin(e.target.value) }} ></IonInput>

                  </IonItem>
                  <IonItem>
                    <IonInput name="password" value={password} type="password" onIonChange={(e: any) => { setPassword(e.target.value) }} ></IonInput>

                  </IonItem>
                  {/* </div> */}
                  {/* <div padding> */}
                  <IonButton expand="block" type="submit" onClick={(e) => { log() }} className="ion-margin-top">
                    Ajouter
                  </IonButton>
                  <Link to={"/logon"}  >    <IonButton color="success"  >Inscription
                    <IonIcon slot="icon-only" icon={login}></IonIcon>
                  </IonButton></Link>
                  {/* </div> */}
                </IonCol>
              {/* </IonRow> */}
            </IonGrid>
          </form>
        {/* </IonCardContent> */}
      {/* </IonCard> */}
      <IonContent>

      </IonContent>


    </IonPage>


  );
};

export default Logon;
