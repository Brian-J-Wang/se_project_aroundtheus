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
for (let i = 0; i < initialCards.length; i++) {
    let cardCopy = CreateCard(cardTemplate);
    cardCopy.querySelector('.places__image').src = initialCards[i].link;
    cardCopy.querySelector('.places__image').alt = "place image"
    cardCopy.querySelector('.places__name').textContent = initialCards[i].name;

    places.append(cardCopy);
}

function CreateCard(template) {
    return template.cloneNode(true);
}


const modal = document.querySelector('.modal');
const inputName = modal.querySelector('.modal__input[name=name]');
const profileName = document.querySelector('.profile__name'); 
const inputDesc = modal.querySelector('.modal__input[name=desc]');
const profileDesc = document.querySelector('.profile__desc');

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener("click", openProfileModal);
function openProfileModal() {
    inputName.value = profileName.textContent;
    inputDesc.value = profileDesc.textContent;
    modal.classList.add('modal_opened');
}

const closeModalWindow = document.querySelector(".modal__close");
closeModalWindow.addEventListener("click", closeProfileModal);
function closeProfileModal() {
    modal.classList.remove("modal_opened");
}

const modalForm = modal.querySelector('.modal__form');
modalForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    saveProfileData();
});

function saveProfileData() {
    profileName.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;
    closeProfileModal();
}



