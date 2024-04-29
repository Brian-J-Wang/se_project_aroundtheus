# Project 3: Around The U.S.

## Page
This contains the build for.The page for this project can be found here:
https://brian-j-wang.github.io/se_project_aroundtheus/

## Overview  
SE project that uses some advanced CSS topics such as functions, media queries, and custom fonts. This project is part of TripleTen's Software engineering course.

A overview of the project can be found here.
https://drive.google.com/file/d/1e5TPgKdNfP7FPD0Nz8wOucx0Dud-brXP/view?usp=drive_link

# Documentation

## validation.js

EnableValidation(config) is a generalized method for adding validation to any form in this project. the Config is an object with the format:
```
{
    formSelector: ".modal__form
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}
```

```
{
    formSelector: specifies the form html element.
    inputSelector: the input elements within the form.
    submitButtonSelector: the button element
    inactiveButtonClass: the class used to represent an inactive button.
    inputErrorClass: a class used to change the appearance of the input elements when incorrect data was passed.
    errorClass: a class used to change the appearance of the error span.
}
```

