import md5, { getDataFromDoc, getDataFromDocs } from "../utils.js";
import { viewBookDetail } from "./book.js";
export async function register(name, email, password) {
    let response = await firebase.firestore().collection("users").where("email", "==", email).get();
    if (response.empty) {
        await firebase.firestore().collection("users").add({
            name: name,
            email: email,
            password: md5(password),
            owning: []
        });
        alert("Register successful");
        router.navigate("/login");
    } else {
        alert("This email already in used ");
    }

};

export async function login(email, password) {
    let response = await firebase.firestore().collection("users")
        .where("email", "==", email)
        .where("password", "==", md5(password))
        .get();

    console.log(response);
    if (!response.empty) {
        let userId = response.docs[0].id;
        let token = generateToken(userId);
        localStorage.setItem("token", token);
        await updateUser(userId, { token: token });

        alert("login success");
        router.navigate("/welcome");
    } else {
        alert("Email or password not right.Please try again");
    }
}


//update user
export async function updateUser(id, data) {
    await firebase.firestore().collection("users").doc(id).update(data);
}

//get user
export function generateToken(id) {
    return md5(Date.now() + id);
}

export async function getUserByToken(token) {
    let response = await firebase.firestore()
        .collection("users")
        .where("token", "==", token)
        .get();

    if (response.empty) {
        // router.navigate("/login");
        throw new Error("User not exist");
    }
    return getDataFromDoc(response.docs[0]);
}

export async function getCurrentUser() {
    let token = localStorage.getItem("token");
    let currentUser = await getUserByToken(token);
    return currentUser;
}

export async function listenShelvesChanges(callback) {

    let currentUser = await getCurrentUser();

    firebase
        .firestore()
        .collection('users')
        .doc(currentUser.id)
        .onSnapshot(function (snapshot) {
            let data = getDataFromDoc(snapshot);
            callback(data);
        });
}

export async function removeShelf(removedShelfName) {
    let currentUser = await getCurrentUser();
    let removedShelf;
    for (let shelf of currentUser.shelves) {
        console.log(shelf.shelfName);
        if (shelf.shelfName == removedShelfName) {
            removedShelf = shelf;
            break;
        }
    }
    firebase
        .firestore()
        .collection('users')
        .doc(currentUser.id)
        .update({
            shelves: firebase.firestore.FieldValue.arrayRemove(removedShelf)
        })
}

export async function addBookToShelves() {
    let currentUser = await getCurrentUser();
    let bookId = sessionStorage.getItem('selected');
    let updatedShelves = sessionStorage.getItem('updatedShelves');
    let bookRef = await firebase.firestore().doc(`books/${bookId}`);

    for (let shelf of currentUser.shelves) {
        if (updatedShelves.includes(shelf.shelfName)) {
            shelf.booksOnShelf.push(bookRef);
        }
    }

    await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.id)
        .update({
            shelves: currentUser.shelves
        });
}

export async function createShelf(newShelf) {
    let currentUser = await getCurrentUser();
    await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.id)
        .update({
            shelves: firebase.firestore.FieldValue.arrayUnion(newShelf)
        });

}

export async function getBookOwners(book) {
    let response = await firebase.firestore()
        .collection("users")
        .where("owning", "array-contains", book)
        .get();

    return getDataFromDocs(response.docs);
}