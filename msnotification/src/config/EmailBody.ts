class EmailBodyBuilder {
    buildWelcomeEmail(imageUrl: string, message: string): string {
        return `
            <html>
            <body style="text-align: center; font-family: Arial, sans-serif;">
                <h1>Welcome to Bocadinhos</h1>
                <p>${message}</p>
                <img src="${imageUrl}" alt="Welcome Image" style="width: 100%; height: auto;"/>
            </body>
            </html>
        `;
    }
}

export default new EmailBodyBuilder();