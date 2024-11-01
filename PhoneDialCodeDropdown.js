const white = "#FAFAFA";
const green = "#00F15E";
const black = "#080707";
const green_30 = "#00f15e4d";
const gray = "#87938C";
const dark_gray = "#232624";
const gray_40 = "#87938c66";
const dark_red = "#BB3D3D";
const font_family_content = "Poppins, sans-serif";

/********************* Phone Input Section *********************/
const PhoneInputSection = document.getElementById("phone-input-section");

/*--- Styles ---*/
PhoneInputSection.style.height = "auto";
PhoneInputSection.style.width = "100%";
PhoneInputSection.style.minWidth = "280px";
PhoneInputSection.style.display = "flex";
PhoneInputSection.style.flexDirection = "row"
PhoneInputSection.style.alignItems = "center";
PhoneInputSection.style.justifyContent = "start";
PhoneInputSection.style.gap = "10px";

/********************************************************************** 
 * Function to Set the Input Value to the Dial Code 
 **********************************************************************/
const SetPhoneDialCodeInputValue = (Element, Value, SVG_Url) => {
    Element.value = Value;
    Element.style.background = `url('./${SVG_Url}')`;
    Element.style.backgroundColor = green_30;
    Element.style.backgroundPosition = "left 10px center";
    Element.style.backgroundRepeat = "no-repeat";
    Element.style.backgroundSize = "40% 70%";

    /*--- Create and dispatch a custom 'change' event ---*/
    const ChangeEvent = new Event("change");
    Element.dispatchEvent(ChangeEvent);
}

/********************************************************************** 
 * Function to Handle the Options Container on Arrow key press
 **********************************************************************/
const HandleOptionsContainerOnArrowKeyPress = (OptionsContainer, Event) => {
    if (OptionsContainer.style.height !== "0px" && (Event.key === "ArrowDown" || Event.key === "ArrowUp")) {
        Event.preventDefault();

        const Options = OptionsContainer.querySelectorAll(".PhoneDialCodeDropdownOption");
        if (Options.length === 0) return;

        const ScrollTop = OptionsContainer.scrollTop;
        const ScrollHeight = OptionsContainer.scrollHeight;
        const ClientHeight = OptionsContainer.clientHeight;

        if (Event.key === "ArrowUp") {
            if (ScrollTop > 0) {
                OptionsContainer.scrollBy({ top: -Options[0].clientHeight, behavior: "smooth" });
            }
        }

        if (Event.key === "ArrowDown") {
            if (ScrollTop + ClientHeight < ScrollHeight) {
                OptionsContainer.scrollBy({ top: Options[0].clientHeight, behavior: "smooth" });
            }
        }
    }
};

/********************************************************************** 
 * Function to Create and Handle Phone Dial Code Dropdown
 **********************************************************************/
