import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");


onAuthStateChanged(auth, (user) => {


    if (user) {

        welcome.textContent =
        welcome.textContent =
"Welcome, " + (user.displayName || user.email);


    } 
    
    else {

        window.location.href = "auth.html";

    }

});



logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "auth.html";

});
