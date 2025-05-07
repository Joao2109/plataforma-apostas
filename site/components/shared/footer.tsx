const Footer = () => {
  return (
    <footer className="w-full h-20 border-t-2 border-border flex flex-col justify-center items-center">
      <p>Website desenvolvido por João Pereira</p>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
