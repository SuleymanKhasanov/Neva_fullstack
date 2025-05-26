import Image from 'next/image';
import LogoLight from '@/shared/assets/Logo-light.svg';

type AppLogoProps = {
  locale: string;
  logoTranslation: string; // Добавляем проп для перевода
};

const AppLogo = ({ logoTranslation }: AppLogoProps) => {
  return <Image src={LogoLight} alt={logoTranslation} />;
};

export default AppLogo;
