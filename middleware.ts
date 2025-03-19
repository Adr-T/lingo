import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Définition des routes publiques
const isPublicRoute = createRouteMatcher(["/", "/api/webhooks/stripe"]);

export default clerkMiddleware((auth, req) => {
    if (isPublicRoute(req)) {
        return; // Autorise l'accès sans authentification
    }
    auth().protect(); // Protège les autres routes
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
