export const validate = (email,password) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
};
