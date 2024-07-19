import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

interface Payload {
	email: string;
	role: string;
}

const SECRET_KEY = process.env.SECRET_KEY;
export default async function middleware(request: NextRequest) {
	const { cookies } = request;
	const token = cookies.get('token');
	console.log("TEST", token);
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
	console.log("TOKEN", token);
	let response: NextResponse<unknown>;
	if (!token) {
		console.error('no cookie token');
		if (
			request.nextUrl.pathname.startsWith('/admin')
		) {
			response = NextResponse.redirect(new URL('/auth/login', request.url));
		} else {
			response = NextResponse.next();
		}
		response.cookies.delete('email');
		response.cookies.delete('role');
		return response;
	}

	try {
		const payload = await verify(token);
		if (payload.email) {
			response = NextResponse.next();
			//vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
			if (
				request.nextUrl.pathname.startsWith('/admin') &&
				payload.role !== 'ADMIN'
			) {
				response = NextResponse.redirect(new URL('/400', request.url));
				console.info('not ADMIN');
			}

			response.cookies.set('email', payload.email);
			if (!payload.role) {
				response.cookies.set('role', 'USER');
			} else {
				response.cookies.set('role', payload.role);
			}

			return response;
		}
		console.error("redirect response")
		return NextResponse.redirect(new URL('/auth/login', request.url));
	} catch (err) {
		console.error(err)
		if (request.nextUrl.pathname.startsWith('/auth/login')) {
			response = NextResponse.next();
		} else {
			response = NextResponse.redirect(new URL('/auth/login', request.url));
		}
		response.cookies.delete('token'); //suppression du token s'il n'est pas valide (puisque l'on tombe dans le catch)

		return response;
	}
}

export const config = {
	matcher: '/:path*',
};
