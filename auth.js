let signUpMode = false;

const displayName = document.getElementById("displayName");
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
