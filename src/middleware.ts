// src/middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define las rutas que estarán protegidas y requerirán inicio de sesión
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/alumno(.*)',
  '/maestro(.*)',
  '/padre(.*)',
  '/lista(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Si la ruta está protegida, asegúrate de que el usuario haya iniciado sesión
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};