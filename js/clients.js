const client = document.getElementById("list-of-clients");
const username = document.getElementById("user-name");
const adminname = document.getElementById("admin-name");

const myToken = JSON.parse(localStorage.getItem("myToken"));
if (!myToken) {
  window.location.href = "/login.html";
} else {
  const authtoken = myToken.token.data;
  const isLoggedIn = myToken.isLoggedin;
  const accountOwnername = myToken.token.name;
  const accountOwnerEmail = myToken.token.user;

  if (!isLoggedIn && !authtoken) {
    window.location.href = "login.html";
  } else {
    // RENDERING DATA FROM DATABASE
    username.innerHTML = `<h5>${accountOwnername}</h5>`;
    adminname.innerHTML = `<h3>${accountOwnername}</h3>
                            <h4>${accountOwnerEmail}</h4>`;
    const url =
      "https://wilbrord-mybrand-backend.up.railway.app/api/user/getAllUsers";
    //const url = "http://localhost:3000/api/user/getAllUsers";
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
        var date = new Date(users[i].date);
        var shortDate = date.toLocaleDateString();
        client.appendChild(
          createList(users[i].name, users[i].email, shortDate)
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
  <p>${message}</p>
  <div class="comments-time">${date}</div>
</div>`;
      return li;
    }
  }
}
