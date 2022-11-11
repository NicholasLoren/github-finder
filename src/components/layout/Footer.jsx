const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer bg-gray-700 text-primary-content footer-center">
      <div>
        <p>Copyright &copy; {footerYear} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
