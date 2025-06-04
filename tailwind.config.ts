import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				exo: ["Inter", "sans-serif"],
				orbitron: ["Inter", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(0 0% 10%)',
				ring: 'hsl(var(--ring))',
				background: 'hsl(0 0% 0%)',
				foreground: 'hsl(0 0% 100%)',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(0 0% 0%)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(0 0% 100%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 85% 65%)', // Keeping red for destructive
					foreground: 'hsl(0 0% 100%)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(0 0% 80%)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(0 0% 100%)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(0 0% 100%)'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(0 0% 100%)'
				},
				gaming: {
					dark: "#1a1a1a",
					darker: "#000000",
					purple: "#ffffff",
					blue: "#ffffff",
					green: "#ffffff",
					glow: "rgba(255, 255, 255, 0.5)"
				}
			},	
			borderRadius: {
				lg: 'var(--radius)',	
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				"glow-pulse": {
					'0%, 100%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)' },
					'50%': { boxShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' },
				},
				gradient: {
					'0%': { backgroundColor: '#1a1a1a' },
					'100%': { backgroundColor: '#ffffff' },
				},
				"text-shimmer": {
					"0%": {
						backgroundPosition: "0% 50%",
					},
					"100%": {
						backgroundPosition: "100% 50%",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"scroll-left": {
					"0%": {
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(-50%)",
					},
				},
				"marquee": {
					"0%": {
						transform: "translateX(0)",
					},	
					"100%": {
						transform: "translateX(calc(-50% - 1rem))",
					},	
				},	
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				float: 'float 6s ease-in-out infinite',
				pulse: 'pulse 3s ease-in-out infinite',
				"glow-pulse": 'glow-pulse 2s ease-in-out infinite',
				gradient: 'gradient 6s linear infinite alternate',
				"text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
				"fadeIn": "fade-in 0.6s ease-out forwards",
				"scroll-left": "scroll-left 40s linear infinite",
				"marquee": "marquee 40s linear infinite",
			},
			boxShadow: {	
				glow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 15px rgba(139, 92, 246, 0.3)',
				'glow-strong': '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
				'glow-blue': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
				'glow-green': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
