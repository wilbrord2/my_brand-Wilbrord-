"use strict";

// rendering Articles
const blogul = document.getElementById("Blog-list");
let Blogs;

function Articles() {
  Blogs = JSON.parse(localStorage.getItem("Blog"));
  for (let i = 0; i < Blogs.length; i++) {
    blogul.appendChild(
      createList(Blogs[i].Btitle, Blogs[i].Bimage, Blogs[i].Bdate, i)
    );
  }
  // console.log(Blogs[0].Bimage);
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
function DeleteBlog(index) {
  Blogs.splice(index, 1);
  window.localStorage.setItem("Blog", JSON.stringify(Blogs));
  window.location.href = "/admin-page/allArticles.html";
  //console.log("Deleteed", index);
}

function UpdateBlog(index) {
  console.log("Updating", index);

  sessionStorage.setItem("updating", JSON.stringify(Blogs[index]));
  window.location.href = "/admin-page/createNewArticle.html";
}
