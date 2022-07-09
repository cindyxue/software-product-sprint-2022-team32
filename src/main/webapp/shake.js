function cleanShakes(invalidFields){
    Array.from(invalidFields).forEach(field => {
        field.classList.remove("shake");
    });
}

function doShake(invalidFields){
    // Shake all invalid fields
    Array.from(invalidFields).forEach(field => {
        field.classList.add("shake");
    });
}

export function shakeAnimation(invalidFields){
    doShake(invalidFields);
    setTimeout(() => {
        cleanShakes(invalidFields);
    }, 1000);
}