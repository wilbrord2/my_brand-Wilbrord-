// creating new blog by admin

const BfullName = document.getElementById("Bfname");
const Bemail = document.getElementById("Bemail");
const Bsource = document.getElementById("Bsource");
const Bdate = document.getElementById("Bdate");
const Btitle = document.getElementById("Btitle");
const Bimage = document.getElementById("Bimage");
const Bdescription = document.getElementById("Bdescription");
const Bupload = document.getElementById("Bupload");
let blogarr = new Array();
let blogObj = new Array();

Bupload.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("clicked");
  const blogName = BfullName.value;
  const blogEmail = Bemail.value;
  const blogSource = Bsource.value;
  const blogDate = Bdate.value;
  const blogTitle = Btitle.value;
  const blogImage = Bimage.value;
  const blogDescription = Bdescription.value;
  if (blogName.length <= 0) {
    BfullName.placeholder = "Fill this field  !!!";
    BfullName.classList.add("error");
    BfullName.addEventListener("keyup", function () {
      BfullName.classList.remove("error");
      return false;
    });
    return true;
  } else if (blogEmail.length <= 0) {
    Bemail.placeholder = "Fill this field  !!!";
    Bemail.classList.add("error");
    Bemail.addEventListener("keyup", function () {
      Bemail.classList.remove("error");
      return false;
    });
    return true;
  } else if (blogSource.length <= 0) {
    Bsource.placeholder = "Fill this field  !!!";
    Bsource.classList.add("error");
    Bsource.addEventListener("keyup", function () {
      Bsource.classList.remove("error");
      return false;
    });

    return true;
  } else if (blogDate.length <= 0) {
    Bdate.placeholder = "Fill this field  !!!";
    Bdate.classList.add("error");
    Bdate.addEventListener("keyup", function () {
      Bdate.classList.remove("error");
      return false;
    });

    return true;
  } else if (blogSource.length <= 0) {
    Bsource.placeholder = "Fill this field  !!!";
    Bsource.classList.add("error");
    Bsource.addEventListener("keyup", function () {
      Bsource.classList.remove("error");
      return false;
    });
  } else if (blogTitle.length <= 0) {
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
      BfullName: blogName,
      Bemail: blogEmail,
      Bsource: blogSource,
      Bdate: blogDate,
      Btitle: Btitle.value,
      Bimage: blogImage,
      Bdescription: blogDescription,
    };
    blogarr.push(blogObj);
    window.localStorage.setItem(`Blog`, JSON.stringify(blogarr));

    BfullName.value = "";
    Bemail.value = "";
    Bsource.value = "";
    Bdate.value = "";
    Btitle.value = "";
    Bimage.value = "";
    Bdescription.value = "";
  }
});

//update
//function update() {
let updateArray = JSON.parse(sessionStorage.getItem(`updating`));

BfullName.value = updateArray.BfullName;
Bemail.value = updateArray.Bemail;
Bsource.value = updateArray.Bsource;
Bdate.value = updateArray.Bdate;
Btitle.value = updateArray.Btitle;
Bimage.value = "";
Bdescription.value = updateArray.Bdescription;
//}
