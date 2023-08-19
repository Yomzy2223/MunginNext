import AuthLayout from "@/layout/AuthLayout";
import SignUpNew from "@/PagesComponents/AuthNew/signup";
import { useRouter } from "next/router";
import React from "react";

const SignUp = () => {
  const { query } = useRouter();
  const { user } = query;

  return (
    <AuthLayout>
      <SignUpNew />
    </AuthLayout>
  );
};

export default SignUp;
