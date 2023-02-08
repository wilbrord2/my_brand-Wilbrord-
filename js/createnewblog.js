const Btitle = document.getElementById("Btitle");
const Bimage = document.getElementById("Bimage");
const Bdescription = document.getElementById("Bdescription");
const Bupload = document.getElementById("Bupload");
let statusResult = "make sure you fill the form correctly.";
let blogObj;

// CREATING AN ARTICLE
const myToken = JSON.parse(localStorage.getItem("myToken"));
if (!myToken) {
  window.location.href = "/login.html";
} else {
  const authtoken = myToken.token.data;
  const isLoggedIn = myToken.isLoggedin;
  if (!isLoggedIn && !authtoken) {
    window.location.href = "login.html";
  } else {
    const createBlog = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
            authtoken: `${authtoken}`,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
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
        blogObj = {
          title: Btitle.value,
          description: blogDescription,
        };

        createBlog(
          "https://wilbrord-mybrand-backend.up.railway.app/api/article/createArticle",
          blogObj
        )
          .then((data) => registerResult(data))
          .catch((err) => console.log(err.message));
        // blogarr.push(blogObj);
        //window.localStorage.setItem(`Blog`, JSON.stringify(blogarr));

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
        statusResult = await data;
        console.log(statusResult);
      };
      if (
        statusResult !== "Thank you for your feedback" ||
        statusResult !== ""
      ) {
        document.getElementById("modelmessage").innerHTML = `${statusResult}`;
        okmodelbtn.onclick = function () {
          modal.style.display = "none";
        };
      } else {
        document.getElementById("modelmessage").innerHTML = `${statusResult}`;
        okmodelbtn.onclick = function () {
          window.location.href = "login.html";
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
