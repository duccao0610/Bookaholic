import { getDataFromDoc, getDataFromDocs } from "../utils.js";
import { getCurrentUser } from "./user.js";

export let book = {
};


export async function addBook(newBook) {
    await firebase.firestore()
        .collection("books")
        .add({
            name: newBook.name.toUpperCase(),
            author: newBook.author,
            categories: newBook.categories,
            intro: newBook.intro,
            cover_img: newBook.cover_img,
            publish_day: newBook.publish_day,
            isChecked: false,
            reviews: [],
            rating: 0,
            owners: []
        });
}

export async function viewBookDetail(id) {
    let response = await firebase.firestore().collection("books")
        .doc(id)
        .get();

    return getDataFromDoc(response);
}

export async function searchBookByName(name) {
    let response = await firebase.firestore()
        .collection("books")
        .where("name", ">=", name.toUpperCase())
        .where("name", "<=", name.toUpperCase() + '\uf8ff')
        .get();
    return getDataFromDocs(response.docs);
}

export async function searchBookByAuthor(author) {
    let response = await firebase.firestore()
        .collection("books")
        .where("author", ">=", author.toUpperCase())
        .where("author", "<=", author.toUpperCase() + '\uf8ff')
        .get();

    return getDataFromDocs(response.docs);
}

export async function getPopularBook() {
    let response = await firebase.firestore()
        .collection("books")
        .where("rating", ">=", 4)
        .get()
    let books = getDataFromDocs(response.docs);
    let popularBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (i <= 3) {
            popularBooks.push(books[i]);
        }
    }

    return popularBooks;
}

export async function getBooksByCategory(category) {
    let response = await firebase.firestore()
        .collection("books")
        .where("categories", "array-contains", category.toUpperCase())
        .get();

    return getDataFromDocs(response.docs);
}
export async function addReview(review) {
    let bookId = sessionStorage.getItem('selected'); // setItem ở BookContainer
    await firebase
        .firestore()
        .collection('books')
        .doc(bookId)
        .update({
            reviews: firebase.firestore.FieldValue.arrayUnion(review)
        });
}

export async function listenBookInfoChanges(callback) {
    let bookId = sessionStorage.getItem('selected'); // setItem ở BookContainer
    firebase.firestore().collection('books').doc(bookId).onSnapshot(function (snapshot) {
        let data = getDataFromDoc(snapshot);
        callback(data);
    });
}

export function getAllBookRefId(shelf) {
    let allBookRefId = [];
    for (let book of shelf) {
        allBookRefId.push(book.id);
    }
    return allBookRefId;
}

export async function turnOnLending() {
    let currentUser = await getCurrentUser();
    let currentViewingBookId = sessionStorage.getItem('selected');
    await firebase.firestore().collection('books').doc(currentViewingBookId).update({
        owners: firebase.firestore.FieldValue.arrayUnion(currentUser.id)
    });
}

export async function turnOffLending() {
    let currentUser = await getCurrentUser();
    let currentViewingBookId = sessionStorage.getItem('selected');
    let currentViewingBook = await viewBookDetail(currentViewingBookId);
    for (let owner of currentViewingBook.owners) {
        if (owner == currentUser.id) {
            await firebase.firestore().collection('books').doc(currentViewingBookId).update({
                owners: firebase.firestore.FieldValue.arrayRemove(currentUser.id)
            });
            break;
        }
    }
}