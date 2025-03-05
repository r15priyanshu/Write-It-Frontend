import { AxiosResponse } from "axios";
import { SIGNUP_URL } from "../constants/global-constants";
import { UserType } from "../helpers/custom-interfaces";
import { myaxios } from "../helpers/helper";
import { RegisterFormType } from "../pages/Register";

class UserService {
  registerUser(userdata: RegisterFormType): Promise<AxiosResponse<UserType>> {
    return myaxios.post<UserType>(SIGNUP_URL, userdata);
  }
}

export default new UserService();
