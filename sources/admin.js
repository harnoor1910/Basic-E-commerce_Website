const formEle = document.querySelector('.form');
if (formEle) {
    formEle.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(formEle);
        const new_data = Object.fromEntries(formData);

        // Get the form fields
        const category = formData.get('Cname');
        const itemName = formData.get('ItemName');
        const price = formData.get('Price');
        const imageFile = formData.get('image');

        // Validate that all fields are filled
        if (!category || !itemName || !price || !imageFile.size) {
            alert('Please check carefully, All the fields must be filled!');
            return;
        }

        // Read the image file as a Data URL
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            // Store the base64-encoded image data along with other form data
            new_data.image = reader.result;

            // Check if localStorage already has data for this Cname
            let storedData = localStorage.getItem(new_data.Cname);

            if (storedData) {
                // Parse existing data
                storedData = JSON.parse(storedData);
            } else {
                // Initialize with an empty array if no data exists
                storedData = [];
            }

            // Add new data to the existing array
            storedData.push(new_data);

            // Store the updated data back to localStorage
            localStorage.setItem(new_data.Cname, JSON.stringify(storedData));
        };
    });
}
