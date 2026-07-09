import {
    auth,
    db,
    doc,
    setDoc,
    serverTimestamp,
    googleProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "./firebase.js";

let signUpMode = false;
const signupFields = document.getElementById("signupFields");
const confirmContainer = document.getElementById("confirmPasswordContainer");

const authButton = document.getElementById("authButton");
const toggleMode = document.getElementById("toggleMode");
const toggleQuestion = document.getElementById("toggleQuestion");
const subtitle = document.querySelector(".subtitle");
const message = document.getElementById("message");

function updateUI() {

    if (signUpMode) {

        signupFields.style.display = "block";
        confirmContainer.style.display = "block";

        authButton.textContent = "Create Account";

        subtitle.textContent =
            "Create your Nirdesha account.";

        toggleQuestion.textContent =
            "Already have an account?";

        toggleMode.textContent = "Sign In";

    }

    else {

        signupFields.style.display = "none";
        confirmContainer.style.display = "none";

        authButton.textContent = "Sign In";

        subtitle.textContent =
            "Every goal deserves a roadmap.";

        toggleQuestion.textContent =
            "Don't have an account?";

        toggleMode.textContent = "Sign Up";

    }

    message.textContent = "";

}

toggleMode.addEventListener("click", function (e) {

    e.preventDefault();

    signUpMode = !signUpMode;

    updateUI();

});

updateUI();
const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", async () => {

    try {

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        const user = result.user;

        message.style.color = "green";
        message.textContent =
            "Welcome, " + user.displayName;
        window.location.href = "dashboard.html";

        console.log("Logged in:", user);

    }

    catch(error){

        message.style.color = "red";
        message.textContent =
            error.message;

        console.error(error);

    }

});
authButton.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.style.color = "red";

    try {

        if (signUpMode) {

            const confirmPassword =
            document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {

                message.textContent =
                "Passwords do not match.";

                return;
            }


            const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const displayName =
document.getElementById("displayName").value;

await updateProfile(
    userCredential.user,
    {
        displayName: displayName
    }
);
await setDoc(
    doc(db, "users", userCredential.user.uid),
    {
        displayName: displayName,
        email: email,
        createdAt: serverTimestamp(),
        roadmapCount: 0
    }
);
            message.style.color = "green";
            message.textContent =
            "Account created!";
            window.location.href = "dashboard.html";

            console.log(userCredential.user);

        }

        else {

            const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.style.color = "green";
            message.textContent =
            "Welcome back!";
window.location.href = "dashboard.html";
            console.log(userCredential.user);

        }

    }

    catch(error){

        message.textContent =
        error.message;

        console.error(error);

    }

});
