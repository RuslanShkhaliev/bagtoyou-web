import {createServerClient} from '@supabase/ssr';
import {type NextRequest, NextResponse} from 'next/server';

const nonAuthPath = ["/login", "/register", "/email-verify"];
const protectedRoutes = ["/profile"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
	  request,
  })

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
					response = NextResponse.next({
						request,
					})
					cookiesToSet.forEach(({ name, value }) => response.cookies.set(name, value))
				},
			},
		}
	)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && nonAuthPath.some((e) => request.nextUrl.pathname.startsWith(e)))
    return response;

  if (user && nonAuthPath.some((e) => request.nextUrl.pathname.startsWith(e)))
    return NextResponse.redirect(new URL("/", request.url));

  if (
    !user &&
    protectedRoutes.some((e) => request.nextUrl.pathname.startsWith(e))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
