import md5 from "../utils.js";

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
        alert("login success");
        router.navigate("/welcome");
    } else {
        alert("Email or password not right.Please try again");
    }
}

