import useLogin, { type LoginReturnType } from './useLogin';
import useLogout, { type LogoutReturnType } from './useLogout';
import useSignup, { type SignUpReturnType } from './useSignup';

type AuthActions = 'login' | 'signup' | 'logout';

type AuthActionFunction<T extends AuthActions> = {
    login: () => LoginReturnType;
    logout: () => LogoutReturnType;
    signup: () => SignUpReturnType;
}[T];

type AuthReturnType<T extends AuthActions> = ReturnType<AuthActionFunction<T>>;

const useAuth = <T extends AuthActions>(action: T): AuthReturnType<T> =>
    ({
        login: useLogin() as AuthReturnType<T>,
        logout: useLogout() as AuthReturnType<T>,
        signup: useSignup() as AuthReturnType<T>,
    }[action]);

export default useAuth;
