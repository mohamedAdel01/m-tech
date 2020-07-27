import { required, decimal, minLength, maxLength, sameAs, email } from "vuelidate/lib/validators";

const companyNameValidation = {
    form: {
        slug: {
            required,
            minLength: minLength(4)
        }
    }
}

const loginValidation = {
    form: {
        "email-mobile": {
            required
        },
        password: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(16)
        }
    }
}

const meetingInfoValidation = {
    title: {
        required
    },
    number: {
        required
    },
    committee: {
        required
    },
    location: {
        required
    },
    brief: {
        required
    }
}

const registerValidation = {
    form: {
        account_ar: {
            required
        },
        account_en: {
            required
        },
        slug: {
            required
        },
        name_ar: {
            required
        },
        name_en: {
            required
        },
        title_ar: {
            required
        },
        title_en: {
            required
        },
        nationality_id: {
            required
        },
        mobile: {
            required,
            decimal,
            minLength: minLength(4)
        },
        email: {
            required,
            email,
            minLength: minLength(4)
        },
        password: {
            required,
            maxLength: maxLength(16),
            minLength: minLength(4)
        },
        password_confirmation: {
            required,
            maxLength: maxLength(16),
            minLength: minLength(4),
            sameAsPassword: sameAs("password")
        }
    }
}

const forgetPasswordValidation = {
    form: {
        email: {
            required
        }
    }
}

const activeAccountValidation = {
    form: {
        code: {
            required
        }
    }
}

const addUserValidation = {
    form: {
        email: {
            required,
            email,
            minLength: minLength(6)
        },
        mobile: {
            required,
            minLength: minLength(8)
        },
        name_ar: {
            required
        },
        name_en: {
            required
        },
        title_ar: {
            required
        },
        title_en: {
            required
        },
        nationality_id: {
            required
        },
        birthDate: {},
        role_id: {
            required
        },

    }
}

const personalInfoValidation = {
    form: {
        title_en: {
            required
        },
        title_ar: {
            required
        },
        name_en: {
            required
        },
        name_ar: {
            required
        },
        email: {
            required,
            email,
            minLength: minLength(4)
        },
        mobile: {
            required,
            minLength: minLength(4)
        },
        preferedLang: {
            // required
        },
        birthDate: {},
        nationality_id: {
            required
        },
        role_id: {
            required
        },
    }
}

const boardInfoValidation = {
    name_ar: {
        required
    },
    name_en: {
        required
    }
}

const boardAuthoritiesValidation = {

}

const addAboardUserValidations = {
    form:{
        title: {
            required
        },
        name: {
            required
        },
        email: {
            required
        },
        mobile: {
            required
        }
    }

}

const addMemberValidation = {
    form: {
        member: {
            required
        },
        position: {
            required
        },
        membership: {
            required
        }
    }
}

export {
    companyNameValidation,
    loginValidation,
    registerValidation,
    activeAccountValidation,
    forgetPasswordValidation,
    addUserValidation,
    personalInfoValidation,
    meetingInfoValidation,
    boardInfoValidation,
    addMemberValidation,
    boardAuthoritiesValidation,
    addAboardUserValidations
}