const blogul = document.getElementById("blogslist");
const load = document.getElementById("loader");
let ids = [];
let count = 0;

// RENDERING DATA FROM DATABASE

load.style.display = "block";
function loading() {
  load.style.display = "none";
}
// const url = "https://wilbrord-mybrand-backend.up.railway.app/api/article/getAllArticle";
function rendArticle() {
  const url =
    "https://wilbrord-mybrand-backend.up.railway.app/api/article/getAllArticle";
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8 ",
    },
  })
    .then((res) => res.json())
    .then((data) => Articles(data))
    .catch((error) => console.log(error));

  function Articles(blogs) {
    let i = 0;
    // console.log(blogs);
    blogs.forEach((article) => {
      ids.push(article._id);
      blogul.appendChild(createList(i++, article.title, article._id));
    });
    loading();
    blogul.addEventListener("click", (event) => {
      load.style.display = "block";
      if (event.target.tagName === "LI") {
        const liId = blogs[event.target.id]._id;
        //  console.log(liId);
        getOneArticle(liId);
      }
    });
  }

  function createList(i, title) {
    const li = document.createElement("li");
    li.id = `${i}`;
    // <img src="${Image}" alt="blog image"/>
    li.innerHTML = `<div >
      <h3>${i + 1}</h3>
</div>

<div">
  <h3>
    ${title}
  </h3>
</div>`;
    return li;
  }
}

rendArticle();
// GET A SINGLE ARTICLE

const getOneArticle = (id) => {
  const urlid = `https://wilbrord-mybrand-backend.up.railway.app/api/article/getSingleArticle/${id}`;
  fetch(urlid, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8 ",
    },
  })
    .then((res) => res.json())
    .then((data) => singleArticle(data))
    .catch((error) => console.log(error));

  function singleArticle(blog) {
    //console.log(blog);
    var date = new Date(blog.date);
    var shortDate = date.toLocaleDateString();
    function listcomment() {
      //RENDERING COMMENTS
      const url =
        "https://wilbrord-mybrand-backend.up.railway.app/api/commentandlike/getcomment";
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=utf-8 ",
        },
      })
        .then((res) => res.json())
        .then((data) => allcommentonarticle(data))
        .catch((error) => console.log(error));

      document.getElementById("blogcontent").innerHTML = `
          <div class="blog-title">
            <h1>
             ${blog.title}
            </h1>
          </div>
          <div class="date">${shortDate}</div>
          <div class="blog-image">
            <img src="${blog.avatar}" alt="Jornand construction.png" />
          </div>
          <div class="blog-icons">
            <div class="card-title card-logo">
            <iconify-icon
            id="likes"
            inline
            icon="mdi:cards-heart-outline"
            style="color: #1a559b"
            width="25"
            height="25"
          ></iconify-icon>
          <iconify-icon
            id="dislike"
            class="hidden"
            icon="ph:heart-straight-duotone"
            style="color: red"
            width="25"
            height="25"
          ></iconify-icon>
              <iconify-icon
                inline
                icon="material-symbols:share"
                style="color: #1a559b"
                width="25"
                height="25"
              ></iconify-icon>
              <!-- class="icon-align" -->
              <iconify-icon
                inline
                icon="material-symbols:add-link"
                style="color: #1a559b"
                width="25"
                height="25"
              ></iconify-icon>
            </div>
          </div>
          <div class="blog-content">
            <p>
             ${blog.description}
            </p>
          </div>
          <div class="blog-comments">
            <h2>Comments</h2>
            <div id="commentloader"></div>
            <ul id="singleblogcomment">
            </ul>
          </div>
          <div class="add-comment">
          <form action="">
            <label for="user name">Full Name</label>
            <input
              type="text"
              name=""
              id="username"
              placeholder="Enter your name"
              required
            />
            <div class="error hidden"></div>
            <label for="user name">Email</label>
            <input
              type="email"
              name=""
              id="useremail"
              placeholder="Enter your name"
              required
            />
            <div class="error hidden"></div>
            <label for="add comment">Add your Comment</label>
            <textarea name="" id="comment" cols="30" rows="5"></textarea>
            <div class="error hidden"></div>
            <button id="sendcomment" class="Btn">send</button>
          </form>
        </div>  `;

      const commentul = document.getElementById("singleblogcomment");
      const comloader = document.getElementById("commentloader");

      let allcommentonarticle;

      allcommentonarticle = (comment) => {
        function commnetLoading() {
          comloader.style.display = "none";
        }

        for (let i = 0; i < comment.length; i++) {
          if (comment[i].blogid == id) {
            //  console.log(comment);
            const li = addcommentlist(
              comment[i].name,
              comment[i].comment,
              comment[i].date
            );
            //console.log(li);
            commentul.appendChild(li);
          }
          commnetLoading();
        }
      };
    }
    listcomment();
    function addcommentlist(name, comment, date) {
      // console.log(name, comment, date);
      var date = new Date(date);
      var shortDate = date.toLocaleDateString();
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="userProfile">
            <iconify-icon
              inline
              icon="mdi:user-circle"
              style="color: #36383b"
              width="50"
            ></iconify-icon>
          </div>
          <div>
          <div class="username">
            <h3>${name}</h3>
            <div class="comments-time">${shortDate}</div>
          </div>
          <p>${comment}.<p>
          </div>`;

      return li;
    }
    const like = document.getElementById("likes");
    const dislike = document.getElementById("dislike");

    like.addEventListener("click", () => {
      like.classList.add("hidden");
      dislike.classList.remove("hidden");
      count++;
      // console.log(count);
    });
    dislike.addEventListener("click", () => {
      dislike.classList.add("hidden");
      like.classList.remove("hidden");
      count--;
      // console.log(count);
    });

    //WORKING ON COMMENT

    const sendcomment = document.getElementById("sendcomment");
    const username = document.getElementById("username");
    const useremail = document.getElementById("useremail");
    const comment = document.getElementById("comment");
    let nodeList = document.querySelectorAll(".error");
    sendcomment.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        username.value == "" ||
        useremail.value == "" ||
        comment.value == ""
      ) {
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].classList.add("error");
          nodeList[i].innerHTML =
            "<h3>Please fill your username, email, and comment</h3>";
        }
      } else {
        const objcomment = {
          id: id,
          name: username.value,
          email: useremail.value,
          comment: comment.value,
          likes: count,
        };
        // console.log(objcomment);

        SendComment(
          "https://wilbrord-mybrand-backend.up.railway.app/api/commentandlike/savecomment",
          objcomment
        )
          .then((data) => console.log(data))
          .catch((err) => console.log(err.message));

        username.textContent = "";
        useremail.textContent = "";
        comment.textContent = "";
        // window.onload();
      }
      listcomment();
    });

    async function SendComment(url, data) {
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        });
        return response.json();
      } catch (error) {
        console.log("error generated", error);
      }
      comloader.style.display = "block";
    }
    loading();
  }
};
