
import { AgriComponent, AgriScheme, UserProfile, UserRole } from '../types';
import { AGRI_COMPONENTS, AGRI_SCHEMES } from '../data/agriData';

const COMPONENT_KEY = 'agriastra_components';
const SCHEME_KEY = 'agriastra_schemes';
const BOOKMARK_KEY = 'agriastra_bookmarks';
const USER_LIST_KEY = 'agriastra_users';
const SESSION_KEY = 'agriastra_session';

export class AgriStore {
  /**
   * Initializes the registry with default data if empty.
   * Guaranteed to run once on App boot.
   */
  static init() {
    if (!localStorage.getItem(COMPONENT_KEY)) {
      localStorage.setItem(COMPONENT_KEY, JSON.stringify(AGRI_COMPONENTS));
    }
    if (!localStorage.getItem(SCHEME_KEY)) {
      localStorage.setItem(SCHEME_KEY, JSON.stringify(AGRI_SCHEMES));
    }
  }

  static registerUser(name: string, mobile: string, role: UserRole = UserRole.FARMER): { success: boolean; message: string; user?: UserProfile } {
    const users: UserProfile[] = JSON.parse(localStorage.getItem(USER_LIST_KEY) || '[]');
    
    if (!name || name.trim().length < 2) return { success: false, message: "Valid name is required" };
    if (!/^\d{10}$/.test(mobile)) return { success: false, message: "Valid 10-digit mobile is required" };

    const existingUser = users.find(u => u.phone === mobile);
    if (existingUser) return { success: false, message: "Mobile number already registered. Try logging in." };

    const newUser: UserProfile = {
      id: `USR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      username: mobile,
      email: '',
      phone: mobile,
      role: role,
      dateOfBirth: '',
      gender: '',
      address: { street: '', city: '', state: 'Uttar Pradesh', postalCode: '', country: 'India' },
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
    this.setSession(newUser);

    return { success: true, message: "Registration successful", user: newUser };
  }

  static getSession(): UserProfile | null {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  static setSession(user: UserProfile) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    // Also update the master user list to keep data in sync
    const users: UserProfile[] = JSON.parse(localStorage.getItem(USER_LIST_KEY) || '[]');
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) {
      users[index] = user;
      localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
    }
  }

  static clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  static login(mobile: string): { success: boolean; user?: UserProfile } {
    const users: UserProfile[] = JSON.parse(localStorage.getItem(USER_LIST_KEY) || '[]');
    const user = users.find(u => u.phone === mobile);
    if (user) {
      this.setSession(user);
      return { success: true, user };
    }
    return { success: false };
  }

  static getComponents(): AgriComponent[] {
    this.init();
    return JSON.parse(localStorage.getItem(COMPONENT_KEY) || '[]');
  }

  static getComponentById(id: string): AgriComponent | undefined {
    return this.getComponents().find(c => c.id === id);
  }

  static deleteComponent(id: string) {
    const components = this.getComponents().filter(c => c.id !== id);
    localStorage.setItem(COMPONENT_KEY, JSON.stringify(components));
  }

  static getSchemes(): AgriScheme[] {
    this.init();
    return JSON.parse(localStorage.getItem(SCHEME_KEY) || '[]');
  }

  static getSchemeById(id: string): AgriScheme | undefined {
    return this.getSchemes().find(s => s.id === id);
  }

  static deleteScheme(id: string) {
    const schemes = this.getSchemes().filter(s => s.id !== id);
    localStorage.setItem(SCHEME_KEY, JSON.stringify(schemes));
  }

  static toggleBookmark(id: string) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(id);
    if (index > -1) bookmarks.splice(index, 1);
    else bookmarks.push(id);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    return bookmarks;
  }

  static getBookmarks(): string[] {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
  }
}