const CreatePhoneDialCodeDropdown = () => {
    const Container = document.createElement("div");
    const Label = document.createElement("label");
    const LabelMandatoryMark = document.createElement("span");
    const InputContainer = document.createElement("div");
    const Input = document.createElement("input");
    const OptionsContainer = document.createElement("div");

    /********************* Container *********************/
    Container.id = "PhoneDialCodeDropdownContainer";

    /*--- Styles ---*/
    Container.style.height = "auto";
    Container.style.width = "25%";
    Container.style.minWidth = "111px";
    Container.style.display = "flex";
    Container.style.flexDirection = "column";
    Container.style.alignItems = "start";
    Container.style.justifyContent = "center";

    /********************* Label & Label Mandatory Mark *********************/
    Label.id = "PhoneDialCodeDropdownLabel";
    Label.innerHTML = "Country";
    Label.htmlFor = "PhoneDialCodeDropdownInput";
    LabelMandatoryMark.innerHTML = "*";

    /*--- Label Styles ---*/
    Label.style.color = white;
    Label.style.fontFamily = font_family_content;
    Label.style.fontSize = "large";
    Label.style.padding = "10px 20px";

    /*--- Label Mandatory Mark Styles ---*/
    LabelMandatoryMark.style.color = dark_red;
    LabelMandatoryMark.style.padding = "0 5px";

    /********************* Input Container *********************/
    InputContainer.id = "PhoneDialCodeDropdownInputContainer";

    /*--- Styles ---*/
    InputContainer.style.position = "relative";
    InputContainer.style.height = "auto";
    InputContainer.style.width = "100%";

    /********************* Input *********************/
    Input.id = "PhoneDialCodeDropdownInput";
    Input.readOnly = true;

    /*--- Styles ---*/
    Input.style.height = "auto";
    Input.style.maxWidth = "100%";
    Input.style.minWidth = "100%"
    Input.style.fontSize = "large";
    Input.style.padding = "10px 5px 10px 50px";
    Input.style.color = white;
    Input.style.fontFamily = font_family_content;
    Input.style.textAlign = "center";
    Input.style.outline = "none";
    Input.style.border = `3px solid ${green}`;
    Input.style.borderRadius = "10px";
    Input.style.cursor = "pointer";

    /*--- Default Input Value ---*/
    SetPhoneDialCodeInputValue(Input, "+91", "flags/4x3/in.svg");

    /********************* Options Container *********************/
    OptionsContainer.id = "PhoneDialCodeDropdownOptionsContainer";

    /*--- Styles ---*/
    OptionsContainer.style.position = "absolute";
    OptionsContainer.style.top = "calc(100% + 1px)";
    OptionsContainer.style.height = "0";
    OptionsContainer.style.maxHeight = "200px";
    OptionsContainer.style.width = "100%";
    OptionsContainer.style.background = black;
    OptionsContainer.style.border = "none";
    OptionsContainer.style.borderRadius = "10px";
    OptionsContainer.style.overflow = "auto";
    OptionsContainer.style.zIndex = "9999999";
    OptionsContainer.style.transition = "all ease-in-out 300ms";
    OptionsContainer.style.overflowY = "auto";
    OptionsContainer.style.msOverflowStyle = "none";  // For Internet Explorer and Edge
    OptionsContainer.style.scrollbarWidth = "none";   // For Firefox

    const HandleKeyPress = (Event) => HandleOptionsContainerOnArrowKeyPress(OptionsContainer, Event);

    /*--- Style OOptionsContainer if Input is focused ---*/
    Input.addEventListener("focus", () => {
        OptionsContainer.style.height = "200px";
        OptionsContainer.style.border = `3px solid ${green}`;

        document.addEventListener("keydown", HandleKeyPress);
    });

    /*--- Style OOptionsContainer if Input is blurd ---*/
    Input.addEventListener("blur", () => {
        document.removeEventListener("keydown", HandleKeyPress);

        setTimeout(() => {
            OptionsContainer.style.height = "0";
            OptionsContainer.style.border = "none";
        }, 100);
    });

    /********************* Append Child *********************/
    /*--- Append Label Mandatory Mark to Label ---*/
    Label.appendChild(LabelMandatoryMark);

    /*--- Append Input to InputContainer ---*/
    InputContainer.appendChild(Input);

    /*--- Append OptionsContainer to InputContainer ---*/
    InputContainer.appendChild(OptionsContainer);

    /*--- Append Label to Container ---*/
    Container.appendChild(Label);

    /*--- Append InputContainer to Container ---*/
    Container.appendChild(InputContainer);

    /********************* Return Container *********************/
    return Container;
}

/********************************************************************** 
 * Function to Create and Handle Phone Dial Code Dropdown Options
 **********************************************************************/
const PhoneDialCodeDropdownOption = async () => {
    const Input = document.getElementById("PhoneDialCodeDropdownInput");
    const OptionsContainer = document.getElementById("PhoneDialCodeDropdownOptionsContainer");

    /*--- Fetch Country Codes With Flags file ---*/
    const Response = await fetch("./CountryCodesWithFlags.json");
    const OptionsData = await Response.json();

    const RenderOptions = (FilteredOptions) => {
        /*--- Clear existing options ---*/
        OptionsContainer.innerHTML = "";

        FilteredOptions.forEach((Element, Index) => {
            if (Element.dial_code !== null) {
                const Option = document.createElement("div");
                const OptionImage = document.createElement("img");

                /********************* Option & Option Image *********************/
                Option.id = "PhoneDialCodeDropdownOption_" + Index;
                Option.className = "PhoneDialCodeDropdownOption";
                OptionImage.id = "PhoneDialCodeDropdownOptionImage_" + Index;
                OptionImage.className = "PhoneDialCodeDropdownOptionImage";

                OptionImage.src = Element.flag_4x3;
                OptionImage.alt = Element.name;
                Option.innerHTML = Element.dial_code;

                /*--- Option Styles ---*/
                Option.style.fontSize = "large";
                Option.style.padding = "10px";
                Option.style.color = white;
                Option.style.background = Input.value === Element.dial_code ? gray_40 : "none";
                Option.style.border = `1px solid ${white}`
                Option.style.borderRadius = "10px";
                Option.style.display = "flex";
                Option.style.flexDirection = "row-reverse"
                Option.style.justifyContent = "center";
                Option.style.alignItems = "center";
                Option.style.cursor = "pointer";

                /*--- OptionImage Styles ---*/
                OptionImage.style.height = "21px";
                OptionImage.style.width = "auto";
                OptionImage.style.padding = "0 10px";

                /********************* Append Child *********************/
                /*--- Append OptionImage to Option ---*/
                Option.appendChild(OptionImage);

                /*--- Append Option to OptionsContainer ---*/
                OptionsContainer.appendChild(Option);

                /*--- Option Click Event Listener ---*/
                Option.addEventListener("click", () => {
                    SetPhoneDialCodeInputValue(Input, Element.dial_code, Element.flag_4x3);

                    /*--- Clear styles for all options ---*/
                    const AllOptions = OptionsContainer.querySelectorAll(".PhoneDialCodeDropdownOption");
                    AllOptions.forEach(option => {
                        option.style.background = "none";
                    });

                    /*--- Set styles for selected option ---*/
                    Option.style.background = gray_40;

                    /*--- Center the selected option in the OptionsContainer ---*/
                    const OptionRect = Option.getBoundingClientRect();
                    const ContainerRect = OptionsContainer.getBoundingClientRect();

                    /*--- Calculate the scroll position ---*/
                    const ScrollTop = OptionRect.top - ContainerRect.top + OptionsContainer.scrollTop - (OptionsContainer.clientHeight / 2) + (OptionRect.height / 2);
                    OptionsContainer.scrollTo({
                        top: ScrollTop,
                        behavior: "smooth"
                    });
                });
            }
        });
    }

    /*--- Render all options initially ---*/
    RenderOptions(OptionsData);

    /*--- Add keyboard event listener for filtering ---*/
    Input.addEventListener("keydown", (Event) => {
        /*--- Get the pressed key ---*/
        const Query = Event.key.toLowerCase();

        /*--- Only allow alphanumeric characters for filtering ---*/
        if (!/^[a-z0-9]$/i.test(Query)) {
            return;
        }

        /*--- Filter the options based on the pressed key ---*/
        const FilteredOptions = OptionsData.filter((Element) => {
            return (Element.dial_code !== null && Element.dial_code[1] === Query) || Element.name[0].toLowerCase() === Query;
        });

        /*--- Render filtered options ---*/
        RenderOptions(FilteredOptions);

        /*--- If any option matches, bring the first one to the center ---*/
        if (FilteredOptions.length > 0) {
            const FirstOption = OptionsContainer.firstChild;
            const FirstOptionRect = FirstOption.getBoundingClientRect();
            const ContainerRect = OptionsContainer.getBoundingClientRect();

            /*--- Calculate the scroll position to center the first option ---*/
            const ScrollTop = FirstOptionRect.top - ContainerRect.top + OptionsContainer.scrollTop - (OptionsContainer.clientHeight / 2) + (FirstOptionRect.height / 2);
            OptionsContainer.scrollTo({
                top: ScrollTop,
                behavior: "smooth"
            });
        }
    });
}

