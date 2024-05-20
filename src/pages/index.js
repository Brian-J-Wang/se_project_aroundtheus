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
            API.deleteCard(data._id)
            .then((res) => {
                deleteButton.closest('.places__card').remove();
                console.log(res);
            });
        })
    }, 
    (isLiked, data) => {
        if (isLiked) {
            API.addLike(data._id)
            .then(res => {
                console.log(res);
            });
        } else {
            API.removeLike(data._id)
            .then(res => {
                console.log(res);
            });
        }
    }).createCard();
}
const container = new Section({items: [], renderer: renderCard }, ".places" );
API.getInitialCards()
.then(cards => {
    cards.forEach(card => {

        console.log(card);

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
const profileElement = new UserInfo({name: nameSelector, desc: descSelector});

API.getUserInformation()
    .then(userInfo => {
        profileElement.setUserInfo({name: userInfo.name, desc: userInfo.about});
    });

//Edit modal
const editForm = new PopupWithForm('.modal[id=editModal]',(inputs) => {
    const userInfo = {
        name: inputs['name-input'],
        about: inputs['desc-input']
    }

    API.updateUserInformation({name: userInfo.name, about: userInfo.about})
    .then(res => {
        profileElement.setUserInfo({name: res.name, desc: res.about});
    });
    
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



//Add modal functions
const addForm = new PopupWithForm('.modal[id=addModal]', (inputs) => {
    const cardInfo = {
        name: inputs['title-input'],
        link: inputs['link-input']
    }

    API.createCard({name: cardInfo.name, link: cardInfo.link})
    .then(res => {
        const card = renderCard(cardInfo);
        container.addItem(card);
    })
});
addForm.setEventListeners();


const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', () => {
    addForm.open();
})

const addModalForm = document.forms['addModalForm']
const addModalValidator = new FormValidator(addModalForm, config);
addModalValidator.enableValidation();
