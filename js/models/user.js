import md5, { getDataFromDoc, getDataFromDocs } from "../utils.js";
export async function register(name, email, password) {
    let response = await firebase.firestore().collection("users").where("email", "==", email).get();
    if (response.empty) {
        await firebase.firestore().collection("users").add({
            name: name,
            email: email,
            password: md5(password)
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
        throw new Error("User not exist");
    }
    return getDataFromDoc(response.docs[0]);
}

export async function getCurrentUser() {
    let token = localStorage.getItem("token");
    let currentUser = await getUserByToken(token);
    return currentUser;
}


