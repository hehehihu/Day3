const validateEmailInput = (emailInput: string): string | null => {
    const email = emailInput.trim();
    const MAX_EMAIL_LENGTH = 256;
    const MIN_LOCAL_LENGTH = 4;
    const MAX_LOCAL_LENGTH = 64;

    if (!email) return 'Email is required';
    
    if (email.length > MAX_EMAIL_LENGTH) {
        return 'Email is too long';
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Email is invalid';
    }

    const localPart = email.split('@')[0];
    if (localPart.length < MIN_LOCAL_LENGTH || localPart.length > MAX_LOCAL_LENGTH) {
        return 'Local part of email is invalid';
    }

    return null;
}

export default validateEmailInput;