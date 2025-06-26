import { Public } from "@mui/icons-material";
import EventEmitter from "eventemitter3";
import { AppState } from "./AppState";

class ApiEvents extends EventEmitter {}

export type QueryParam = { [key: string]: any };
export type HeaderParam = { [key: string]: any };

/**
 * ---------------------------------------------------------------------------
 * Type that defines the object returned by the API calls to the backend
 */
export type HttpResultType = {
  result: "ok" | "ko";
  error?: any | undefined;
  data?: any | undefined;
  currentPage?: number | undefined;
  totalPages?: number | undefined;
};

/**
 * Class that handles the API service towards the backend
 */
export class ApiService {
  private static HOST: string = process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : "http://localhost:8000";
  public static API_ENDPOINT = ApiService.HOST + "/api";

  // Singleton class
  private static instance: ApiService;
  private token: string | null = null;
  private CSRFToken: string | null = null;
  private eventEmitter = new ApiEvents();
  private logout: any | null;

  private constructor() {}

  /**
   * Returns the instance of the ApiService class
   * @returns
   */
  static getInstance(): ApiService {
    ApiService.instance = ApiService.instance || new ApiService();
    return ApiService.instance;
  }

  /**
   * Sets the listener for automatic logout
   * @param {*} logout
   */
  public setListenerLogout(logout: any): void {
    if (logout != null) {
      this.logout = logout;

      var listenerLogout = () => {
        if (this.logout != null) {
          this.logout();
        }
      };

      this.eventEmitter.addListener("auth-error", listenerLogout);
    }
  }

  /**
   * Base method for all API calls
   * @param url
   * @param method
   * @param queryParams
   * @param body
   * @param headers overrides the default headers
   * @returns
   */
  public baseFetch(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    queryParams: QueryParam | null = null,
    body: any = null,
    headers: HeaderParam | null = null
  ): Promise<HttpResultType> {
    return new Promise((resolve: any, reject: any) => {
      if (queryParams !== null) {
        url += this.getQueryParameter(queryParams);
      }

      // Process the body
      var bodyComposed: any = null;

      if (
        (method === "POST" || method === "PUT" || method === "DELETE") &&
        body !== null
      ) {
        if (body instanceof FormData) {
          bodyComposed = body;
        } else {
          bodyComposed = JSON.stringify(body);
        }
      }

      fetch(url, {
        method: method,
        headers: headers ? this.getHeaders(headers) : this.getHeaders(),
        mode: "cors",
        body: bodyComposed,
        credentials: "include"
      })
        .then((response: Response) => {
          switch (response.status) {
            case 401:
              // Call the automatic logout only if we are not performing a login
              if (url != null && !url.toLowerCase().endsWith("/login")) {
                this.eventEmitter.emit("auth-error");
              }

              if (!this.logout) reject({ message: "Auth Error", ...response });
              else resolve(response);

              return null;

            default:
              return response.json();
          }
        })
        .then((response: HttpResultType) => {
          if (response.result === "ko") {
            reject(response);
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject({ message: "Error on baseFetch at url: " + url, ...error });
        });
    });
  }

  /**
   * Returns the query string from the queryParams object
   * @param queryParams
   * @returns
   */
  private getQueryParameter(queryParams: QueryParam): string {
    var queryString: string = "";

    // Process the query parameters
    if (queryParams !== null) {
      let paramName: keyof typeof queryParams;

      for (paramName in queryParams) {
        if (queryString.length <= 0) {
          queryString += "?" + paramName + "=" + queryParams[paramName];
        } else {
          queryString += "&" + paramName + "=" + queryParams[paramName];
        }
      }
    }

    return queryString;
  }

  /**
   * Returns the headers object with the Content-Type and Authorization headers
   * @param options
   * @returns
   */
  private getHeaders(
    options: HeaderParam = { "Content-Type": "application/json" }
  ): HeaderParam {
    let headers: HeaderParam = {};

    if (options["Content-Type"]) {
      headers["Content-Type"] = options["Content-Type"];
    }

    const csrf_token = this.getCSRFToken();

    if (options["Content-Type"]) {
      headers["X-CSRFToken"] = csrf_token;
    }

    const token = this.getToken();

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
    return headers;
  }

  /**
   * Sets the CSRF token
   * @param CSRFToken
   */
  public setToken(CSRFToken: string): void {
    this.CSRFToken = CSRFToken;
  }

  /**
   * Sets the JWT token
   * @param token
   */
  public setCSRFToken(token: string): void {
    this.token = token;
  }

  /**
   * Clears the JWT token
   */
  public clearToken(): void {
    this.token = null;
  }

  /**
   * Returns the JWT token
   */
  public getToken(): string | null {
    this.token = AppState.getInstance().getJwtToken();
    return this.token;
  }

  /**
   * Returns the CSRF token
   */
  public getCSRFToken(): string | null {
    this.CSRFToken = AppState.getInstance().getCSRFToken();
    return this.CSRFToken;
  }
}
