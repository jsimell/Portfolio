// This script can be used to include html files into other html files
const includes = document.getElementsByTagName("include");
Array.from(includes).forEach(async include => {
    // Load the file from the path defined in the attributes of the include element
    const res = await fetch(include.getAttribute("src"));
    include.insertAdjacentHTML('afterend', await res.text());
    include.remove(); // removes the 'include' element from the document as it is no longer needed after the content has been included
});