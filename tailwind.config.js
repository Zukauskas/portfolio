/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            keyframes: {
                typingTitle: {
                    "0%": {
                        width: "0%",
                        visibility: "hidden",
                    },
                    "100%": {
                        width: "100%",
                    },
                },
            },
            animation: {
                typingTitle: "typingTitle 2s steps(20)",
            },
        },
    },
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [require("tailwindcss-animate")],
};
