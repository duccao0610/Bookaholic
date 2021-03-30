import { getDataFromDoc, getDataFromDocs } from "../utils.js";

export let book = {
};

export async function viewBookDetail(name) {
    let response = await firebase.firestore().collection("books")
        .where("name", "==", name)
        .get();

    for (let doc of response.docs) {
        console.log(doc.data());
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
        // router.navigate("/detail");
    } else {
        console.log("not found book");
    }

    return getDataFromDoc(response.docs[0]);
}

