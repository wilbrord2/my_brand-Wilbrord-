"use strict";
// rendering messages
const messageul = document.getElementById("list-of-message");
const blogul = document.getElementById("list-of-blogs");
let Messages, Blogs, Clients;
const date = Date();

const myToken = JSON.parse(localStorage.getItem("myToken"));

// RENDERING DATA FROM DATABASE

// const url = "https://wilbrord-mybrand-backend.up.railway.app/api/messages/show";
const url = "http://localhost:3000/api/messages/show";
fetch(url, {
  method: "GET",
  headers: {
    "content-type": "application/json; charset=utf-8 ",
    Authorization: `Bearer ${myToken.token}`,
    authtoken: `${myToken.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => AllMessages(data))
  .catch((error) => console.log(error));

function AllMessages(mess) {
  for (let i = 0; i < mess.length; i++) {
    messageul.appendChild(
      createList(mess[i].name, mess[i].Message, mess[i].date)
    );
  }
  document.getElementById("countMessage").textContent = mess.length;

  for (let i = mess.length - 1; i >= mess.length - 3; i--) {
    messageul.appendChild(createList(mess[i].fname, mess[i].message));
  }
}

//ARTICLES
// Blogs = JSON.parse(localStorage.getItem("Blog"));
// document.getElementById("countArticles").textContent = Blogs.length;

// for (let i = 0; i < Blogs.length; i++) {
//   blogul.appendChild(
//     createBlogList(Blogs[i].Btitle, Blogs[i].Bdescription, Blogs[i].Bdate)
//   );
// }

//CLIENTS
Clients = JSON.parse(localStorage.getItem("Clients"));
document.getElementById("countClients").textContent = Clients.length;

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
    <h3 id="Username">${name}</h3>
  </div>
  <p id="message">
    ${message}
  </p>
  <p>${date}</p>
</div>`;
  return li;
}

function createBlogList(name, message, date) {
  const li = document.createElement("li");
  li.innerHTML = `<div class="userProfile">
  <iconify-icon
    icon="material-symbols:image-outline"
    style="color: #052041"
    width="50"
  ></iconify-icon>
</div>
<div class="user-message">
  <div class="username">
    <h3>${name}</h3>
    <div class="comments-time">${date}</div>
  </div>
 
</div>`;
  return li;
}
