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
                    '400': '#3B82F6',
                    '500': '#2563EB',
                    '600': '#1D4ED8',
                    '700': '#1E40AF',
                    '800': '#1E3A8A',
                    '900': '#172554',
                },
                cosmos: {
                    'purple': '#2563EB',
                    'blue': '#3B82F6',
                    'pink': '#60A5FA',
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
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'twinkle': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.5', transform: 'scale(0.95)' },
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 5px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)',
                        transform: 'scale(1)'
                    },
                    '50%': { 
                        boxShadow: '0 0 15px rgba(37, 99, 235, 0.8), 0 0 30px rgba(37, 99, 235, 0.6)',
                        transform: 'scale(1.05)'
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
                },
                'orbit': {
                    '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-in': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'twinkle': 'twinkle 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'orbit': 'orbit 15s linear infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-in': 'slide-in 0.5s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'shimmer': 'shimmer 2s linear infinite'
			},
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'space': ['"Space Grotesk"', 'sans-serif'],
            },
            backgroundImage: {
                'space-gradient': 'linear-gradient(to bottom, #1E3A8A, #172554)',
                'cosmos-gradient': 'linear-gradient(to right, #2563EB, #3B82F6)',
                'nebula': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2), rgba(30, 41, 59, 0))',
                'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)'
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
                'transform': 'transform',
                'opacity': 'opacity',
                'colors': 'background-color, border-color, color, fill, stroke',
                'shadow': 'box-shadow',
                'all': 'all'
            },
            transitionDuration: {
                '2000': '2000ms',
                '1500': '1500ms',
                '1000': '1000ms',
                '500': '500ms',
                '300': '300ms',
                '200': '200ms',
                '150': '150ms',
                '100': '100ms',
                '50': '50ms'
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
