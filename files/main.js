const TypeWriter = function (txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// pisanie
TypeWriter.prototype.type = function () {
    // aktualne słowo
    const current = this.wordIndex % this.words.length;
    // text aktualnego słowa
    const fullTxt = this.words[current];

    // czy kasuje
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // szybkość pisania
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // sprawdzenie czy słowo jest już całe
    if (!this.isDeleting && this.txt == fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt == '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // typewriter
    new TypeWriter(txtElement, words, wait);
}