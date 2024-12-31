document.addEventListener("DOMContentLoaded", () => {
  const originalModel = document.getElementById("original-model");
  const modal = document.getElementById("model-modal");
  const modalModelViewer = modal.querySelector(".retro-tv");
  const closeButton = document.getElementById("close-button");

  document.querySelectorAll(".Hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      modal.style.display = "flex"; // Show the modal
      originalModel.style.display = "none"; // Hide the original model

      modalModelViewer.style.width = "1700px"; // Change width
      modalModelViewer.style.height = "900px"; // Change height
      modalModelViewer.classList.add("centered"); // Center the element
      hotspot.style.display = "none"; // Hide the hotspot

      // Zoom into the model
      modalModelViewer.setAttribute("camera-orbit", "0deg 77deg 0.5m"); // Adjust as needed
      modalModelViewer.setAttribute("field-of-view", "20deg"); // Adjust as needed
      modalModelViewer.setAttribute("camera-target", "0.0005934m 0.01m -0.29m"); // Change target

      // Force update the model-viewer
      modalModelViewer.updateFraming();
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
    originalModel.style.display = "block"; // Show the original model

    modalModelViewer.style.width = "100%"; // Reset width
    modalModelViewer.style.height = "100%"; // Reset height
    modalModelViewer.classList.remove("centered"); // Remove centering

    // Reset zoom
    modalModelViewer.setAttribute("camera-orbit", "auto auto auto");
    modalModelViewer.setAttribute("field-of-view", "auto");
    modalModelViewer.setAttribute(
      "camera-target",
      "0.0005934m 0.03806m -0.19m"
    ); // Reset target

    // Show the hotspot again
    document.querySelectorAll(".Hotspot").forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  });

  const modelViewer = document.querySelector("#envlight-demo");

  let lastX;
  let panning = false;
  let skyboxAngle = 0;
  let radiansPerPixel;

  const startPan = () => {
    const orbit = modelViewer.getCameraOrbit();
    const { radius } = orbit;
    radiansPerPixel =
      (-1 * radius) / modelViewer.getBoundingClientRect().height;
    modelViewer.interactionPrompt = "none";
  };

  const updatePan = (thisX) => {
    const delta = (thisX - lastX) * radiansPerPixel;
    lastX = thisX;
    skyboxAngle += delta;
    modelViewer.style.setProperty("--skybox-angle", `${skyboxAngle}rad`);
  };

  modelViewer.addEventListener(
    "mousedown",
    (event) => {
      panning =
        event.button === 2 || event.ctrlKey || event.metaKey || event.shiftKey;
      if (!panning) return;

      lastX = event.clientX;
      startPan();
      event.stopPropagation();
    },
    true
  );

  modelViewer.addEventListener(
    "touchstart",
    (event) => {
      const { targetTouches, touches } = event;
      panning =
        targetTouches.length === 2 && targetTouches.length === touches.length;
      if (!panning) return;

      lastX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
      startPan();
    },
    true
  );

  self.addEventListener(
    "mousemove",
    (event) => {
      if (!panning) return;

      updatePan(event.clientX);
      event.stopPropagation();
    },
    true
  );

  modelViewer.addEventListener(
    "touchmove",
    (event) => {
      if (!panning || event.targetTouches.length !== 2) return;

      const { targetTouches } = event;
      const thisX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
      updatePan(thisX);
    },
    true
  );

  self.addEventListener(
    "mouseup",
    (event) => {
      panning = false;
    },
    true
  );

  modelViewer.addEventListener(
    "touchend",
    (event) => {
      panning = false;
    },
    true
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("model-modal");
  const modalModelViewer = modal.querySelector(".food-models");
  const closeButton = document.getElementById("close-button");

  document.querySelectorAll(".menu-text").forEach((menuText) => {
    menuText.addEventListener("click", () => {
      const modelViewer = menuText.previousElementSibling;
      const modelSrc = modelViewer.getAttribute("src");

      modalModelViewer.setAttribute("src", modelSrc);
      modal.style.display = "flex"; // Show the modal
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });

  // Close the modal when clicking outside of the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