/********************************************************************** 
 * Function to Create Phone Number Input
 **********************************************************************/
const CreatePhoneNumberInput = () => {
    const Container = document.createElement("div");
    const Label = document.createElement("label");
    const LabelMandatoryMark = document.createElement("span");
    const Input = document.createElement("input");

    /********************* Container *********************/
    Container.id = "PhoneNumberInputContainer";

    /*--- Styles ---*/
    Container.style.height = "auto";
    Container.style.width = "calc(75% - 10px)";
    Container.style.minWidth = "159px";
    Container.style.display = "flex";
    Container.style.flexDirection = "column";
    Container.style.alignItems = "start";
    Container.style.justifyContent = "center";

    /********************* Label & Label Mandatory Mark *********************/
    Label.id = "PhoneNumberInputLabel";
    Label.innerHTML = "Phone";
    Label.htmlFor = "PhoneNumberInput";
    LabelMandatoryMark.innerHTML = "*";

    /*--- Label Styles ---*/
    Label.style.color = white;
    Label.style.fontFamily = font_family_content;
    Label.style.fontSize = "large";
    Label.style.padding = "10px 20px";

    /*--- Label Mandatory Mark Styles ---*/
    LabelMandatoryMark.style.color = dark_red;
    LabelMandatoryMark.style.padding = "0 5px";

    /********************* Input *********************/
    Input.type = "number";
    Input.id = "PhoneNumberInput";
    Input.name = "Phone";
    Input.placeholder = "Your phone number";

    /*--- Styles ---*/
    Input.style.height = "auto";
    Input.style.width = "100%";
    Input.style.minWidth = "159px";
    Input.style.fontSize = "large";
    Input.style.color = white;
    Input.style.backgroundColor = dark_gray;
    Input.style.fontFamily = font_family_content;
    Input.style.outline = "none";
    Input.style.border = "none";
    Input.style.borderRadius = "10px";
    Input.style.padding = "10px 20px";

    /********************* Append Child *********************/
    /*--- Append Label Mandatory Mark to Label ---*/
    Label.appendChild(LabelMandatoryMark);

    /*--- Append Label to Container ---*/
    Container.appendChild(Label);

    /*--- Append Input to Container ---*/
    Container.appendChild(Input);

    /********************* Return Container *********************/
    return Container;
}

/********************************************************************** 
 * Function to Initialize Phone Input Section
 **********************************************************************/
const InitializePhoneInputSection = async () => {
    PhoneInputSection.appendChild(CreatePhoneDialCodeDropdown());
    PhoneInputSection.appendChild(CreatePhoneNumberInput());
    await PhoneDialCodeDropdownOption();
};

InitializePhoneInputSection();