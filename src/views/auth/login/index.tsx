import {LoginForm} from '@features/auth/login/ui/login-form';
import Link from 'next/link';

export const LoginPage = () => {
  return (
    <section className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-80 flex flex-col justify-center space-y-6 ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
