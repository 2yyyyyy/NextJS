import { CardCompact } from "@/components/card-compact";
import { PasswordForgotForm } from "@/features/password/components/password-forgot-form";

const ForgetPasswordPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Forget Password"
        description="Enter your email to reset your password"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<PasswordForgotForm />}
      />
    </div>
  );
};

export default ForgetPasswordPage;
