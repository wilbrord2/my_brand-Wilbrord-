const Btitle = document.getElementById("Btitle");
const Bimage = document.getElementById("Bimage");
const Bdescription = document.getElementById("Bdescription");
const Bupload = document.getElementById("Bupload");
const username = document.getElementById("user-name");
const adminname = document.getElementById("admin-name");
// const input = document.querySelector('input[name="image"]');
let statusResult = "make sure you fill the form correctly.";
let blogObj;
let imagefile;
Bimage.addEventListener("change", function (event) {
  imagefile = event.target.files[0];
});
// CREATING AN ARTICLE
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
    username.innerHTML = `<h5>${accountOwnername}</h5>`;
    adminname.innerHTML = `<h3>${accountOwnername}</h3>
                            <h4>${accountOwnerEmail}</h4>`;

    const createBlog = async (url, formdata) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authtoken}`,
            authtoken: `${authtoken}`,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: formdata,
        });
        return response.json();
      } catch (error) {
        console.log("error generated", error);
      }
    };

    Bupload.addEventListener("click", function (e) {
      e.preventDefault();
      const blogTitle = Btitle.value;
      const blogImage = Bimage.value;
      const blogDescription = Bdescription.value;

      if (blogTitle.length <= 0) {
        Btitle.placeholder = "Fill this field  !!!";
        Btitle.classList.add("error");
        Btitle.addEventListener("keyup", function () {
          Btitle.classList.remove("error");
          return false;
        });
        return true;
      } else if (blogImage.length <= 0) {
        Bimage.placeholder = "Fill this field  !!!";
        Bimage.classList.add("error");
        Bimage.addEventListener("click", function () {
          Bimage.classList.remove("error");
          return false;
        });
        return true;
      } else if (blogDescription.length <= 0) {
        Bdescription.placeholder = "Fill this field  !!!";
        Bdescription.classList.add("error");
        Bdescription.addEventListener("keyup", function () {
          Bdescription.classList.remove("error");
          return false;
        });
        return true;
      } else {
        const formData = new FormData();
        formData.append("image", imagefile);
        formData.append("title", Btitle.value);
        formData.append("description", blogDescription);
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        // "https://wilbrord-mybrand-backend.up.railway.app/api/article/createArticle",

        createBlog("http://localhost:3000/api/article/createArticle", formData)
          .then((data) => registerResult(data))
          .catch((err) => console.log(err.message));

        Btitle.value = "";
        Bimage.value = "";
        Bdescription.value = "";
      }
    });

    // MODEL

    // Get the modal
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const okmodelbtn = document.getElementById("modelSignup");
    let registerResult;
    // When the user clicks the button, open the modal
    Bupload.onclick = function () {
      modal.style.display = "block";
      registerResult = async (data) => {
        console.log(data);
        statusResult = await data;
      };
      if (
        statusResult !== "Thank you for your feedback" ||
        statusResult !== ""
      ) {
        document.getElementById("modelmessage").innerHTML = `${statusResult}`;
        okmodelbtn.onclick = function (e) {
          e.preventDefault();
          modal.style.display = "none";
        };
      } else {
        document.getElementById("modelmessage").innerHTML = `${statusResult}`;
        okmodelbtn.onclick = function () {
          e.preventDefault();
          modal.style.display = "none";
        };
      }
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
