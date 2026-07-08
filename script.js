import { db, collection, addDoc } from "./firebase.js";
async function generateRoadmap() {

    let goal = document.getElementById("goalInput").value;

    let result = document.getElementById("result");

    if (goal.trim() === "") {
        result.innerHTML = "Please enter a goal first.";
        return;
    }


    result.innerHTML = `
        <h2>Your Roadmap</h2>

        <h3>🎯 Goal:</h3>
        <p>${goal}</p>

        <h3>🪜 Phase 1: Foundation</h3>
        <ul>
            <li>Understand the basics</li>
            <li>Learn essential concepts</li>
            <li>Create a learning routine</li>
        </ul>

        <h3>🚀 Phase 2: Growth</h3>
        <ul>
            <li>Practice consistently</li>
            <li>Work on projects</li>
            <li>Track your improvement</li>
        </ul>

        <h3>🏆 Phase 3: Mastery</h3>
        <ul>
            <li>Challenge yourself</li>
            <li>Build advanced skills</li>
            <li>Achieve your goal</li>
        </ul>
    `;
    localStorage.setItem("goal", goal);
localStorage.setItem("roadmap", result.innerHTML);

try {
    await addDoc(collection(db, "roadmaps"), {
        goal: goal,
        roadmap: result.innerHTML,
        createdAt: new Date()
    });

    console.log("Roadmap saved to Firestore!");

} catch (error) {

    console.error("Error saving roadmap:", error);

}
}
window.onload = function () {

    let savedRoadmap = localStorage.getItem("roadmap");

    if (savedRoadmap) {

        document.getElementById("result").innerHTML = savedRoadmap;

        document.getElementById("goalInput").value =
            localStorage.getItem("goal");

    }

}
function clearRoadmap() {

    document.getElementById("goalInput").value = "";

    document.getElementById("result").innerHTML = "";

    localStorage.removeItem("goal");
    localStorage.removeItem("roadmap");

}
window.generateRoadmap = generateRoadmap;
window.clearRoadmap = clearRoadmap;
