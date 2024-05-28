import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import UserInfo from "../Components/UserInfo.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import '../styles/style.css';
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithConfirm from "../Components/PopupWithConfirm.js";
import { config, API } from "../utils/constants.js";

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
            })
            .catch((rej) => {
                console.log(rej);
            });
        })
    }, 
    (data, heartElement) => {
        console.log(data);
        if (!data.isLiked) {
            API.addLike(data._id)
            .then(() => {
                data.isLiked = true;
                heartElement.classList.add('places__heart_enabled');
            })
            .catch(rej => {
                console.log(rej);
            });
        } else {
            API.removeLike(data._id)
            .then(() => {
                data.isLiked = false;
                heartElement.classList.remove('places__heart_enabled');
            })
            .catch(rej => {
                console.log(rej);
            });
        }
    }).createCard();
}

const cardSection = new Section(renderCard, ".places");
API.getInitialCards()
.then(cards => {
    cardSection.renderItems(cards);
})
.catch(rej => {
    console.log(rej);
})

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
const userProfile = new UserInfo({name: nameSelector, desc: descSelector, avatar: avatarSelector});
API.getUserInformation()
    .then(userInfo => {
        userProfile.setUserInfo({name: userInfo.name, desc: userInfo.about});
        userProfile.setAvatarLink(userInfo.avatar);
    })
    .catch(rej => {
        console.log(rej);
    });

//Edit user info modal
const editInfoForm = new PopupWithForm('.modal[id=editModal]',(inputs) => {
    const userInfo = {
        name: inputs['name-input'],
        about: inputs['desc-input']
    }

    return API.updateUserInformation({name: userInfo.name, about: userInfo.about})
    .then((res) => {
        userProfile.setUserInfo({name: res.name, desc: res.about});
    })
    .catch(rej => {
        console.log(rej);
    });
})
editInfoForm.setEventListeners();

const editButtonSelector = '.profile__edit';
const inputName = editModal.querySelector('.modal__input[name=name]');
const inputDesc = editModal.querySelector('.modal__input[name=desc]');
const editButton = document.querySelector(editButtonSelector);
editButton.addEventListener('click', openProfileModal);
function openProfileModal() {
    const userInfo = userProfile.getUserInfo();

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
        userProfile.setAvatarLink(res.avatar);
    })
    .catch(rej => {
        console.log(rej);
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
    return API.createCard({name: inputs['title-input'], link: inputs['link-input']})
    .then(res => {
        const card = renderCard(res);
        cardSection.addItem(card);
    })
    .catch(rej => {
        console.log(rej);
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
