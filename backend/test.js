fetch("http://localhost:8080/api/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "newuser@example.com",
    password: "newpassword123",
    first_name: "Alice",
    last_name: "Smith",
    username: "alicesmith",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
