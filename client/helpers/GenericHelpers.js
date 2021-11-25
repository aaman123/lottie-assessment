const inputReplacer = (oldInput) => {
    var oldInput = document.getElementById("uploadFile");
    var newInput = document.createElement("input");
    newInput.type = "file";
    newInput.id = oldInput.id;
    newInput.className = oldInput.className;
    newInput.style.cssText = oldInput.style.cssText;
    oldInput.parentNode.replaceChild(newInput, oldInput);

    return newInput;
}

const lottieChecker = (jsonFile) => {
    return new Promise((resolve, reject) => {
        const file = "";
        const fileReader = new FileReader();
        const propertyArray = ['v', 'fr', 'ip', 'op', 'layers', 'w', 'h'];
        const hasProperty = true;

        fileReader.readAsText(jsonFile, "UTF-8");
        fileReader.onload = e => {
            file = JSON.parse(e.target.result);
            propertyArray.forEach((prop) => {
                if(!file.hasOwnProperty(prop)) {
                    hasProperty = false;
                };
            })
            
            if(hasProperty) resolve(true);
            resolve(false);       
        }
    })
};

export {
    inputReplacer,
    lottieChecker
};