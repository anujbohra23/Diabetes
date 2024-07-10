function saveEmail() {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      var email = document.getElementById("but10").value;

      // You can send the email address to a server-side script using AJAX or fetch
      // For demonstration purposes, I'll just display the email address in the response div
      var responseDiv = document.getElementById("response");
      responseDiv.textContent =
        "Thank you! We received your email address: " + email;
    });
}
