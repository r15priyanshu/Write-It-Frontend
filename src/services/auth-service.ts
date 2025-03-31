import { AxiosResponse } from "axios";
import { GlobalConstants } from "../constants/global-constants";
import { LoginRequestType, UserType } from "../helpers/custom-interfaces";
import { RegisterFormType } from "../pages/Register";
import UtilityService from "./utility-service";
import { myaxios } from "../helpers/helper";

export class LoginAndRegisterService {
  public registerUser(
    userdata: RegisterFormType
  ): Promise<AxiosResponse<UserType>> {
    return myaxios.post<UserType>(GlobalConstants.REGISTER_URL, userdata);
  }

  public performLogin(
    loginRequest: LoginRequestType
  ): Promise<AxiosResponse<UserType>> {
    return myaxios.post<UserType>(GlobalConstants.LOGIN_URL, loginRequest);
  }

  public performOperationsOnLogin(token: string, user: UserType) {
    this.saveToken(token);
    this.saveUserDetails(user);
  }

  private saveToken(token: string) {
    UtilityService.addItemInLocalStorage(
      GlobalConstants.JWT_TOKEN_KEY_FOR_LOCAL_STORAGE,
      token
    );
  }

  public getToken(): string | null {
    const token = UtilityService.getItemFromLocalStorage(
      GlobalConstants.JWT_TOKEN_KEY_FOR_LOCAL_STORAGE
    );
    return token;
  }

  private saveUserDetails(user: UserType): boolean {
    UtilityService.addItemInLocalStorage(
      GlobalConstants.USER_DETAILS_KEY_FOR_LOCAL_STORAGE,
      JSON.stringify(user)
    );
    return true;
  }

  public getLoggedInUserDetails(): UserType | null {
    const details = UtilityService.getItemFromLocalStorage(
      GlobalConstants.USER_DETAILS_KEY_FOR_LOCAL_STORAGE
    );
    return details === null ? null : JSON.parse(details);
  }

  public isUserLoggedIn(): boolean {
    const token = this.getToken();
    const userDetails = this.getLoggedInUserDetails();
    return token && userDetails ? true : false;
  }
}

export default new LoginAndRegisterService();
