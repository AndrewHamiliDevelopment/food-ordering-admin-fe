import firebase from 'firebase'

export const firebaseLoginWithPassword = async (props: {email: string; password: string}) => {
    console.log("🚀 ~ firebaseLoginWithPassword ~ props:", props)
    const { email, password } = props;
    try{
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("🚀 ~ firebaseLoginWithPassword ~ userCredential:", userCredential)
    } catch (error) {
        console.error('error', error);
    }
}

export const firebaseSignOut = async () => {
    await firebase.auth().signOut();
}