# Project 3: Around The U.S.

## Page
The page for this project can be found here:
https://brian-j-wang.github.io/se_project_aroundtheus/

## Overview  
This Project uses HTML, CSS, and JS to create a responsive website. This project is part of TripleTen's Software engineering course.

### Features
- Forms for editing the profile information and adding new cards.
- Persistent 'like' feature on each card.
- Cards can be deleted, and a confirm window will show up to confirm.

An overview of the project can be found here.
https://drive.google.com/file/d/1e5TPgKdNfP7FPD0Nz8wOucx0Dud-brXP/view?usp=drive_link

# Documentation
documentation for the classes and files can be found in src/components.

## validation.js

EnableValidation(config) is a generalized method for adding validation to any form in this project. the Config is an object with the format:
```
{
    formSelector: ".modal__form",                    // specifies the form HTML element.
    inputSelector: ".modal__input",                  // the input elements within the form.
    submitButtonSelector: ".modal__button",          // the button element.
    inactiveButtonClass: "modal__button_disabled",   // the class that is used to represent an inactive button.
    inputErrorClass: "modal__input_type_error",      // a class used to change the appearance of the input elements when incorrect data was passed.
    errorClass: "modal__error_visible"               // a class used to change the appearance of the error span.
}
```

# Contact
Any questions about this project can be sent to brianwang7102@gmail.com.
