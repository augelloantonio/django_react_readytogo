import { jwtDecode } from "jwt-decode";
import { ApiService } from "./ApiService";
import { UserDataModel } from "../models/UserDataModel";
import Navigator from "./Navigator";

export class AppState {
  private LOCAL_STORAGE_KEY_JWT: string = "jwtToken";
  private LOCAL_STORAGE_KEY_CSRF: string = "csrfToken";

  private static instance: AppState;
  private navigator: Navigator;

  private appState: {
    userData: UserDataModel | null;
    reRenderUiFunc: Function | null;
  };

  private constructor() {
    this.navigator = Navigator.getInstance();

    this.appState = {
      userData:  new UserDataModel(),
      reRenderUiFunc: null,
    };
  }

  static getInstance() {
    AppState.instance = AppState.instance || new AppState();
    return AppState.instance;
  }

  /**
   * ----------------------------------------------------------
   * Performs navigation inside the application
   * to the url passed as parameter
   *
   * @param url link to navigate to
   */
  public async navigateTo(url: string) {
    await this.navigator.setUrlTo(url);
    await this.reRenderUi();
    await this.navigator.navigate();
    await this.reRenderUi();
  }

  /**
   * Get navigator object instance
   * @returns navigator object
   */
  public getNavigatorObj(): any {
    return this.navigator.getNavigatorObj();
  }

  /**
   *
   * Save user JWT token data in local storage
   */
  public saveJwtToken(token: string | null) {
    if (token != null) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY_JWT, token);
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY_JWT);
    }
  }

  /**
   * Get the jwT token from local storage
   */
  public getJwtToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY_JWT);
  }

  /**
   *
   *  Save CSRF token data in local storage
   */
  public saveCSRFToken(token: string | null) {
    if (token != null) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY_CSRF, token);
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY_CSRF);
    }
  }

  /**
   *
   * Get CSRF token from local storage
   */
  public getCSRFToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY_CSRF);
  }

  /**
   *
   * Set user data in app state
   */
  public checkJWTValidation(): boolean {
    const token = this.getJwtToken();

    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      // setUserData
      const currentTime = Date.now() / 1000;
      const valid = decodedToken.exp > currentTime;

      this.setUserData(decodedToken.user);

      if (!valid) {
        this.logout();
      }

      return valid;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   *
   *  Check if user is logged in by checking if JWT token exists
   */
  public isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  /**
   * Logout user and reset app state
   */
  public logout(): void {
    this.clearStorageParameters();
  }

  /**
   * ----------------------------------------------------------
   *  Removed all storage parameters
   */
  public clearStorageParameters(): void {
    this.saveJwtToken(null);
    this.saveCSRFToken(null);
  }

  /**
   * Set user data in app state
   */
  public setUserData(userData: UserDataModel | null): void {
    this.appState.userData = userData;
  }

  /**
   * Get user data in app state
   */
  public getUserData(): UserDataModel | null {
    return this.appState.userData;
  }

  /**
   * -------------------------------------------------------
   * Imposta la funzione da richiamare per forzare il
   * il refresh del rendering dell'app
   */
  public setReRenderUiFunc(rerenderFunc: Function | null) {
    this.appState.reRenderUiFunc = rerenderFunc;
  }

  /**
   * -------------------------------------------------------
   *
   */
  public reRenderUi() {
    if (this.appState.reRenderUiFunc != null) {
      this.appState.reRenderUiFunc();
    }
  }

  /**
   *
   *   Load storage parameters
   *   This method is called at the start of the application
   */
  public loadStorageParameters(): void {

    var token = this.getJwtToken();

    if (token != null) {
      ApiService.getInstance().setToken(token);
    } else {
      this.clearStorageParameters();
    }
  }
}
