let router = new Navigo(null, true);
let $app = document.getElementById("app");

router.on("/register", function () {
    $app.innerHTML = "<register-screen></register-screen>";
}).resolve();

router.on("/login", function () {
    $app.innerHTML = "<log-in-screen></log-in-screen>";
}).resolve();

router.on("/welcome", function () {
    $app.innerHTML = "<welcome-screen></welcome-screen>";
}).resolve();

router.on("/detail", function () {
    $app.innerHTML = "<review-screen></review-screen>";
})

router.on("/results", function () {
    $app.innerHTML = "<search-results-screen></search-results-screen>";
})
router.on("/shelves", function () {
    $app.innerHTML = "<shelves-screen></shelves-screen>";
}).resolve();
router.on(function () {
    // router.navigate("/welcome");
}).resolve();

window.router = router;