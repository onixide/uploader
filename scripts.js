let imageUploader = (function () {



    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let files = e.dataTransfer.files;
        console.log(files);
        [].forEach.call(files, (file) => {

            if (file.type.match("jpeg")) {
                thumbnailsGenerator(file);
                console.log("match");
            }
            console.log(this);
            console.log(file);
        });

        dropArea.classList.remove("drop-area-active");
    });

    let thumbnailsGenerator = function (file) {
        let fileReader = new FileReader();
        let image = new Image();
        image.classList.add("thumbnail-img");

        fileReader.onload = function () {
            image.src = fileReader.result;
        }
        fileReader.readAsDataURL(file);
        thumbnails.appendChild(image);
    }


})();
