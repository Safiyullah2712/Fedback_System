let currentFilter = "all";

function displayCards() {

    const container = document.getElementById("feedbackContainer");

    if (!container) {
        console.error("Container not found!");
        return;
    }

    container.innerHTML = "";

    let feedbackList;

    try {
        feedbackList = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    } catch (error) {
        console.error("Error parsing localStorage:", error);
        feedbackList = [];
    }
    if (currentFilter !== "all") {
        feedbackList = feedbackList.filter(item => item.rating === Number(currentFilter));
    }
    

    if (feedbackList.length === 0) {
        container.innerHTML = "<p>No feedback available.</p>";
        return;
    }

    feedbackList.forEach((item) => {

        const card = document.createElement("div");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const name = document.createElement("h3");
        name.textContent = item.cname;

        const date = document.createElement("span");
        date.className = "date";
        date.textContent = new Date(item.timestamp).toLocaleDateString();

        header.appendChild(name);
        header.appendChild(date);

        const description = document.createElement("p");
        description.className = "description";
        description.textContent = item.feedback;

        const rating = document.createElement("div");
        rating.className = "rating";
        rating.textContent = "Rating: ";

        for (let i = 0; i < item.rating; i++) {
            const star = document.createElement("img");
            star.src = "../images/gstar.png";
            star.alt = "Star";
            star.style.width = "20px";
            star.style.height = "20px";
            rating.appendChild(star);
        }

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        
        editBtn.style.background = "transparent";
        editBtn.style.border = "none";
        editBtn.style.cursor = "pointer";
        editBtn.style.padding = "5px";

        const editIcon = document.createElement("img");
        editIcon.src = "../images/edit.png";
        editIcon.alt = "Edit";
        editIcon.style.width = "20px";
        editIcon.style.height = "20px";

        editBtn.appendChild(editIcon);

        editBtn.addEventListener("click", function () {
            localStorage.setItem("editFeedback", item.timestamp);
            window.location.href = "form.html";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        
        deleteBtn.style.background = "transparent";
        deleteBtn.style.border = "none";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.padding = "5px";

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "../images/delete.png";
        deleteIcon.alt = "Delete";
        deleteIcon.style.width = "20px";
        deleteIcon.style.height = "20px";

        deleteBtn.appendChild(deleteIcon);

        deleteBtn.addEventListener("click", function () {
            deleteFeedback(item.timestamp);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(header);
        card.appendChild(rating);
        card.appendChild(description);
        card.appendChild(actions);

        container.appendChild(card);
    });

}
function deleteFeedback(timestamp) {

    let feedbackList = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    feedbackList = feedbackList.filter(item => item.timestamp !== timestamp);
    localStorage.setItem("userFeedbacks", JSON.stringify(feedbackList));
    displayCards();
}

function applyFilter(value) {
    currentFilter = value;
    displayCards();
}
document.addEventListener("DOMContentLoaded", displayCards);