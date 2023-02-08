"use strict";
// rendering Articles
const blogul = document.getElementById("Blog-list");

// RENDERING DATA FROM DATABASE

const Token = JSON.parse(localStorage.getItem("myToken"));
if (!Token) {
  window.location.href = "/login.html";
} else {
  const Authtoken = Token.token.data;
  const isLoggedin = Token.isLoggedin;
  if (!isLoggedin && !Authtoken) {
    window.location.href = "login.html";
  } else {
    // const url = "https://wilbrord-mybrand-backend.up.railway.app/api/article/getAllArticle";
    const url = "http://localhost:3000/api/article/getAllArticle";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8 ",
        Authorization: `Bearer ${Authtoken}`,
        authtoken: `${Authtoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => Articles(data))
      .catch((error) => console.log(error));

    function Articles(blog) {
      blog.forEach((article) => {
        blogul.appendChild(
          createList(article.title, article.description, article.date)
        );
      });
    }

    function createList(title, Image, date, index) {
      const li = document.createElement("li");
      li.innerHTML = `<div class="blogImage">
  <img src="${Image}" alt="blog image"/>
</div>
<div class="user-message username">
  <h3>
    ${title}

  </h3>
</div>
<div class="commentLike">
  <span class="comments-time">${date}</span>
  <div class="like-and-comment">
    <span
      ><h4>60</h4>
      <iconify-icon
        icon="fluent:thumb-like-24-filled"
        style="color: #052041"
        width="25"
      ></iconify-icon
    ></span>
    <span
      ><h4>6</h4>
      <iconify-icon
        icon="uis:comment-dots"
        style="color: #052041"
        width="25"
      ></iconify-icon
    ></span>
  </div>
</div>
<div class="button">
  <span class="update">
    <button onclick = "UpdateBlog(${index})">
      <iconify-icon
        inline
        icon="material-symbols:update"
        style="color: #052041"
        width="35"
      ></iconify-icon>
    </button>
  </span>

  <span class="delete">
    <button onclick = "DeleteBlog(${index})">
      <iconify-icon
        inline
        icon="material-symbols:delete-forever-outline-rounded"
        style="color: red"
        width="35"
      ></iconify-icon>
    </button>
  </span>
</div>`;
      return li;
    }
  }
}
