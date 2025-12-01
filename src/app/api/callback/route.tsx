import {handleOtp} from '@features/auth/otp/action';
import {NextRequest} from 'next/server';

export async function GET(req: NextRequest) {
	return handleOtp(req);
}
