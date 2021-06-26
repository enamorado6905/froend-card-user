export class environment {
  public static get CONTACT_URL(): string {
    return 'http://192.168.43.141:4040/';
  }
  public static get CONTACT_PRODUCTION(): boolean {
    return true;
  }
  public static get useHash(): boolean {
    return true;
  }
}
