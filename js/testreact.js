function Portfolio() {
  return (
    <div>
      <div id="Portfolio-page"></div>
      <SectionPortfolio />
      <SectionComments />
    </div>
  );
}

function SectionPortfolio() {
  return (
    <section>
      <div className="section-title">
        <h1>My work</h1>
      </div>
      <PortfolioNavBar />
      <div className="container-portfolio">
        {data.map((item, index) => {
          return <Card data={item} key={index} />;
        })}
      </div>
    </section>
  );
}

function PortfolioNavBar() {
  return (
    <div className="navbar-portfolio">
      <ul>
        <li>All</li>
        <li>UI/UX</li>
        <a href="#">
          <li>Frontend</li>
        </a>
      </ul>
    </div>
  );
}

// Define a Card component
function Card(props) {
  const { title, imageSrc, description, githubLink } = props.data;
  // console.log(title, description);
  return (
    <div className="card">
      <div className="card-logo">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="card-title">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className="card-link">
        <a href={githubLink} target="_blank">
          See project
          <iconify-icon
            icon="material-symbols:arrow-right-alt-rounded"
            style={{ color: "#1a559b" }}
            width="28"
            height="28"
          ></iconify-icon>
        </a>
      </div>
    </div>
  );
}

// Define a Portfolio component
// function PortfolioData() {
//   const [activeTab, setActiveTab] = useState("All");
const data = [
  {
    title: "JORLAND INSTITUTE",
    imageSrc: "/Images/Screenshot (81).png",
    description:
      "Is an East africa leading Engineering company based in kigali, our work ranges from house holds to real estates, integrate and performance makes us the best partener for your project",
    githubLink: "https://github.com/wilbrord2",
    tags: ["All", "Frontend"],
  },
  {
    title: "INES HOSTEL MANAGEMENT SYSTEM",
    imageSrc: "/Images/ighs (1).png",
    description:
      "The hostel management system is developed specifically for the hostel owners to manage different activities in the hostel.",
    githubLink: "https://github.com/wilbrord2",
    tags: ["All", "UI/UX"],
  },
  {
    title: "STOCK MANAGEMENT SYSTEM",
    imageSrc: "/Images/29241971-0bdc88e4-7fa6-11e7-86c8-2db7917762af.jpg",
    description:
      "The purpose of stock management software is to maintain an optimal stock level, track goods during transport between locations, receive new items, manage warehouse.",
    githubLink: "https://github.com/wilbrord2",
    tags: ["All", "Frontend"],
  },
];
// }

function SectionComments() {
  return (
    <div>
      <div id="Contact-page"></div>
      <section className="Contact-page">
        <div className="section-title">
          <h1>Contact ME</h1>
        </div>
        <div className="nav-blog">
          <h2>Get in touch</h2>
        </div>
        <div className="container-Contact">
          <div className="contact-info">
            <div className="contact-welcome">
              <h2>Let’s talk about Ideas</h2>
            </div>
            <div className="contact-contacts">
              <ul>
                <li>Kigali-Rwanda</li>
                <li>+250780505303</li>
                <li>bwilbrord@gmail.com</li>
                <li>wilbrordibyimana</li>
              </ul>
            </div>
          </div>
          <div className="contact-message">
            <Myform />
          </div>
        </div>
      </section>
    </div>
  );
}

// SENDING DATA

function Myform() {
  const { useState } = React;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    validateForm();
  };
  const handleTextareaChange = (event) => {
    setFormData({
      ...formData,
      message: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      // console.log(formErrors);
      Object.keys(formErrors).forEach((key) => {
        console.log(formErrors[key]);
        alert("Please fill valid data \n" + formErrors[key]);
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      fetch(
        "https://wilbrord-mybrand-backend.up.railway.app/api/messages/save",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error(error);
        });

      // console.log(formData);
      alert("Thank you for your feedback");
    }
  };

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    subject: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
  };

  const validateForm = () => {
    let errors = {};

    // Validate name
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length < validationRules.name.minLength) {
      errors.name = `Name must be at least ${validationRules.name.minLength} characters`;
    } else if (formData.name.length > validationRules.name.maxLength) {
      errors.name = `Name must be less than ${validationRules.name.maxLength} characters`;
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validationRules.email.pattern.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject) {
      errors.subject = "subject is required";
    } else if (formData.subject.length < validationRules.subject.minLength) {
      errors.subject = `subject must be at least ${validationRules.subject.minLength} characters`;
    } else if (formData.subject.length > validationRules.subject.maxLength) {
      errors.subject = `subject must be less than ${validationRules.subject.maxLength} characters`;
    }

    // Validate message
    if (!formData.message) {
      errors.message = "Message is required";
    } else if (formData.message.length < validationRules.message.minLength) {
      errors.message = `Message must be at least ${validationRules.message.minLength} characters`;
    } else if (formData.message.length > validationRules.message.maxLength) {
      errors.message = `Message must be less than ${validationRules.message.maxLength} characters`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messenger-names">
        <div className="fname">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="clear"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="lname">
          <label>Email or Phone</label>
          <input
            type="email"
            name="email"
            className="clear"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="messenger-message">
        <div className="fname messenger-subject">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            className="clear"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className="lname">
          <label> Message</label>

          <textarea
            name="message"
            className="clear"
            cols="30"
            rows="10"
            value={formData.message}
            // onChange={handleInputChange}
            onChange={handleTextareaChange}
          />
        </div>

        <div className="send-message">
          <button type="submit" id="sendmessage" className="Btn">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(<Portfolio />);
