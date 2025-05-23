import "./globals.css";

export const metadata = {
  title: "Blank Street Locations",
  description: "Browse all Blank Street coffee shop locations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
