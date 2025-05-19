
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
				exo: ["'Exo 2'", "sans-serif"],
				orbitron: ["'Orbitron'", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				gaming: {
					dark: "#0F172A",
					darker: "#070C18",
					purple: "#8B5CF6",
					blue: "#38BDF8",
					green: "#10B981",
					glow: "rgba(139, 92, 246, 0.5)"
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
					'0%, 100%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 15px rgba(139, 92, 246, 0.3)' },
					'50%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.7), 0 0 20px rgba(139, 92, 246, 0.5)' },
				},
				gradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' },
				},
				"text-shimmer": {
					"0%": {
						backgroundPosition: "0% 50%",
					},
					"100%": {
						backgroundPosition: "100% 50%",
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
			},
			boxShadow: {
				glow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 15px rgba(139, 92, 246, 0.3)',
				'glow-strong': '0 0 10px rgba(139, 92, 246, 0.7), 0 0 20px rgba(139, 92, 246, 0.5)',
				'glow-blue': '0 0 5px rgba(56, 189, 248, 0.5), 0 0 15px rgba(56, 189, 248, 0.3)',
				'glow-green': '0 0 5px rgba(16, 185, 129, 0.5), 0 0 15px rgba(16, 185, 129, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
