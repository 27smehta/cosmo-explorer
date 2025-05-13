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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                space: {
                    '50': '#F9FAFC',
                    '100': '#F1F0FB',
                    '200': '#E5DEFF',
                    '300': '#D3E4FD',
                    '400': '#9b87f5',
                    '500': '#8B5CF6',
                    '600': '#7E69AB',
                    '700': '#6E59A5',
                    '800': '#1A1F2C',
                    '900': '#0F172A',
                },
                cosmos: {
                    'purple': '#8B5CF6',
                    'blue': '#0EA5E9',
                    'pink': '#D946EF',
                    'orange': '#F97316',
                    'green': '#10B981',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'twinkle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
                    },
                    '50%': { 
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)'
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'orbit': {
                    '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' },
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'twinkle': 'twinkle 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'orbit': 'orbit 15s linear infinite',
			},
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'space': ['"Space Grotesk"', 'sans-serif'],
            },
            backgroundImage: {
                'space-gradient': 'linear-gradient(to bottom, #1A1F2C, #0F172A)',
                'cosmos-gradient': 'linear-gradient(to right, #8B5CF6, #0EA5E9)',
                'nebula': 'radial-gradient(circle at center, rgba(217, 70, 239, 0.2), rgba(14, 165, 233, 0.2), rgba(30, 41, 59, 0))',
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
