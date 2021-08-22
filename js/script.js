const body = document.body,
    slider = document.querySelector('.review__inner'),
    wrapp = document.querySelector('.review__wrapp'),
    btnPrev = document.querySelector('.prev'),
    btnNext = document.querySelector('.next'),
    cards = document.querySelectorAll('.review__card'),
    imgIntro = document.querySelector('.intro__img'),
    btnFormOrder = document.querySelector('.form-order__btn'),
    form = document.querySelector('.form-order__form'),
    inputName = document.querySelector('.input-name'),
    inputTel = document.querySelector('.input-tel'),
    modal = document.querySelector('.modal'),
    modalBtn = document.querySelector('.modal__btn'),
    modalText = document.querySelector('.modal__text'),
    timeSpan = document.querySelector('.time'),
    priceWrapp = document.querySelector('.form-order__list'),
    oldPrice = document.querySelector('.old--price');

let cardActiveNumber = 0,
    numberDisplayedSlider = 0,
    translateX = -translateSlider();

wrapp.style.transform = `translateX(${translateX}px)`;
calculationNumberDisplayedSlider();
calculateLocationBtn();
timeChange();

btnNext.addEventListener('click', ()=> {
    cardActiveNumber++;
    translateX = -translateSlider();
    wrapp.style.transform = `translateX(${translateX}px)`
    btnPrev.classList.remove('diseble'); 
    if (cardActiveNumber >= cards.length - numberDisplayedSlider) {
        btnNext.classList.add('diseble');
    }
});

btnPrev.addEventListener('click', ()=> {
    cardActiveNumber--;
    translateX = -translateSlider();
    wrapp.style.transform = `translateX(${translateX}px)` 
    btnNext.classList.remove('diseble'); 
    if (cardActiveNumber < 1) {
        btnPrev.classList.add('diseble');
    }
});

btnFormOrder.addEventListener('click', (e) => {
    e.preventDefault();
    if (calculationScrollDistances(form) >= window.pageYOffset) {
        form.scrollIntoView()
    } else {
        body.style.overflow = 'hidden';
        modal.classList.add('modal--active');
        if (inputName.value.trim() == '' || inputTel.value.trim() == '') {
            modalText.textContent = 'Заполните все поля';
        } else {
            modalText.textContent = 'Форма отправлена';
        }
    }
});

modalBtn.addEventListener('click', () =>{
    body.style.overflow = 'auto';
    modal.classList.remove('modal--active')
});

window.addEventListener('scroll', () => {
    calculateLocationBtn()
});

window.addEventListener('resize', ()=> {
    calculationNumberDisplayedSlider();
    translateX = -translateSlider();
    wrapp.style.transform = `translateX(${translateX}px)`;

    calculateLocationBtn();
});

function translateSlider() {
    let cardActive = cards[cardActiveNumber],
        padding = window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("padding-left") ?
            parseInt(window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("padding-left"), 10) :0,
        margin = window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("padding-left") ?
            parseInt(window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("margin-right"), 10) :0;
        translate = 0;
    
    translate = cardActive.offsetLeft - padding + margin;

    return translate
}

function calculationNumberDisplayedSlider(i = 1) {
    let margin = window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("padding-left") ?
        parseInt(window.getComputedStyle(cards[0].offsetParent, null).getPropertyValue("margin-right"), 10) :0,
        widthSlide = i > 1 ? (cards[0].offsetWidth * i) + (margin * i-1) : cards[0].offsetWidth + margin;
    if (slider.offsetWidth > widthSlide) {
        calculationNumberDisplayedSlider(i+1)
    } else {

        numberDisplayedSlider = i
    }
}

function calculateLocationBtn() {
    if (window.pageYOffset >= 100) {
        btnFormOrder.style.transform = 'translate(-50%,0)';
    } else {
        let translateY = -imgIntro.getBoundingClientRect().bottom + window.pageYOffset + btnFormOrder.getBoundingClientRect().bottom + window.pageYOffset,
            translateX = -imgIntro.getBoundingClientRect().right + window.pageXOffset + btnFormOrder.getBoundingClientRect().right + window.pageXOffset;
            btnFormOrder.style.transform = `translate(${-translateX}px,${-translateY}px)`;
    }
}

function calculationScrollDistances(el, scrollDistances = 0) {
    scrollDistances += el.offsetTop - el.offsetWidth
    if (el.offsetParent != document.body) {
        return calculationScrollDistances(el.offsetParent, scrollDistances)
    } else {
        return scrollDistances;
    }
}

function timeChange() {
    let time = parseInt(timeSpan.textContent.trim(), 10);
    if (time-1 >= 0) {
        setTimeout(()=> {
            timeSpan.textContent=time-1
            timeChange();
        }, 1000*60)
    } else {
        priceWrapp.innerHTML = `<li class="form-order__price">${oldPrice.textContent.trim()}</li>`;
    }
}