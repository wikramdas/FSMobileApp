import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const textCollection = firestore().collection('TEXTDATA');
const calculatorCollection = firestore().collection('CALCULATEDATA');

const currentTimestamp = firestore.Timestamp.now()
export default class FSDBHandler {
    async insertTextData(text, onCompleted) {
        const authUserId = auth().currentUser.uid
        let requestData = {
            "text": text,
            "createdAt": currentTimestamp,
            "userId": authUserId,
        }
        textCollection
            .add(requestData)
            .then(() => { onCompleted(true) })
            .catch((error) => {
                onCompleted(true)
                console.log(error)
            })
    }
    async loadTextData(onLoaded) {
        const authUserId = auth().currentUser.uid
        var snapshotDoc = await textCollection
            .where("userId", "==", authUserId)
            .orderBy("createdAt", "desc")
        await snapshotDoc.get().then((docSnap) => {
            let textData = []
            if (docSnap && docSnap.docs.length > 0) {
                docSnap.forEach((doc) => {
                    let envoyDataObj = doc.data()
                    envoyDataObj.textId = doc.id
                    textData.push(envoyDataObj)
                })
            }
            onLoaded(textData)
        }).catch((error) => {
            console.log("===error===", error)
            onLoaded(null)
        })
    }

    async insertCalculatedData(calData, onCompleted) {
        const authUserId = auth().currentUser.uid
        calData.userId = authUserId
        calData.createdAt = currentTimestamp
        calculatorCollection
            .add(calData)
            .then(() => { onCompleted(true) })
            .catch((error) => {
                onCompleted(true)
                console.log(error)
            })
    }
    async loadCalculatedData(onLoaded) {
        const authUserId = auth().currentUser.uid
        var snapshotDoc = await calculatorCollection
            .where("userId", "==", authUserId)
            // .orderBy("createdAt", "desc")
        await snapshotDoc.get().then((docSnap) => {
            let calData = []
            if (docSnap && docSnap.docs.length > 0) {
                docSnap.forEach((doc) => {
                    let envoyDataObj = doc.data()
                    envoyDataObj.id = doc.id
                    calData.push(envoyDataObj)
                })
            }
            onLoaded(calData)
        }).catch((error) => {
            onLoaded(null)
        })
    }

    async uploadFiles(fileName, fileUrl, onResponse) {
        const currentUser = auth().currentUser.uid
        const task = await storage()
            .ref(`${currentUser}/${fileName}`)
            .putFile(fileUrl);
        onResponse(true)
    }
    async getUploadedFiles(onResponse) {
        const currentUser = await auth().currentUser.uid
        const imageRefs = await storage().ref(currentUser).listAll();
        const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()))
        onResponse(urls)
        return
    }
}