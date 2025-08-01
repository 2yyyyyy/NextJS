import { RedirectToast } from "@/components/redirect-toast";

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      {children}
      <RedirectToast />
    </>
  );
}
