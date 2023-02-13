const blogul = document.getElementById("Blog-list");
const username = document.getElementById("user-name");
const adminname = document.getElementById("admin-name");
// RENDERING DATA FROM DATABASE

const Token = JSON.parse(localStorage.getItem("myToken"));
if (!Token) {
  window.location.href = "/login.html";
} else {
  const Authtoken = Token.token.data;
  const isLoggedin = Token.isLoggedin;
  const accountOwnername = Token.token.name;
  const accountOwnerEmail = Token.token.user;
  if (!isLoggedin && !Authtoken) {
    window.location.href = "login.html";
  } else {
    username.innerHTML = `<h5>${accountOwnername}</h5>`;
    adminname.innerHTML = `<h3>${accountOwnername}</h3>
                            <h4>${accountOwnerEmail}</h4>`;
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
      let i = 0;
      blog.forEach((article) => {
        blogul.appendChild(
          createList(i++, article.title, article.description, article.date)
        );
      });
    }

    function createList(i, title, Image, index) {
      const li = document.createElement("li");

      // <img src="${Image}" alt="blog image"/>
      li.innerHTML = `<div class="blogImage">
      <h3>${i + 1}</h3>
</div>

<div class="user-message username">
  <h3>
    ${title}

  </h3>
</div>
<div class="commentLike">
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



