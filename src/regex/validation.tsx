export const regexValidEmail = /^[a-zA-Z0-9_\.+-]+@[a-zA-Z-]+\.[a-zA-Z0-9-\.]+$/g;
export const regexSimplePassword = /\w*([pP][aA4][sS$5]*[wW][oO0eE3][rR][dD]|12345678)\w*/g;
export const regexValidPassword = /^(?=.*[A-Z])[a-zA-Z]+(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/g;
export const regexCharacterConformingPassword = /^[a-zA-Z0-9!@#\$%\^&\*\(\)\-\_\+\[\]\{\}\,\.\?<>]+$/g;
export const regexCharacterConformingUsername = /^[a-zA-Z0-9_]+$/g