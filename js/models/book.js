import { getDataFromDoc, getDataFromDocs } from "../utils.js";
import { getCurrentUser } from "./user.js";

export let book = {
};

export async function viewBookDetail(name) {
    let response = await firebase.firestore().collection("books")
        .where("name", "==", name)
        .get();

    for (let doc of response.docs) {
        book.name = doc.data().name;
        book.author = doc.data().author;
        book.intro = doc.data().intro;
        book.cover_img = doc.data().cover_img;
        book.rating = doc.data().rating;
        book.reviews = doc.data().reviews;
        book.publish_day = doc.data().publish_day;
    }

    if (!response.empty) {
        console.log("found book");
        console.log("BOOK", book);
    } else {
        console.log("not found book");
    }

    return getDataFromDoc(response.docs[0]);
}

export async function searchBook(name) {
    let response = await firebase.firestore()
        .collection("books")
        .where("name", "==", name)
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
    let title = sessionStorage.getItem('selected'); // setItem ở BookContainer
    let author = sessionStorage.getItem('current-view-book-author'); // setItem ở ReviewScreen
    let currentViewingBook = await getCurrentViewingBook(title, author);
    firebase.firestore().collection('books').doc(currentViewingBook.id).onSnapshot(function (snapshot) {
        let data = getDataFromDoc(snapshot);
        callback(data);
    });
}

export async function getCurrentViewingBook(title, author) {
    let response = await firebase
        .firestore()
        .collection('books')
        .where('name', '==', title)
        .where('author', '==', author)
        .get();
    let result = getDataFromDocs(response.docs)[0];
    return result;
}

export function getAllBookRefId(shelf) {
    // let currentUser = await getCurrentUser();
    // let allBookRefId = [];

    // for (let shelf of currentUser.shelves) {
    //     let books = [];
    //     for (let book of shelf.booksOnShelf) {
    //         books.push(book.id);
    //     }
    //     allBookRefId.push(books);
    // }
    let allBookRefId = [];
    for (let book of shelf) {
        allBookRefId.push(book.id);
    }
    return allBookRefId;
}