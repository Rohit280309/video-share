export const shortenText = (description: String, length: string) => {
    const breakpoints = length.split(' '); // Split the string into an array of breakpoint classes
    const maxWidths = breakpoints.map(bp => {
        const value = bp.split('-')[2]; // Extract the numeric value from the class
        return parseInt(value.replace(/\D/g, '')); // Parse the numeric value and remove non-numeric characters
    });

    let maxLength = maxWidths[0]; // Default to the smallest value

    // Determine the appropriate maxLength based on the current screen size
    if (window.innerWidth >= 1280) {
        maxLength = maxWidths[2]; // lg
    } else if (window.innerWidth >= 768) {
        maxLength = maxWidths[1]; // md
    } else {
        maxLength = maxWidths[0]; // sm
    }

    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    } else {
        return description;
    }
};