const imageUploader = (function() {
  const dropArea = document.querySelector(".uploader__drop-area");
  const sendButton = document.querySelector(".uploader__button--send");
  const thumbnails = document.querySelector(".uploader__thumbnails-container");

  dropArea.addEventListener("dragenter", function() {
    dropArea.classList.add("uploader__drop-area--active");
  });

  dropArea.addEventListener("dragleave", function() {
    dropArea.classList.remove("uploader__drop-area--active");
  });

  dropArea.addEventListener("dragover", function(e) {
    e.preventDefault();
  });
  dropArea.addEventListener("drop", function(e) {
    e.preventDefault();
    e.stopPropagation();

    let files = e.dataTransfer.files;
    console.log(files);
    [].forEach.call(files, file => {
      if (file.type.match("jpeg")) {
        thumbnailsGenerator(file);
        console.log("match");
      }

      console.log(this);
      console.log(file);
      console.log(files);
    });

    dropArea.classList.remove("uploader__drop-area--active");
  });

  let thumbnailsGenerator = function(file) {
    let fileReader = new FileReader();
    let image = new Image();
    image.classList.add("thumbnail-img");

    fileReader.onload = function() {
      image.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);
    thumbnails.appendChild(image);
  };
})();
