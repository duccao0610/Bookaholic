let router = new Navigo(null, true);
let $app = document.getElementById("app");

router.on("/register", function () {
    $app.innerHTML = "<register-screen></register-screen>";
}).resolve();

router.on("/login", function () {
    $app.innerHTML = "<log-in-screen></log-in-screen>";
}).resolve();

router.on(function () {
    // router.navigate("/login");
}).resolve();