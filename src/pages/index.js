import Api from "../Components/Api.js";
import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import UserInfo from "../Components/UserInfo.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import '../styles/style.css';
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithConfirm from "../Components/PopupWithConfirm.js";

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const API = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "e8616e37-d8e6-434f-880a-27a697920338",
      "Content-Type": "application/json"
    }
});

const confirmPopup = new PopupWithConfirm('.modal[id=confirmModal]');
confirmPopup.setEventListeners();

const cardTemplate = document.querySelector('#card');
const renderCard = (cardData) => {
    return new Card(cardData, cardTemplate, openImageModal, 
    (data, deleteButton) => {
        confirmPopup.onPopupConfirm(() => {
            return API.deleteCard(data._id)
            .then(() => {
                deleteButton.closest('.places__card').remove();
            });
        })
    }, 
    (isLiked, data) => {
        if (isLiked) {
            API.addLike(data._id)
        } else {
            API.removeLike(data._id)
        }
    }).createCard();
}
const container = new Section({items: [], renderer: renderCard }, ".places" );
API.getInitialCards()
.then(cards => {
    cards.forEach(card => {
        const cardElement = renderCard(card);
        container.addItem(cardElement);
    });
});

//Image modal
const imagePopup = new PopupWithImage('.modal[id=imageModal]');
function openImageModal(cardImage) {
    const cardData = {
        name: cardImage.getAttribute('alt'),
        link: cardImage.getAttribute('src')
    }

    imagePopup.open(cardData);
}
imagePopup.setEventListeners();

//User Information
const nameSelector = '.profile__name';
const descSelector = '.profile__desc';
const avatarSelector = '.profile__avatar-image';
const profileElement = new UserInfo({name: nameSelector, desc: descSelector, avatar: avatarSelector});
API.getUserInformation()
    .then(userInfo => {
        document.querySelector(avatarSelector).setAttribute('src', userInfo.avatar);
        profileElement.setUserInfo({name: userInfo.name, desc: userInfo.about});
    });

//Edit user info modal
const editInfoForm = new PopupWithForm('.modal[id=editModal]',(inputs) => {
    const userInfo = {
        name: inputs['name-input'],
        about: inputs['desc-input']
    }

    return API.updateUserInformation({name: userInfo.name, about: userInfo.about})
    .then((res) => {
        profileElement.setUserInfo({name: res.name, desc: res.about});
    });
})
editInfoForm.setEventListeners();

const editButtonSelector = '.profile__edit';
const inputName = editModal.querySelector('.modal__input[name=name]');
const inputDesc = editModal.querySelector('.modal__input[name=desc]');
const editButton = document.querySelector(editButtonSelector);
editButton.addEventListener('click', openProfileModal);
function openProfileModal() {
    const userInfo = profileElement.getUserInfo();

    inputName.value = userInfo.name;
    inputDesc.value = userInfo.desc;
    editInfoForm.open();
}

const editModalForm = document.forms['editModalForm'];
const editModalValidator = new FormValidator(editModalForm, config, editButtonSelector);
editModalValidator.enableValidation();

//Edit user avatar modal
const editAvatarSelector = '.profile__avatar-container';
const avatarImage = document.querySelector('.profile__avatar-image');
const editAvatarForm = new PopupWithForm('.modal[id=editAvatarModal]', (inputs) => {
    const linkInput = inputs['avatar-input'];

    return API.updateAvatar(linkInput)
    .then(res => {
        
        avatarImage.setAttribute('src', res.avatar);
    })
})
editAvatarForm.setEventListeners();

const avatarElement = document.querySelector(editAvatarSelector);
avatarElement.addEventListener('click', openEditAvatarModal)
function openEditAvatarModal() {
    editAvatarForm.open();    
}

const avatarModalForm = document.forms['editAvatarModalForm']
const avatarModalValidator = new FormValidator(avatarModalForm, config, editAvatarSelector);
avatarModalValidator.enableValidation();

//Add modal functions
const addForm = new PopupWithForm('.modal[id=addModal]', (inputs) => {
    const cardInfo = {
        name: inputs['title-input'],
        link: inputs['link-input']
    }

    console.log(cardInfo)

    return API.createCard({name: cardInfo.name, link: cardInfo.link})
    .then(res => {
        const card = renderCard(cardInfo);
        container.addItem(card);
    })
});
addForm.setEventListeners();

const addButtonSelector = '.profile__add';
const addButton = document.querySelector(addButtonSelector);
addButton.addEventListener('click', () => {
    addForm.open();
})

const addModalForm = document.forms['addModalForm']
const addModalValidator = new FormValidator(addModalForm, config, addButtonSelector);
addModalValidator.enableValidation();
