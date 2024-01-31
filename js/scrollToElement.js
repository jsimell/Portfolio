// Scrolls the window to the location of the element whose elementId is given as a paramenter
function scrollToElement(elementId) {
    console.log(`scrollTo(${elementId}) called`)
    const element = document.getElementById(elementId);
    if (element) {
        const yPos = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: yPos,
            behavior: 'smooth'
        });
    }
}