/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
          800: '#1F2A37',
          900: '#111928',
        },
        primary: {
          50:  '#F3F9FF',  // 极浅天蓝 — 接近白色
          100: '#E6F3FF',  // 很浅的冰蓝
          200: '#CFE8FF',  // 柔和浅蓝
          300: '#A8D4FF',  // 清澈天蓝
          400: '#7EC0FF',  // 视觉主色倾向
          500: '#4FA9FF',  // 主色（推荐主按钮使用）
          600: '#2F8EF4',  // 稍深、强调状态
          700: '#1F75D9',  // 深蓝，用于hover/active
          800: '#185FB5',  // 更深，用于阴影或高对比文字
          900: '#144D94',  // 最深蓝，用于深色模式或强调文字
        },
        blue: {
          500: '#E1EFFE',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',

        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
        },
        indigo: {
          25: '#F5F8FF',
          100: '#E0EAFF',
          600: '#444CE7',
        },
      },
      screens: {
        mobile: '100px',
        // => @media (min-width: 100px) { ... }
        tablet: '640px', // 391
        // => @media (min-width: 600px) { ... }
        pc: '769px',
        // => @media (min-width: 769px) { ... }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
