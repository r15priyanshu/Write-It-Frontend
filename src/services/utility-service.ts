export class UtilityService {
  public addItemInLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItemFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}

export default new UtilityService();
