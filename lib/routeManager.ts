enum RouteKeys {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  LOGIN = 'LOGIN',
}

/**
 * Represents a route in the application.
 */
type Route = {
  path: string;
  isProtected: boolean;
};

/**
 * Manages routes and provides methods to retrieve and check routes.
 */
class RouteManager {
  private static instance: RouteManager;
  private routes: { [key: string]: Route };

  private constructor() {
    this.routes = {
      [RouteKeys.HOME]: { path: '/', isProtected: false },
      [RouteKeys.DASHBOARD]: { path: '/dashboard', isProtected: true },
      [RouteKeys.LOGIN]: { path: '/login', isProtected: false },
    };
  }

  /**
   * Gets the singleton instance of the RouteManager class.
   * If the instance does not exist, it creates a new one.
   * @returns The singleton instance of the RouteManager class.
   */
  static getInstance(): RouteManager {
    if (!RouteManager.instance) {
      RouteManager.instance = new RouteManager();
    }
    return RouteManager.instance;
  }

  /**
   * Retrieves a route based on the provided key.
   * @param key - The key of the route to retrieve.
   * @returns The route associated with the provided key, or undefined if not found.
   */
  getRoute(key: RouteKeys): Route  {
    return this.routes[key];
  }

  /**
   * Retrieves the path for a given route key.
   * @param key - The key of the route.
   * @returns The path of the route, or '/' if the route is not found.
   */
  getRoutePath(key: RouteKeys): string {
    const route = this.getRoute(key);
    return route ? route.path : '/';
  }

  /**
   * Retrieves the routes from the route manager.
   * @param protectedOnly - Optional parameter to filter routes based on protection status.
   * @returns An array of Route objects.
   */
  getRoutes(protectedOnly?: boolean): Route[] {
    return Object.values(this.routes).filter(route => protectedOnly === undefined || route.isProtected === protectedOnly);
  }

  /**
   * Checks if a route is protected.
   * @param key - The key of the route.
   * @returns True if the route is protected, false otherwise. Returns undefined if the route does not exist.
   */
  isRouteProtected(key: RouteKeys): boolean | undefined {
    const route = this.getRoute(key);
    return route ? route.isProtected : undefined;
  }
}

export const routeManager = RouteManager.getInstance();
export { RouteKeys };