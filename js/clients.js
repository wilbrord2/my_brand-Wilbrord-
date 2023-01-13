const client = document.getElementById("list-of-clients");
let Clients;
function ListOfClients() {
  Messages = JSON.parse(localStorage.getItem("Clients"));
  for (let i = 0; i < Messages.length; i++) {
    client.appendChild(
      createList(Messages[i].name, Messages[i].userEmail, Date())
    );
  }
}

function createList(name, message, date) {
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
    <h3>${name}</h3>
    <div class="comments-time">${date}</div>
  </div>
  <p>${message}</p>
</div>`;
  return li;
}
