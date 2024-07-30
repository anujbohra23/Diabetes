// faqs.js
function toggleAnswer(answerId) {
  var answer = document.getElementById(answerId);
  if (answer.style.display === "none") {
    answer.style.display = "block";
  } else {
    answer.style.display = "none";
  }
}

function askQuestion() {
  const question = document.getElementById("questionInput").value;
  const context = document.getElementById("context").textContent.trim(); // Ensure it's not empty
  console.log("Context:", context);

  if (!question || !context) {
    document.getElementById("qaResult").innerText =
      "Both question and context are required.";
    return;
  }

  fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, context }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response Data:", data); // Debugging output
      const resultElement = document.getElementById("qaResult");
      if (data.answer) {
        resultElement.innerText = data.answer;
      } else {
        resultElement.innerText = "No answer found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("qaResult").innerText = "An error occurred.";
    });
}
