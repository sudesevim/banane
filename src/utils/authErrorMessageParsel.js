export default function(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Geçersiz e-posta adresi';
        case 'auth/email-already-exist':
            return 'Kullanıcı kayıtlı';
        case 'auth/user-not-found':
            return 'Kullanıcı bulunamadı';
        case 'auth/weak-password':
            return 'Şifre zayıf';
        case 'auth/invalid-password':
            return 'Geçersiz şifre'
        default:
            return errorCode;
    }
}