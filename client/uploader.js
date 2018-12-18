class Uploader {
    constructor(elementDiv) {
        this.elementDiv = elementDiv;
        this.dropArea = this.elementDiv.querySelector(".uploader__drop-area");
        this.sendButton = this.elementDiv.querySelector(".uploader__button--send");
        this.thumbnails = this.elementDiv.querySelector(".uploader__thumbnails-container");
        this.tip = this.elementDiv.querySelector(".uploader__tip");
        this.formData = new FormData();
    }

    addHover() {
        this.classList.add("uploader__drop-area--active");
    }

    removeHover() {
        this.classList.remove("uploader__drop-area--active");
    }

    thumbnailsGenerator(file) {
        let fileReader = new FileReader();
        let image = new Image();

        image.classList.add("thumbnail-img");

        fileReader.onload = function () {
            image.src = fileReader.result;
        }

        fileReader.readAsDataURL(file);
        this.thumbnails.appendChild(image);
    }

    addFileToUpload(file) {
        this.formData.append("myImage", file);
    }

    sendData() {
        fetch('http://localhost:3001', {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            body: this.formData // body data type must match "Content-Type" header
        })
        .then(response => (response.json()))
        .then(response => console.log(response))
        .catch(error => console.log('error is', error));
    }



init() {
    const self = this;

    this.dropArea.addEventListener("dragenter", this.addHover);
    this.dropArea.addEventListener("dragleave", this.removeHover);
    this.dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    this.dropArea.addEventListener("drop", function (e) {
        let files;
        e.preventDefault();
        e.stopPropagation();

        files = e.dataTransfer.files;

        [...files].forEach(file => {
            if (file.type.match("jpeg")) {
                self.thumbnailsGenerator(file);
                self.addFileToUpload(file);
            }
        })

        // console.log(files);
        this.classList.remove("uploader__drop-area--active");
    });
    // this.sendButton.addEventListener("click", this.sendData.bind(this));
    this.sendButton.addEventListener("click", function(e){
      this.sendData(e);
    }.bind(this));
   
}
}







// <div id="uploader">
// <div class="uploader__wrapper">
//     <div class="uploader__drop-area">
//         <p class="uploader__tip">Tutaj upuść pliki (*.jpg)</p>
//     </div>
//     <button class="uploader__button--send">Wyślij</button>
//     <div class="uploader__thumbnails-container">
//     </div>
// </div>
// </div>

let x = document.querySelector("#uploader")
// console.log(x);
let aa = new Uploader(x);
aa.init();
// console.log(aa);

// let w = document.querySelector("#uploader2");
// // console.log(w);
// let bb = new Uploader(w);
// bb.init();
// console.log(bb);



// dropArea.addEventListener("dragenter", function () {
//     dropArea.classList.add("drop-area-active")
// });

// dropArea.addEventListener("dragleave", function () {
//     dropArea.classList.remove("drop-area-active")
// });

// dropArea.addEventListener("dragover", function (e) {
//     e.preventDefault();
// });