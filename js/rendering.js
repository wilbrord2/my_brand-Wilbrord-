"use strict";
// rendering messages
const messageul = document.getElementById("list-of-message");
const blogul = document.getElementById("list-of-blogs");
let Messages, Blogs, Clients;
const date = Date();

function test() {
  Messages = JSON.parse(localStorage.getItem("Message"));
  for (let i = 0; i < Messages.length; i++) {
    messageul.appendChild(createList(Messages[i].fname, Messages[i].message));
  }
}
function Dtest() {
  //MESSAGE
  Messages = JSON.parse(localStorage.getItem("Message"));
  document.getElementById("countMessage").textContent = Messages.length;

  for (let i = Messages.length - 1; i >= Messages.length - 4; i--) {
    messageul.appendChild(createList(Messages[i].fname, Messages[i].message));
  }

  //ARTICLES
  Blogs = JSON.parse(localStorage.getItem("Blog"));
  document.getElementById("countArticles").textContent = Blogs.length;

  for (let i = 0; i < Blogs.length; i++) {
    blogul.appendChild(
      createBlogList(Blogs[i].Btitle, Blogs[i].Bdescription, Blogs[i].Bdate)
    );
  }

  //CLIENTS
  Clients = JSON.parse(localStorage.getItem("Clients"));
  document.getElementById("countClients").textContent = Clients.length;
}
function createList(name, message) {
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
    <div class="comments-time"></div>
  </div>
  <p id="message">
    ${message}
  </p>
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

  //   <p>
  //   ${message}
  //  </p>
}
