interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  return (
    <footer className="footer">
      <p>© 2024 {name} · AI교육 전문</p>
    </footer>
  );
}
