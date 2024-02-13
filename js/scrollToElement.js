// Scrolls the window to the location of the element whose elementId is given as a paramenter
function scrollToElement(elementId) {
    console.log(`scrollTo(${elementId}) called`)
    const element = document.getElementById(elementId);
    const headerHeight = document.getElementById("header").getBoundingClientRect().bottom;
    if (element) {
        const yPos = element.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
        window.scrollTo({
            top: yPos,
            behavior: 'smooth'
        });
    }
}