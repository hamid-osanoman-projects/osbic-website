import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng); // persist language
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ar')}>AR</button>
      <button onClick={() => changeLanguage('fa')}>FA</button>
    </div>
  );
};

export default LanguageSwitcher;
