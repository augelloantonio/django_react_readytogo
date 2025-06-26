import { Link } from "react-router-dom";

/**
 * #########################################################
 * 
 * Component that manages in-app navigation
 * 
 */
export default class Navigator {
  private NAVIGATOR_ID = 'Navigator';
  private static instance: Navigator;
  private navigatorObject: any;

  /**
   * ----------------------------------------------------------
   * 
   */
  private constructor() {
    this.navigatorObject = <Link id={this.NAVIGATOR_ID} to="/" hidden={true} />;
  }

  /**
   * ----------------------------------------------------------
   * @returns instance of Navigator
   */
  static getInstance() {
    Navigator.instance = Navigator.instance || new Navigator();
    return Navigator.instance;
  }

  /**
   * ----------------------------------------------------------
   * @returns navigator object
   */
  public getNavigatorObj(): any {
    return this.navigatorObject;
  }

  /**
   * ----------------------------------------------------------
   * Sets the URL for navigation
   * @param url 
   */
  public setUrlTo(url: string) {
    this.navigatorObject = <Link id="Navigator" to={url} hidden={true} />;
  }

  /**
   * ----------------------------------------------------------
   * Performs navigation
   */
  public navigate() {
    var nav = document.getElementById("Navigator");
    if (nav) {
      nav?.click();
    }
  }
}
