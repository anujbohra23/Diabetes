function toggleAnswer(answerId) {
  var answer = document.getElementById(answerId);
  if (answer.style.display === "none") {
    answer.style.display = "block";
  } else {
    answer.style.display = "none";
  }
}
