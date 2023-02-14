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
    const url =
      "https://wilbrord-mybrand-backend.up.railway.app/api/article/getAllArticle";
    //const url = "http://localhost:3000/api/article/getAllArticle";
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
      // let nodeListdelete = document.querySelectorAll(".deletebtn");
      // const updatebtn = document.querySelectorAll(".update");
      blogul.addEventListener("click", (event) => {
        const modal = document.getElementById("confirmation-modal");
        const deleteButton = document.getElementById("delete-button");
        const cancelButton = document.getElementById("cancel-button");
        const updateButton = document.getElementById("update-button");
        let liId;
        if (event.target.tagName === "LI") {
          liId = blog[event.target.id]._id;
          console.log(liId);
        }
        openModal();
        function openModal() {
          modal.style.display = "block";
        }

        function closeModal() {
          modal.style.display = "none";
        }

        deleteButton.onclick = () => {
          closeModal();
          const modal = document.getElementById("Dconfirmation-modal");
          const deleteButton = document.getElementById("Ddelete-button");
          const cancelButton = document.getElementById("Dcancel-button");
          openModal();
          function openModal() {
            modal.style.display = "block";
          }
          function DcloseModal() {
            modal.style.display = "none";
          }
          deleteButton.onclick = () => {
            const articleId = liId;
            const url = `https://wilbrord-mybrand-backend.up.railway.app/api/article/deleteArticle/${articleId}`;
            // const url = `http://localhost:3000/api/article/deleteArticle/${articleId}`;
            fetch(url, {
              method: "delete",
              headers: {
                "content-type": "application/json; charset=utf-8 ",
                Authorization: `Bearer ${Authtoken}`,
                authtoken: `${Authtoken}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log(`Article deleted successfully`);
                } else {
                  throw new Error(`Error deleting article`);
                }
              })
              .catch((error) => {
                console.error(error);
              });
            DcloseModal();
          };

          cancelButton.onclick = () => {
            DcloseModal();
          };
        };
        updateButton.onclick = () => {
          closeModal();
          const modal = document.getElementById("Uconfirmation-modal");
          const updateBtn = document.getElementById("Uupdate-button");
          const cancelBtnupdate = document.getElementById("Ucancel-button");
          openModal();
          function openModal() {
            modal.style.display = "block";
          }
          function UcloseModal() {
            modal.style.display = "none";
          }
          updateBtn.onclick = () => {
            const articleId = liId;
            const url = `https://wilbrord-mybrand-backend.up.railway.app/api/article/UpdateArticle/${articleId}`;
            fetch(url, {
              method: "patch",
              headers: {
                "content-type": "application/json; charset=utf-8 ",
                Authorization: `Bearer ${Authtoken}`,
                authtoken: `${Authtoken}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log(`Article updated successfully`);
                } else {
                  throw new Error(`Error updating article`);
                }
              })
              .catch((error) => {
                console.error(error);
              });
            window.location.reload(true);
            UcloseModal();
          };
          cancelBtnupdate.onclick = () => {
            UcloseModal();
          };
        };
        cancelButton.onclick = () => {
          closeModal();
        };
      });
    }

    function createList(i, title) {
      const li = document.createElement("li");
      li.id = `${i}`;
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
      ><h4>2</h4>
      <iconify-icon
        icon="fluent:thumb-like-24-filled"
        style="color: #052041"
        width="25"
      ></iconify-icon
    ></span>
    <span
      ><h4>1</h4>
      <iconify-icon
        icon="uis:comment-dots"
        style="color: #052041"
        width="25"
      ></iconify-icon
    ></span>
  </div>
</div>
`;
      return li;
    }
  }
}

// <div class="button">
//   <span class="update">
//     <button class="updatebtn">
//       <iconify-icon
//         inline
//         icon="material-symbols:update"
//         style="color: #052041"
//         width="35"
//       ></iconify-icon>
//     </button>
//   </span>

//   <span class="delete">
//     <button class="deletebtn">
//       <iconify-icon
//         inline
//         icon="material-symbols:delete-forever-outline-rounded"
//         style="color: red"
//         width="35"
//       ></iconify-icon>
//     </button>
//   </span>
// </div>
