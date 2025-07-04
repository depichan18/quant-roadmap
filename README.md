# 🎯 Quant Researcher Learning Roadmap

A comprehensive 2-month learning tracker designed specifically for aspiring quantitative researchers. This interactive web application helps you stay on track with your quant finance journey through structured weekly learning modules.

## 🚀 Features

- **📊 Progress Tracking**: Visual progress indicators and completion percentages
- **✅ Daily Task Checklist**: Mark tasks as completed with persistent storage
- **📈 Learning Statistics**: Detailed analytics on your learning progress
- **🍅 Pomodoro Timer**: Built-in study timer with break reminders
- **📄 Export Progress**: Export your progress as JSON, CSV, or generate reports
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **💾 Local Storage**: Your progress is automatically saved in your browser

## 📚 Curriculum Overview

### Week 1: Foundation - Mathematics & Statistics
- Probability theory basics
- Statistical distributions
- Descriptive statistics
- Central limit theorem

### Week 2: Linear Algebra & Calculus for Finance
- Matrix operations
- Eigenvalues and eigenvectors
- Optimization techniques
- Financial mathematics

### Week 3: Programming for Finance
- Python for financial analysis
- Pandas data manipulation
- Financial APIs
- Data visualization

### Week 4: Financial Markets & Instruments
- Market structures
- Financial instruments
- Risk and return concepts
- Portfolio fundamentals

### Week 5: Time Series Analysis
- Time series components
- Forecasting techniques
- ARIMA models
- Volatility modeling

### Week 6: Portfolio Theory & Risk Management
- Modern Portfolio Theory
- CAPM model
- Risk metrics (VaR, Sharpe ratio)
- Portfolio optimization

### Week 7: Basic Trading Strategies
- Algorithmic trading concepts
- Mean reversion strategies
- Momentum strategies
- Backtesting frameworks

### Week 8: Introduction to Quantitative Research
- Research methodologies
- Factor modeling
- Academic paper analysis
- Research presentation skills

## 🛠️ Technology Stack

- **Frontend**: React 19.x with Vite
- **Styling**: Pure CSS with modern design patterns
- **Data Storage**: Browser's localStorage
- **Build Tool**: Vite for fast development and building

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quant-roadmap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📖 How to Use

1. **Track Daily Tasks**: Click on checkboxes to mark tasks as completed
2. **View Progress**: Monitor your overall progress in the header section
3. **Study Timer**: Use the Pomodoro timer for focused study sessions
4. **Statistics**: View detailed analytics about your learning journey
5. **Export Data**: Save your progress in various formats
6. **Reset Progress**: Start fresh anytime with the reset button

## 🎨 Features in Detail

### Progress Tracking
- Real-time progress calculation
- Visual circular progress indicators
- Week-by-week completion tracking
- Motivational messages based on progress

### Study Timer
- 25-minute study sessions
- 5-minute break periods
- Visual countdown with circular progress
- Desktop notifications when sessions complete
- Automatic session switching

### Export Options
- **JSON**: Complete data export for backup
- **CSV**: Spreadsheet-friendly format
- **Report**: Formatted HTML report for printing

### Statistics Dashboard
- Total tasks completed
- Weeks finished
- Current week indicator
- Average weekly progress
- Motivational feedback

## 🔧 Customization

### Modifying the Roadmap
Edit `src/data/roadmapData.json` to customize:
- Week titles and descriptions
- Learning objectives
- Daily tasks
- Resources and materials
- Tools and technologies

### Styling
- Modify component CSS files in `src/components/`
- Update global styles in `src/App.css` and `src/index.css`
- Color schemes are defined with CSS custom properties

## 📱 Mobile Responsive

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🔐 Data Privacy

- All data is stored locally in your browser
- No external servers or databases
- Your progress is private and secure
- Export options allow you to backup your data

## 🤝 Contributing

This project is designed as a learning tool. Feel free to:
- Fork the repository
- Add new features
- Improve the curriculum
- Enhance the UI/UX
- Fix bugs or issues

## 📄 License

This project is open source and available under the MIT License.

## 🎓 About the Creator

Created by **Devi Rosa Aprilla**, a Mathematics student at Institut Teknologi Sepuluh Nopember (ITS), as a learning tool for aspiring quantitative researchers.

## 📞 Support

If you encounter any issues or have suggestions for improvement, please feel free to create an issue or reach out.

---

**Happy Learning! 🚀📊**

*Remember: Becoming a quantitative researcher requires dedication, continuous learning, and practical application. This roadmap is your guide, but your commitment is the key to success.*+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
