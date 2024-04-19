import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
}

const SECRET_KEY = process.env.SECRET_KEY || "testbg";
export default async function middleware(request: NextRequest) {
  console.log("process.env.SECRET_KEY", SECRET_KEY)
  console.log("middle")
  const { cookies } = request;
  const token = cookies.get("token");
  console.log(token)
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(SECRET_KEY)
  );
  
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown>;
  console.log("check token", token)
  if (!token) {
    console.log("no cookie token")
    if (
      request.nextUrl.pathname.startsWith("/books/list") ||
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
    }
    console.log("delete")
    response.cookies.delete("email");
    response.cookies.delete("role");
    return response;
  }
  console.log('has cookie')

  try {
    const payload = await verify(token);
    console.log('payload', payload)
    if (payload.email) {
      response = NextResponse.next();
      //vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
      if (
        request.nextUrl.pathname.startsWith("/admin") &&
        payload.role !== "ADMIN"
      ) {
        response = NextResponse.redirect(new URL("/400", request.url));
        console.log('not ADMIN')
      }

      response.cookies.set("email", payload.email);
      if(!payload.role) {
        response.cookies.set("role", 'USER');
      }
      else {
        response.cookies.set("role", payload.role);
      }

      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.log('%c⧭', 'color: #e50000', err);
    console.log("ERROR");
    if (request.nextUrl.pathname.startsWith("/auth/login")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    }
    response.cookies.delete("token");//suppression du token s'il n'est pas valide (puisque l'on tombe dans le catch)

    return response;
  }
}

export const config = {
  matcher: "/:path*",
};