/**
 * EmailVerificationPage - Página de verificación de email
 */

import { EmailVerification } from '../components/EmailVerification';

interface EmailVerificationPageProps {
  email: string;
  onVerified: () => void;
}

export function EmailVerificationPage({ email, onVerified }: EmailVerificationPageProps) {
  return (
    <EmailVerification
      email={email}
      onVerified={onVerified}
    />
  );
}
