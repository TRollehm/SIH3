import React, { createContext, useContext, useState } from 'react';

export interface User {
  name: string;
  email: string;
  organization?: string;
  role?: string;
}

interface RegisteredAccount {
  name: string;
  email: string;
  password: string;
  organization: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; organization: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: { name?: string; organization?: string; role?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dr_standards_auth_user';
const REGISTERED_USERS_KEY = 'dr_standards_registered_users';

/**
 * Generates user initials canonically from Full Name:
 * - Two-word name: first letter of first name + first letter of last name
 * - Three or more words: first letter of first name + first letter of last name
 * - Single-word name: first two letters of the word
 * - Ignores extra spaces
 */
export function getInitials(name?: string | null): string {
  if (!name) return 'DS';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DS';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function getRegisteredUsers(): RegisteredAccount[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (raw) return JSON.parse(raw) as RegisteredAccount[];
  } catch {
    // Ignore parse errors
  }
  return [];
}

function saveRegisteredUsers(users: RegisteredAccount[]) {
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage errors
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string, rememberMe: boolean = true) => {
    // Simulate brief network authentication
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Validate against registered accounts
    const registeredUsers = getRegisteredUsers();
    const matchedAccount = registeredUsers.find(
      (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password
    );

    if (!matchedAccount) {
      return { success: false, error: 'No account found with these credentials. Please register first or check your email and password.' };
    }

    const loggedInUser: User = {
      name: matchedAccount.name,
      email: matchedAccount.email,
      organization: matchedAccount.organization,
      role: matchedAccount.role || 'Procurement Officer'
    };

    setUser(loggedInUser);
    try {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      }
    } catch {
      // Ignore storage errors
    }

    return { success: true };
  };

  const register = async (data: { name: string; organization: string; email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Check if email already registered
    const registeredUsers = getRegisteredUsers();
    const existing = registeredUsers.find(
      (account) => account.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    }

    // Persist the new account to the registered users store
    const newAccount: RegisteredAccount = {
      name: data.name,
      email: data.email,
      password: data.password,
      organization: data.organization,
      role: 'Procurement Officer'
    };
    registeredUsers.push(newAccount);
    saveRegisteredUsers(registeredUsers);

    const newUser: User = {
      name: data.name,
      email: data.email,
      organization: data.organization,
      role: 'Procurement Officer'
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage errors
    }

    return { success: true };
  };

  const updateProfile = async (data: { name?: string; organization?: string; role?: string }) => {
    if (!user) {
      return { success: false, error: 'No authenticated user to update' };
    }

    const updatedUser: User = {
      ...user,
      ...(data.name?.trim() ? { name: data.name.trim() } : {}),
      ...(data.organization !== undefined ? { organization: data.organization.trim() } : {}),
      ...(data.role !== undefined ? { role: data.role.trim() } : {}),
    };

    setUser(updatedUser);

    // Update current session storage
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } else if (sessionStorage.getItem(STORAGE_KEY)) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      }
    } catch {
      // Ignore storage errors
    }

    // Update registered account if exists
    try {
      const registeredUsers = getRegisteredUsers();
      const index = registeredUsers.findIndex(
        (acc) => acc.email.toLowerCase() === user.email.toLowerCase()
      );
      if (index !== -1) {
        registeredUsers[index] = {
          ...registeredUsers[index],
          name: updatedUser.name,
          organization: updatedUser.organization || '',
          role: updatedUser.role,
        };
        saveRegisteredUsers(registeredUsers);
      }
    } catch {
      // Ignore storage errors
    }

    return { success: true };
  };

  const deleteAccount = async () => {
    if (!user) {
      return { success: false, error: 'No authenticated user to delete' };
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      // 1. Permanently remove the account credentials and profile from registered store
      const registeredUsers = getRegisteredUsers();
      const updatedList = registeredUsers.filter(
        (acc) => acc.email.toLowerCase() !== user.email.toLowerCase()
      );
      saveRegisteredUsers(updatedList);

      // 2. Clear any user-associated application items or cached tokens
      try {
        const userPrefix = `dr_standards_data_${user.email.toLowerCase()}`;
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(userPrefix)) {
            localStorage.removeItem(key);
          }
        });
      } catch {
        // Ignore cache cleanup errors
      }

      // 3. Invalidate active session completely
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);

      // 4. Reset authentication state
      setUser(null);

      return { success: true };
    } catch (err) {
      return { success: false, error: 'An error occurred while deleting your account. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, updateProfile, deleteAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

