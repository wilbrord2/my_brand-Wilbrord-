const client = document.getElementById("list-of-clients");
let Clients;

const myToken = JSON.parse(localStorage.getItem("myToken"));
const authtoken = myToken.token.data;
const isLoggedIn = myToken.isLoggedin;
if (!isLoggedIn && !authtoken) {
  window.location.href = "login.html";
} else {
  // RENDERING DATA FROM DATABASE

  // const url = "https://wilbrord-mybrand-backend.up.railway.app/api/user/getAllUsers";
  const url = "http://localhost:3000/api/user/getAllUsers";
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8 ",
      Authorization: `Bearer ${authtoken}`,
      authtoken: `${authtoken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => Allusers(data))
    .catch((error) => console.log(error));

  function Allusers(users) {
    for (let i = 0; i < users.length; i++) {
      client.appendChild(
        createList(users[i].name, users[i].email, users[i].date)
      );
    }
    document.getElementById("countClients").textContent = users.length;
  }

  function createList(name, message, date) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="userProfile">
  <iconify-icon
    inline
    icon="mdi:user-circle"
    style="color: #36383b"
    width="50"
  ></iconify-icon>
</div>
<div class="user-message">
  <div class="username">
    <h3>${name}</h3>
  </div>
  <div class="comments-time">${date}</div>
  <p>${message}</p>
</div>`;
    return li;
  }
}
