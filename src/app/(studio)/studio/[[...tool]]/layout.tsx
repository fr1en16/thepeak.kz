export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    );
}