document.addEventListener('DOMContentLoaded', () => {
    const originalModel = document.getElementById('original-model');
    const modal = document.getElementById('model-modal');
    const modalModelViewer = modal.querySelector('.retro-tv');
    const closeButton = document.getElementById('close-button');

    document.querySelectorAll('.Hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            modal.style.display = 'block'; // Show the modal
            originalModel.style.display = 'none'; // Hide the original model

            modalModelViewer.style.width = '1700px';  // Change width
            modalModelViewer.style.height = '900px'; // Change height
            modalModelViewer.classList.add('centered'); // Center the element
            hotspot.style.display = 'none'; // Hide the hotspot

            // Zoom into the model
            modalModelViewer.setAttribute('camera-orbit', '0deg 77deg 0.5m'); // Adjust as needed
            modalModelViewer.setAttribute('field-of-view', '20deg'); // Adjust as needed
            modalModelViewer.setAttribute('camera-target', '0.0005934m 0.01m -0.29m'); // Change target

            // Force update the model-viewer
            modalModelViewer.updateFraming();
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        originalModel.style.display = 'block'; // Show the original model

        modalModelViewer.style.width = '100%';  // Reset width
        modalModelViewer.style.height = '100%'; // Reset height
        modalModelViewer.classList.remove('centered'); // Remove centering

        // Reset zoom
        modalModelViewer.setAttribute('camera-orbit', 'auto auto auto');
        modalModelViewer.setAttribute('field-of-view', 'auto');
        modalModelViewer.setAttribute('camera-target', '0.0005934m 0.03806m -0.19m'); // Reset target

        // Show the hotspot again
        document.querySelectorAll('.Hotspot').forEach(hotspot => {
            hotspot.style.display = 'block';
        });
    });
});