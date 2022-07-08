export function updateText(txt,fieldName){
    var fieldNameElement = document.getElementById(fieldName);
    while(fieldNameElement.childNodes.length >= 1) {
        fieldNameElement.removeChild(fieldNameElement.firstChild);
    }
    fieldNameElement.appendChild(fieldNameElement.ownerDocument.createTextNode(txt));
    console.log(txt);
}