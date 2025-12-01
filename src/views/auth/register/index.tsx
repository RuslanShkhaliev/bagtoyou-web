import {RegisterForm} from '@features/auth/register';
import Link from 'next/link';

export const RegisterPage = () => {
  return (
    <section className="container flex h-screen flex-col items-center justify-center">


      <div className="mx-auto max-w-80 flex flex-col justify-center space-y-6 ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your email and password to create your account
          </p>
        </div>

        <RegisterForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
