// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const colorInput = document.getElementById('color');

    // Function to handle eyedropper click
    function handleEyedropperClick() {


        const hasSupport = () => ('EyeDropper' in window);
        if (hasSupport) {
            const eyeDropper = new window.EyeDropper();

            eyeDropper
                .open()
                .then((result) => {
                    const color = result.sRGBHex;
                    colorInput.value = color;
                })
                .catch(e => {
                    console.error(e);
                });
        } else {
            console.warn('No Support: This browser does not support the EyeDropper API yet!');
        }

    }

    // Find and attach click event listener to your eyedropper button or icon
    const eyedropperButton = document.getElementById('eyedropperButton'); // Replace with your actual eyedropper button ID
    eyedropperButton.addEventListener('click', handleEyedropperClick);
});
