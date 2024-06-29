import { clerkMiddleware } from "@clerk/nextjs/server";
console.log("fawwad im running");
export default clerkMiddleware();
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
