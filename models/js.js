const modal = document.getElementById("confirmation-modal");
const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

deleteButton.onclick = () => {
 
  closeModal();
}

cancelButton.onclick = () => {
  closeModal();
}
