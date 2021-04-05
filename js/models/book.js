import { getDataFromDoc, getDataFromDocs } from "../utils.js";
import { getCurrentUser } from "./user.js";

export let book = {
};

export async function viewBookDetail(id) {
    let response = await firebase.firestore().collection("books")
        .doc(id)
        .get();

    return getDataFromDoc(response);
}

export async function searchBook(name) {
    let response = await firebase.firestore()
        .collection("books")
        .where("name", ">=", name)
        .where("name", "<=", name + '\uf8ff')
        .get();

    let route = router.navigate("/results");
    if (route) {
        location.reload();
    } else {
        router.navigate("/results");
    }

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
        .where("categories", "array-contains", category)
        .get();

    return getDataFromDocs(response.docs);
}
export async function addReview(review) {
    let title = sessionStorage.getItem('selected'); // setItem ở BookContainer
    let author = sessionStorage.getItem('current-view-book-author'); // setItem ở ReviewScreen
    let response = await firebase
        .firestore()
        .collection('books')
        .where('name', '==', title)
        .where('author', '==', author)
        .get();
    let result = getDataFromDocs(response.docs)[0];
    result.reviews.push(review);
    await firebase
        .firestore()
        .collection('books')
        .doc(result.id)
        .update({
            reviews: firebase.firestore.FieldValue.arrayUnion(review)
        });
}

export async function listenBooksStatusChanges(callback) {
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