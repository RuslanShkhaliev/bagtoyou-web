import {handleOtp} from '@features/auth/otp/api/action';
import {NextRequest} from 'next/server';

export async function GET(req: NextRequest) {
	return handleOtp(req);
}
