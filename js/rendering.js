// RENDERING MESSAGES FROM DATABASE
const messageul = document.getElementById("list-of-message");
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

  if (!isLoggedIn) {
    window.location.href = "login.html";
  } else {
    username.innerHTML = `<h5>${accountOwnername}</h5>`;
    adminname.innerHTML = `<h3>${accountOwnername}</h3>
                            <h4>${accountOwnerEmail}</h4>`;

    const url =
      "https://wilbrord-mybrand-backend.up.railway.app/api/messages/show";
    //const url = "http://localhost:3000/api/messages/show";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8 ",
        Authorization: `Bearer ${authtoken}`,
        authtoken: `${authtoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => AllMessages(data))
      .catch((error) => console.log(error));

    function AllMessages(mess) {
      for (let i = mess.length - 1; i > mess.length - 6; i--) {
        var date = new Date(mess[i].date);
        var shortDate = date.toLocaleDateString();
        messageul.appendChild(
          createList(mess[i].name, mess[i].subject, mess[i].Message, shortDate)
        );
      }
      document.getElementById("countMessage").textContent = mess.length;
    }

    function createList(name, subject, message, date) {
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
    <h3 id="Username">${name}</h3>
  </div>
  <div id="message">
  <h4 id="subject">${subject}</h4">
   <p>${message}</p>
  </div>
  <p id="messagedate">${date}</p>
</div>`;
      return li;
    }
  }

  // RENDERING BLOG ON DASHBOARD

  const blogul = document.getElementById("Blog-list");

  if (!isLoggedIn && !authtoken) {
    window.location.href = "login.html";
  } else {
    const url =
      "https://wilbrord-mybrand-backend.up.railway.app/api/article/getAllArticle";
    //const url = "http://localhost:3000/api/article/getAllArticle";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8 ",
        Authorization: `Bearer ${authtoken}`,
        authtoken: `${authtoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => Articles(data))
      .catch((error) => console.log(error));

    function Articles(blog) {
      document.getElementById("countArticles").textContent = blog.length;
      // console.log(blog.length);
      for (let i = blog.length - 1; i > blog.length - 6; i--) {
        blogul.appendChild(
          createList(blog.length - i, blog[i].title, blog[i].date)
        );
      }
    }

    function createList(i, title, date) {
      var data = new Date(date);
      var shortDate = data.toLocaleDateString();
      const li = document.createElement("li");

      li.innerHTML = `<div class="blogImage">
 
      <h3>${i}</h3>
</div>
<div class="user-message DBmessage">
  <h3>
    ${title}

  </h3>
</div>
  <span class="comments-time">${shortDate}</span>

`;
      return li;
    }
  }

  // TOTAL NUMBER OF CLIENTS
  if (!isLoggedIn && !authtoken) {
    window.location.href = "login.html";
  } else {
    // RENDERING DATA FROM DATABASE
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
      document.getElementById("countClients").textContent = users.length;
    }
  }
}
