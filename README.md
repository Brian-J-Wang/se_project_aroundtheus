# Project 3: Around The U.S.

## Page
The page for this project can be found here:
https://brian-j-wang.github.io/se_project_aroundtheus/

## Overview  
SE project that uses some advanced CSS topics such as functions, media queries, and custom fonts. This project is part of TripleTen's Software engineering course.

A overview of the project can be found here.
https://drive.google.com/file/d/1e5TPgKdNfP7FPD0Nz8wOucx0Dud-brXP/view?usp=drive_link

# Documentation

## validation.js

EnableValidation(config) is a generalized method for adding validation to any form in this project.
- config is an object with the format:
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

{
    formSelector: specifies the "<form>" element
    inputSelector: the <input> elements within the form
    submitButtonSelector: the <button>
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}