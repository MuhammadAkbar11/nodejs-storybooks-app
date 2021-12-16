const modalDeleteStory = document.getElementById("modalDeleteStory");

modalDeleteStory &&
  modalDeleteStory.addEventListener("show.bs.modal", function (event) {
    console.log("tess");
    const button = event.relatedTarget;
    const storyId = button.getAttribute("data-bs-storyId");
    const storyForm = modalDeleteStory.querySelector("#modalDeleteStoryForm");
    storyForm.setAttribute("action", "/stories/" + storyId);
  });
