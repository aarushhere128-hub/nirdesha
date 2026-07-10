import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AQ.Ab8RN6JervMMloeNyK67amdslhDFJGTBAxP93vcuLuk1Pq4GOA"
});
import { db, collection, addDoc } from "./firebase.js";
async function generateRoadmap() {

    let goal = document.getElementById("goalInput").value;

    let result = document.getElementById("result");

    if (goal.trim() === "") {
        result.innerHTML = "Please enter a goal first.";
        return;
    }


    result.innerHTML = "<p>Generating roadmap...</p>";

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a roadmap for this goal:

${goal}

Return the roadmap in Markdown with headings and bullet points.`
});

result.innerHTML = `
<h2>Your AI Roadmap</h2>
<pre>${response.text}</pre>
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
