import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import UserInfo from "../Components/UserInfo.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import '../styles/style.css';

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

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

const cardTemplate = document.querySelector('#card');
const container = new Section({items: initialCards, renderer: (item, container) => {
    const cardCopy = new Card(item, cardTemplate, openImageModal).createCard(); //change the openImageModal function;
    container.prepend(cardCopy);
} }, ".places" );
container.renderItems();

const pictureModal = document.querySelector('.modal[id=imageModal]');
const modalImage = pictureModal.querySelector('.modal__image');
const modalCaption = pictureModal.querySelector('.modal__caption');
function openImageModal(cardImage) {
    const imageSrc = cardImage.getAttribute('src');
    const imageAlt = cardImage.getAttribute('alt');
    modalImage.setAttribute('src', imageSrc);
    modalImage.setAttribute('alt', imageAlt);
    const imageCaption = imageAlt;
    modalCaption.innerText = imageCaption;

    openPopup(pictureModal);
}

//User Information
const nameSelector = '.profile__name';
const descSelector = '.profile__desc';
const profileElement = new UserInfo({name: nameSelector, desc: descSelector});

//Edit modal
const editForm = new PopupWithForm('.modal[id=editModal]',(inputs) => {
    const userInfo = {
        name: inputs['name-input'].value,
        desc: inputs['desc-input'].value
    }

    profileElement.setUserInfo(userInfo);
})
editForm.setEventListeners();


const inputName = editModal.querySelector('.modal__input[name=name]');
const inputDesc = editModal.querySelector('.modal__input[name=desc]');
const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', openProfileModal);
function openProfileModal() {
    const userInfo = profileElement.getUserInfo();

    inputName.value = userInfo.name;
    inputDesc.value = userInfo.desc;
    editForm.open();
}


const editModalForm = document.forms['editModalForm'];
const editModalValidator = new FormValidator(editModalForm, config);
editModalValidator.enableValidation();
// editModalForm.addEventListener("submit", saveProfileData);
// function saveProfileData(evt) {
//     evt.preventDefault();

//     profileName.textContent = inputName.value;
//     profileDesc.textContent = inputDesc.value;

//     closePopup(editModal);
// }



//Add modal functions
const addForm = new PopupWithForm('.modal[id=addModal]', (inputs) => {
    const cardInfo = {
        name: inputs['title-input'],
        link: inputs['link-input']
    }

    const card = new Card(cardInfo, cardTemplate, openImageModal).createCard();
    container.addItem(card);
});
addForm.setEventListeners();


const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', () => {
    addForm.open();
})

// const inputTitle = addModal.querySelector('.modal__input[name=title]');
// const inputLink = addModal.querySelector('.modal__input[name=link]');
const addModalForm = document.forms['addModalForm']
const addModalValidator = new FormValidator(addModalForm, config);
addModalValidator.enableValidation();
// addModalForm.addEventListener("submit", savePlaceData);
// function savePlaceData(evt) {
//     evt.preventDefault();

//     const cardInfo = {
//         name: inputTitle.value,
//         link: inputLink.value
//     }
    
//     const card = new Card(cardInfo, cardTemplate, openImageModal).createCard();
//     places.prepend(card);

//     closePopup(addModal);
//     evt.target.reset();
// }

//close modal window functions
//close by close button
// const closeModalButtons = document.querySelectorAll(".modal__close");
// closeModalButtons.forEach((closeButton) => {
//     const modal = closeButton.closest('.modal');
//     closeButton.addEventListener("click", () => {
//         closePopup(modal);
//     });
// });

// function openPopup(modalElement) {
//     modalElement.classList.add('modal_opened');
//     document.addEventListener('keyup', closeModalByEscKey);
// }

// function closePopup(modalElement) {
//     document.removeEventListener('keyup', closeModalByEscKey);
//     modalElement.classList.remove('modal_opened'); 
// }

// //close by escape key
// function closeModalByEscKey(evt) {
//     if (evt.key != 'Escape') {
//         return;
//     }

//     const activeModal = document.querySelector('.modal_opened');
//     closePopup(activeModal);
// }

//close by cicking overlay
// const modalList = document.querySelectorAll('.modal');
// modalList.forEach((modalElement) => {
//     modalElement.addEventListener('click', closeModalByClickingOverlay);
// });

// function closeModalByClickingOverlay(evt) {
//     if (evt.target.classList.contains("modal")) {
//         closePopup(evt.currentTarget);
//     }
// }
