import firebase from 'firebase';

export default function reauthenticate(password){

    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credentials);
}