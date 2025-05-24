# FFinance: Your Free Real-Time Stock Market Companion

Here you can see a demo for FFninance desploy in railway = https://ffinance-production.up.railway.app/

<img src="app/static/app/icon.svg" width="50" height="50"/>

## Introduction

Welcome to FFinance, a web application designed to provide you with real-world insights into the dynamic world of the stock market. FFinance offers you tools to monitor stock performance, set investment goals, and track historical trends—all completely free.

FFinance is built with a passion for making financial data accessible and understandable to everyone. We believe that knowledge is the key to successful investing, and our platform is here to equip you with the information you need to make informed decisions.

## Key Features

FFinance offers a range of powerful features to enhance your stock market experience:

1.  **Real-Time Stock Tracking:**
    *   **Symbol Search:** Easily search for your favorite publicly traded companies by their stock symbol (e.g., AAPL, GOOG, TSLA).
    *   **Live Pricing:** Get up-to-the-minute pricing information for any active stock symbol you select.
    *   **Detailed Company Information:** Access the long name and get a brief description of the company, so you get context about the companies you are investing.
    *   **Notifications:** Get information about you active when they are over you target price.

2.  **Customizable Investment Goals:**
    *   **Objective Setting:** Define a target price for any stock you're tracking. FFinance will actively monitor the stock's price and notify you.
    *   **Smart Price Suggestions:** Get intelligent price objective suggestions based on the selected asset.
    *   **Visual Price Slider:** Easily set your price objectives with an interactive visual slider.
    *   **Quick Price Options:** Select common price points with one click using quick price buttons.
    *   **Achievement Celebrations:** Get visual celebrations when your price objectives are met.

3.  **Historical Price Charts:**
    *   **Daily Price History:** View a detailed line chart illustrating the stock's price fluctuations over the past five days.
    *   **Monthly Bar History**: Get the performance of the stock in the last month in a bar chart
    *   **Visual Data:**  Gain a clearer understanding of the stock's recent performance through easy-to-read visualizations.
    *   **Compare:** You can see the graph of the active and compair it with other stock.

4.  **Enhanced User Experience:**
    *   **Recent Searches:** Access your recent searches to quickly return to previously analyzed assets.
    *   **Categorized Assets:** Assets are organized by categories for easier selection.
    *   **Sharing Capabilities:** Share your analysis with others through social media or messaging apps.
    *   **Visual Progress Tracking:** See your progress toward price objectives with animated progress bars.
    *   **Responsive Notifications:** Get beautiful toast notifications for important events and actions.
    *   **Watchlist Feature:** Add assets to your personal watchlist for quick access and monitoring.

## UI/UX Improvements

FFinance has been enhanced with a modern and intuitive user interface to make your financial analysis experience more enjoyable:

### Asset Search Card Improvements
- **Categorized Dropdown Menu:** Assets are now organized by categories like Cryptocurrencies, Technology, and Others for easier selection.
- **Enhanced Price Objective Setter:** A visual slider with real-time feedback makes setting price objectives more intuitive.
- **Quick Price Selection:** One-click buttons for common price points (e.g., $10, $100, $1K, $10K).
- **Intelligent Price Suggestions:** The "Suggest" button automatically recommends a target price based on the selected asset's characteristics.
- **Recent Searches History:** Quickly access your recent analyses with the built-in search history feature.

### Results Card Enhancements
- **Visual Price Cards:** Clearly presented price information with visual feedback.
- **Animated Progress Bar:** Visual representation of your progress toward the set price objective.
- **Achievement Celebrations:** Special visual effects and confetti animation when objectives are met.
- **Company Summary:** Concise information about the company with an option to read more.
- **Sharing Options:** Share your analysis via social media, messaging apps, or copy to clipboard.

