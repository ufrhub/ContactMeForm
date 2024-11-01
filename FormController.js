const Green = "#00F15E";
const Green_30 = "#00f15e4d";
const Dark_Gray = "#232624";

const PortfolioElementsContainer = document.getElementById("Portfolio-Elements-Container");
const Loader = document.getElementById("loader");

const NameInput = document.getElementById("NameInput");
let NameInputData = { isValid: false, message: "Name is required...!", value: "" };

const EmailInput = document.getElementById("EmailInput");
let EmailInputData = { isValid: false, message: "Email is required...!", value: "" };

const PhoneDialCodeInput = document.getElementById("PhoneDialCodeDropdownInput");
let PhoneDialCodeInputData = { isValid: true, message: `Your country dial code is ${PhoneDialCodeInput.value}`, value: PhoneDialCodeInput.value };

const PhoneNumberInput = document.getElementById("PhoneNumberInput");
let PhoneNumberInputData = { isValid: false, message: "Phone number is required...!", value: "" };

const MessageInput = document.getElementById("MessageInput");
let MessageInputData = { isValid: false, message: "Message is required...!", value: "" };

const SubmitButton = document.getElementById("submitFormButton");

const ValidInputBoxStyle = (Element) => {
    Element.style.background = Green_30; // Set background to light Green
    Element.style.border = `3px solid ${Green}`; // Set border to Green
}

const InvalidInputBoxStyle = (Element) => {
    Element.style.background = Dark_Gray; // Set background to dark color
    Element.style.border = "none"; // Remove border
}

const SubmitButtonStyle = () => {
    if (NameInputData.isValid && EmailInputData.isValid && PhoneNumberInputData.isValid && MessageInputData.isValid) {
        SubmitButton.style.color = Dark_Gray;
        SubmitButton.style.background = Green;
    } else {
        SubmitButton.style.color = "";
        SubmitButton.style.background = "";
    }
}

const FetchCountryDetails = async (Dial_Code) => {
    const Response = await fetch("./CountryCodesWithFlags.json");
    const Data = await Response.json();
    return Data.find((item) => item.dial_code === Dial_Code);
}

const DisplayLoading = (isLoading) => {
    if (isLoading) {
        Loader.style.display = "block";
        PortfolioElementsContainer.style.overflowY = "hidden";
    } else {
        Loader.style.display = "none";
        PortfolioElementsContainer.style.overflowY = "auto";
    }
}

NameInput.addEventListener("input", (Event) => {
    const { value } = Event.target;

    // Remove characters that are not alphabetic, spaces, or underscores
    Event.target.value = value.replace(/[^A-Za-z_ ]/g, '');

    if (value.replace(/[^A-Za-z]/g, '').length < 4) {
        InvalidInputBoxStyle(NameInput);

        NameInputData.isValid = false; // Mark as invalid
        NameInputData.message = "Name must be at least 4 characters long...!"; // Error message
        NameInputData.value = value;
    } else {
        ValidInputBoxStyle(NameInput);

        NameInputData.isValid = true; // Mark as valid
        NameInputData.message = "Valid name...!"; // Success message
        NameInputData.value = value;
    }

    SubmitButtonStyle();
});

EmailInput.addEventListener("input", (Event) => {
    const { value } = Event.target;

    // Email Validation (must be a valid email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        InvalidInputBoxStyle(EmailInput);

        EmailInputData.isValid = false; // Mark as invalid
        EmailInputData.message = "Invalid email...!"; // Error message
        EmailInputData.value = value;
    } else {
        ValidInputBoxStyle(EmailInput);

        EmailInputData.isValid = true; // Mark as valid
        EmailInputData.message = "Valid email...!"; // Success message
        EmailInputData.value = value;
    }

    SubmitButtonStyle();
});

PhoneDialCodeInput.addEventListener("change", (Event) => {
    const { value } = Event.target;

    PhoneDialCodeInputData.isValid = true; // Mark as valid
    PhoneDialCodeInputData.message = `Your country dial code is ${value}`; // Success message
    PhoneDialCodeInputData.value = value;
});

PhoneNumberInput.addEventListener("input", (Event) => {
    let { value } = Event.target;

    // Remove any non-numeric characters from the input
    value = value.replace(/\D/g, '');

    if (value.startsWith("0") && value.length > 11) {
        value = value.slice(0, 11);

    } else if (!value.startsWith("0") && value.length > 10) {
        // Limit the input to 10 digits
        value = value.slice(0, 10);
    }

    // Update the input field's value with the valid digits
    Event.target.value = value;

    if (value.length === 0) {
        InvalidInputBoxStyle(PhoneNumberInput);

        PhoneNumberInputData.isValid = false; // Mark as invalid
        PhoneNumberInputData.message = "Phone number is required...!"; // Error message
        PhoneNumberInputData.value = value;
    } else if ((value.startsWith("0") && value.length !== 11) || (!value.startsWith("0") && value.length !== 10) || value.startsWith("00")) {
        InvalidInputBoxStyle(PhoneNumberInput);

        PhoneNumberInputData.isValid = false; // Mark as invalid
        PhoneNumberInputData.message = "Invalid phone number...!"; // Error message
        PhoneNumberInputData.value = value;
    } else if ((value.startsWith("0") && value.length === 11) || (!value.startsWith("0") && value.length === 10)) {
        ValidInputBoxStyle(PhoneNumberInput);

        PhoneNumberInputData.isValid = true; // Mark as valid
        PhoneNumberInputData.message = "Valid phone number...!"; // Success message
        PhoneNumberInputData.value = value;
    }

    SubmitButtonStyle();
});

MessageInput.addEventListener("input", (Event) => {
    const { value } = Event.target;

    if (value.length < 25) {
        InvalidInputBoxStyle(MessageInput);

        MessageInputData.isValid = false; // Mark as invalid
        MessageInputData.message = "Message must be at least 25 characters long...!"; // Error message
        MessageInputData.value = value;
    } else {
        ValidInputBoxStyle(MessageInput);

        MessageInputData.isValid = true; // Mark as valid
        MessageInputData.message = "Valid email...!"; // Success message
        MessageInputData.value = value;
    }

    SubmitButtonStyle();
});

const SubmitForm = async (Element) => {
    Element.preventDefault(); // Prevent the default form submission

    if (!NameInputData.isValid) {
        return alert(NameInputData.message);
    }

    if (!EmailInputData.isValid) {
        return alert(EmailInputData.message);
    }

    if (!PhoneNumberInputData.isValid) {
        return alert(PhoneNumberInputData.message);
    }

    if (!MessageInputData.isValid) {
        return alert(MessageInputData.message);
    }

    // Prepare the form data
    const name = NameInputData.value.replace(/[^A-Za-z_ ]/g, '');
    const email = EmailInputData.value;
    const country = await FetchCountryDetails(PhoneDialCodeInputData.value);
    const dial_code = PhoneDialCodeInputData.value;
    const phone = PhoneNumberInputData.value;
    const message = MessageInputData.value;

    DisplayLoading(true);

    // Handle the form submission
    setTimeout(() => {
        DisplayLoading(false);

        console.log(
            {
                name,
                email,
                country: country.name,
                dial_code,
                phone,
                message
            }
        );
    }, 3000);

}

SubmitButton.addEventListener("click", SubmitForm);