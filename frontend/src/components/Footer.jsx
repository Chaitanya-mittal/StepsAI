function Footer() {
  return (
    <footer className="flex h-[50px] w-full items-center justify-center text-sm text-stone-500">
      <p>Copyright © | {new Date().toDateString()}</p>
    </footer>
  );
}

export default Footer;