### General UI Improvements
- **Toast Notifications:** Beautiful toast notifications provide feedback on user actions.
- **Responsive Design:** The interface adapts seamlessly to different screen sizes and devices.
- **Visual Feedback:** Hover effects, animations, and transitions create a more dynamic experience.
- **Modal Information:** Detailed information is presented in modals with rich visual elements.
- **Interactive Elements:** Buttons, sliders, and other interface elements provide visual feedback when interacted with.

### Accessibility Features
- **Tooltips:** Helpful tooltips provide additional context for various interface elements.
- **High Contrast Elements:** Important information is presented with adequate contrast for better readability.
- **Keyboard Navigation:** All features are accessible via keyboard navigation.
- **Screen Reader Support:** Appropriate ARIA labels and roles for screen reader compatibility.

## How to Use FFinance

Using FFinance is straightforward and intuitive:
1.  **Enter a Stock Symbol:** In the search bar, type in the stock symbol of the company you want to track.
2.  **Set Your Objective:** Enter your target price in the "Objective" field.
3. **Press the Button**: Click on the button to get the information and the graph.
4. **Graph Information**: The graph will show the evolution of the stock in the last 5 days or in the last month.
5.  **Review Real-Time Data:**  The page will display the stock's current price, its long name, and the difference between the current price and your set objective. You can see the history graph below.
6. **Notification:** If the stock exceeded your price goal, you will see a message.
7. **Repeat**: You can repeat the process many times you want.

## Technologies Used

FFinance leverages a robust and modern technology stack:
<h3>Backend</h3>
<div style="display-flex">
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="50" height="50"/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" width="50" height="50"/>
</div>


<h3>Frontend</h3>
<div style="display-flex">
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50" height="50"/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" height="50"/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50"/>
</div>


<h3>Graphis</h3>
<div style="display-flex">
   <img src="https://echarts.apache.org/en/images/logo.png" width="200" height="50"/>
</div>
<h3>Comunication</h3>
<div style="display-flex">
   <img src="https://raw.githubusercontent.com/github/explore/main/topics/json/json.png" width="50" height="50"/>
</div>

<h3>UI/UX Components</h3>
<div style="display-flex">
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="50" height="50"/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" height="50"/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50"/>
   <img src="https://fontawesome.com/images/favicon/icon-solid-512.png" width="50" height="50"/>
</div>

*   **Python:** The backend logic of FFinance is powered by Python, a versatile and widely-used programming language.
*   **Django:** The Django web framework provides a clean and efficient way to build web applications with Python.
*   **yfinance:** This popular library allows us to access real-time and historical stock market data from Yahoo Finance.
*   **HTML, CSS, JavaScript:** The user interface is built using the fundamental web technologies of HTML for structure, CSS for styling, and JavaScript for interactive elements and dynamic data updates.
*   **Bootstrap:** The responsive UI components are built using Bootstrap, providing a consistent and modern look and feel.
*   **Font Awesome:** Icons from Font Awesome enhance the visual experience and improve usability.
*   **ECharts:** For creating interactive and responsive charts that visualize financial data.
*   **REST API:** To communicate in a fast way with the backend.
*   **Json:** To pass data between the backend and the frontend.

## Getting Started (For Developers)

If you'd like to contribute to FFinance or run it locally, you can follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [your repository link]
    ```
2. Create a virtual enviroment
    ```bash
    python -m venv venv
    ```
3. Activate your virtual enviroment
    ```bash
    venv\Scripts\activate
    ```
4. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
5. **Run your web page**:
    ```bash
    python manage.py runserver
    ```

## Contributing

FFinance is an open-source project, and contributions are always welcome! If you have ideas for improvements, bug fixes, or new features, please feel free to:

*   Fork the repository.
*   Create a new branch for your changes.
*   Submit a pull request.

## Disclaimer

FFinance is intended for informational purposes only and should not be considered financial advice. Investing in the stock market carries risks, and you should always consult with a qualified financial advisor before making investment decisions.

## License

[Specify your project's license here, e.g., MIT License]

---

**Let me know if you have any other questions or want me to make some changes in the Readme.**
