const initialCards = [
    {
        name: "New York",
        link: "https://plus.unsplash.com/premium_photo-1681803606255-cb66b02f2b56?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Chicago",
        link: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Golden Gate",
        link: "https://images.unsplash.com/photo-1574054394439-06aef14b154e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    }
]
const places = document.querySelector(".places");
const cardTemplate = document.querySelector("#card").content;

const pictureModal = document.querySelector('.modal[id=imageModal]');
const modalImage = pictureModal.querySelector('.modal__image');
const modalCaption = pictureModal.querySelector('.modal__caption');
initialCards.forEach((card) => {
    const cardInstance = createCard(card);
    places.append(cardInstance);
})

function createCard(cardInfo) {
    const cardCopy = cardTemplate.cloneNode(true);
    const cardImage = cardCopy.querySelector('.places__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardCopy.querySelector('.places__name').textContent = cardInfo.name;

    const deleteButton = cardCopy.querySelector('.places__delete');
    deleteButton.addEventListener("click", () => {
        deleteButton.closest('.places__card').remove();
    });

    const heartButton = cardCopy.querySelector('.places__heart');
    heartButton.addEventListener("click", () => {
        heartButton.classList.toggle('places__heart_enabled');
    });

    cardImage.addEventListener("click", () => {
        openImageModal(cardImage);
    });
    return cardCopy;
}

function openImageModal(cardImage) {
    const imageSrc = cardImage.getAttribute('src');
    const imageAlt = cardImage.getAttribute('alt');
    modalImage.setAttribute('src', imageSrc);
    modalImage.setAttribute('alt', imageAlt);
    const imageCaption = imageAlt;
    modalCaption.innerText = imageCaption;

    openPopup(pictureModal);
}


const editModal = document.querySelector('.modal[id=editModal]');
const inputName = editModal.querySelector('.modal__input[name=name]');
const profileName = document.querySelector('.profile__name'); 
const inputDesc = editModal.querySelector('.modal__input[name=desc]');
const profileDesc = document.querySelector('.profile__desc');

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener("click", openProfileModal);
function openProfileModal() {
    inputName.value = profileName.textContent;
    inputDesc.value = profileDesc.textContent;
    openPopup(editModal);
}

const editModalForm = editModal.querySelector('.modal__form');
editModalForm.addEventListener("submit", saveProfileData);
function saveProfileData(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;

    closePopup(editModal);
}


const addModal = document.querySelector('.modal[id=addModal]');
const inputTitle = addModal.querySelector('.modal__input[name=title]');
const inputLink = addModal.querySelector('.modal__input[name=link]');
const addButton = document.querySelector(".profile__add");
addButton.addEventListener("click", () => {
    openPopup(addModal)
});

const addModalForm = addModal.querySelector('.modal__form');
addModalForm.addEventListener("submit", savePlaceData);
function savePlaceData(evt) {
    evt.preventDefault();

    const cardInfo = {
        name: inputTitle.value,
        link: inputLink.value
    }
    const cardInstance = createCard(cardInfo);
    places.prepend(cardInstance);

    closePopup(addModal);
}

const closeModalButtons = document.querySelectorAll(".modal__close");
closeModalButtons.forEach((closeButton) => {
    const modal = closeButton.closest('.modal');
    closeButton.addEventListener("click", () => {
        closePopup(modal);
    });
});


function openPopup(caller) {
    let modal = caller.closest('.modal');
    modal.classList.add('modal_opened');
}

function closePopup(modal) {
    modal.classList.remove('modal_opened'); 
}