const UserValidator = {
     username:{
        notEmpty:{errorMessage:"Username should not be empty"},
        custom:{
        options:value=>!/@/.test(value),
        errorMessage:"Username must not contain any email styled characters"
        },custom:{
        options:value=>!/\d/.test(value),
        errorMessage:"Username must not contain any numbers"
        }
     },
     password:{
        notEmpty:{errorMessage:"Password should not be empty"},
        isLength:{options:{min:6},
         errorMessage:"Password must more than 5 characters"
         
    },
        custom:{
            options:value=>!/\s/.test(value),
            errorMessage:"Password should not contain empty space"
        }
     }
    }

    export default UserValidator