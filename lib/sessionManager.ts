// sessionManager.ts
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export class SessionManager {
  private ssr: boolean;

  constructor(ssr: boolean = false) {
    this.ssr = ssr;
  }

  // Method to get the access token cookie
  getAccessToken(): string | null {
    if (this.ssr) {
      return cookies().get('LOCAL_AT')?.value || null;
    }

    return getCookie('LOCAL_AT') || null;
  }

  // Method to get the refresh token cookie
  getRefreshToken(): string | null {
    if (this.ssr) {
      return cookies().get('LOCAL_RT')?.value || null;
    }

    return getCookie('LOCAL_RT') || null;
  }

  async isSessionValid(): Promise<boolean> {
    // Check if access token and refresh token exist
    const at = this.getAccessToken();
    const rt = this.getRefreshToken();
    
    if (!at && !rt) {
      return false;
    }

    // If access token is expired but refresh token is not, refresh session
    if (rt && !at) {
      const res = await this.refreshSession();
      if (!res) {
        return false;
      }
    }

    return true;
  }

  // Example: Method to refresh session (can be used to trigger refresh logic)
  async refreshSession(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:8080/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log("Refresh session failed, status:", response.status);
        return false;
      }
  
      // Assuming the browser/server handles setting the new cookies automatically.
  
      return true;
    } catch (error) {
      console.error("Network error during session refresh:", error);
      return false;
    }
  }
}

export default SessionManager;