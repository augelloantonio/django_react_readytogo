import {ApiService} from "./ApiService";

/**
 * Class for managing slots APIs
 */
export default class AuthApiService {
  private static instance: AuthApiService;

  private constructor() {}

  /**
   * ----------------------------------------------------------
   * @returns
   */
  static getInstance(): AuthApiService {
    AuthApiService.instance = AuthApiService.instance || new AuthApiService();
    return AuthApiService.instance;
  }

  /**
   * Login user
   * @param requestBody
   */
  public async userLogin(requestBody: any): Promise<any> {
    return ApiService.getInstance().baseFetch(ApiService.API_ENDPOINT + "/auth/login", "POST", [], requestBody);
  }

  /**
   * Get CSRF token
   */
  public async setCsfrToken(): Promise<any> {
    return ApiService.getInstance().baseFetch(ApiService.API_ENDPOINT + "/auth/setCsrfToken", "GET");
  }
}
