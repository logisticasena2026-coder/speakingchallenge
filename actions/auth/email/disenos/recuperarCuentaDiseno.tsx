import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface RecuperarCuentaEmailProps {
  resetLink: string;
  nombreUsuario?: string;
}

const colors = {
  surface0: '#07090f',
  surface2: '#121620',
  surface3: '#181d2a',
  textPrimary: '#f0ede8',
  textSecondary: '#9ca3a0',
  textMuted: '#5a6270',
  borderSubtle: 'rgba(255,255,255,0.06)',
  borderDefault: 'rgba(255,255,255,0.10)',
  brandGreen: '#3dd68c',
  brandGreenHover: 'rgba(61,214,140,0.45)',
  brandAmber: '#f5a623',
};

export const RecuperarCuentaEmailDiseno = ({ resetLink, nombreUsuario }: RecuperarCuentaEmailProps) => (
  <Html>
    <Head>
      {/* Google Fonts via CDN - required for email templates since next/font doesn't work in email clients */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Grotesk:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Preview>Restablece tu contraseña - speakingchallenge</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <div style={logoContainer}>
            <Img
              src="https://www.speakingchallenge.online/FoundPage.webp"
              width="48"
              height="48"
              alt="speakingchallenge Logo"
              style={logo}
            />
          </div>
          <Text style={headerTitle}>speakingchallenge</Text>
          <Text style={headerSubtitle}>Speaking Challenge Online</Text>
        </Section>

        <Section style={cardSection}>
          <div style={badgeContainer}>
            <span style={badgeWarning}>Solicitud de Restablecimiento</span>
          </div>

          <Heading style={h1}>{nombreUsuario ? `${nombreUsuario}` : 'Viajero del Tiempo'}</Heading>

          <Text style={textGreeting}>
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en{' '}
            <strong style={{ color: colors.brandGreen }}>speakingchallenge</strong>.
          </Text>

          <Text style={textBody}>
            Si fuiste tú quien solicitó este cambio, haz clic en el botón de abajo para crear una
            nueva contraseña.
          </Text>

          <div style={buttonWrapper}>
            <Button style={button} href={resetLink}>
              Reestablecer contraseña
            </Button>
          </div>

          <Section style={dividerLine} />

          <Text style={textSmall}>
            Si el botón no funciona, copia y pega este enlace en tu navegador:
          </Text>
          <Text style={linkText}>{resetLink}</Text>
        </Section>

        <Section style={footerSection}>
          <div style={warningBox}>
            <Text style={warningIcon}>⚠️</Text>
            <Text style={warningText}>
              Este enlace expira en <strong style={{ color: colors.brandAmber }}>1 hora</strong>
            </Text>
          </div>

          <Text style={footerNote}>
            Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo. Tu
            contraseña actual seguirá siendo la misma.
          </Text>

          <Section style={{ borderTop: `1px solid ${colors.borderSubtle}`, margin: '20px 0' }} />

          <Text style={footerBrand}>PLAYLENGUAGE</Text>
          <Text style={footerCopyright}>
            © 2024 Speaking Challenge Online. Todos los derechos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: colors.surface0,
  fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: '40px 20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

const headerSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logoContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
};

const logo = {
  height: '48px',
  width: '48px',
  borderRadius: '8px',
};

const headerTitle = {
  fontFamily: "'Cinzel', Georgia, serif",
  color: colors.textPrimary,
  fontSize: '28px',
  fontWeight: '700',
  margin: 0,
  letterSpacing: '0.05em',
};

const headerSubtitle = {
  fontFamily: "'Inter', sans-serif",
  color: colors.textMuted,
  fontSize: '12px',
  fontWeight: '500',
  margin: '8px 0 0 0',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
};

const cardSection = {
  backgroundColor: colors.surface2,
  borderRadius: '16px',
  padding: '40px 32px',
  border: `1px solid ${colors.borderDefault}`,
  boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,214,140,0.06)',
};

const badgeContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
};

const badgeWarning: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: colors.brandAmber,
  backgroundColor: 'rgba(245,166,35,0.15)',
  border: '1px solid rgba(245,166,35,0.3)',
  padding: '4px 12px',
  borderRadius: '4px',
};

const h1 = {
  fontFamily: "'Cinzel', Georgia, serif",
  color: colors.textPrimary,
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '20px',
  textAlign: 'center' as const,
  lineHeight: '1.2',
};

const textGreeting = {
  color: colors.textSecondary,
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '16px',
};

const textBody = {
  color: colors.textSecondary,
  fontSize: '15px',
  lineHeight: '1.7',
  marginBottom: '32px',
};

const buttonWrapper = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const button: React.CSSProperties = {
  backgroundColor: colors.brandGreen,
  color: colors.surface0,
  fontFamily: "'Inter', sans-serif",
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  padding: '16px 36px',
  borderRadius: '8px',
  display: 'inline-block',
  boxShadow: '0 4px 16px rgba(61,214,140,0.35)',
  border: 'none',
  cursor: 'pointer',
};

const dividerLine: React.CSSProperties = {
  borderBottom: `1px solid ${colors.borderSubtle}`,
  marginBottom: '24px',
};

const textSmall = {
  color: colors.textMuted,
  fontSize: '12px',
  marginBottom: '8px',
  fontFamily: "'Inter', sans-serif",
};

const linkText = {
  color: colors.textSecondary,
  fontSize: '11px',
  wordBreak: 'break-all' as const,
  textDecoration: 'none',
  display: 'block',
  padding: '12px 16px',
  backgroundColor: colors.surface3,
  borderRadius: '6px',
  marginTop: '8px',
  border: `1px solid ${colors.borderSubtle}`,
  fontFamily: 'monospace',
};

const footerSection = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const warningBox: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: colors.surface3,
  borderRadius: '8px',
  padding: '12px 20px',
  marginBottom: '16px',
  border: `1px solid ${colors.borderSubtle}`,
};

const warningIcon = {
  fontSize: '14px',
  margin: 0,
};

const warningText = {
  color: colors.textSecondary,
  fontSize: '14px',
  margin: 0,
  fontFamily: "'Inter', sans-serif",
};

const footerNote = {
  color: colors.textMuted,
  fontSize: '13px',
  marginBottom: '20px',
  lineHeight: '1.5',
};

const footerBrand = {
  fontFamily: "'Cinzel', Georgia, serif",
  color: colors.textPrimary,
  fontSize: '16px',
  fontWeight: '600',
  letterSpacing: '0.1em',
  margin: '0 0 8px 0',
};

const footerCopyright = {
  color: colors.textMuted,
  fontSize: '11px',
  fontFamily: "'Inter', sans-serif",
  margin: 0,
};
