import {verifyOtp} from '@features/auth/otp/api/verify-otp';
import {type EmailOtpType} from '@supabase/supabase-js';
import {type NextRequest, NextResponse} from 'next/server';

export  const handleOtp = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
	  try {
		await verifyOtp({
			token_hash,
			type
		})
	  } catch (error) {
		  redirectTo.searchParams.delete("next");
		  return NextResponse.redirect(redirectTo);
	  }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
