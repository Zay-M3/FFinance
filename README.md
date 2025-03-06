# FFinance: Your Free Real-Time Stock Market Companion

<img src="app/static/app/icon.svg" width="50" height="50"/>

## Introduction

Welcome to FFinance, a non-profit web application designed to empower you with real-time insights into the dynamic world of the stock market. Whether you're a seasoned investor or just starting your financial journey, FFinance provides valuable tools to track stock performance, set investment goals, and monitor historical trends, all absolutely free of charge.

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
    * **Objetive Alert**: (Soon).

3.  **Historical Price Charts:**
    *   **Daily Price History:** View a detailed line chart illustrating the stock's price fluctuations over the past five days.
    *   **Monthly Bar History**: Get the performance of the stock in the last month in a bar chart
    *   **Visual Data:**  Gain a clearer understanding of the stock's recent performance through easy-to-read visualizations.
    * **Compare:** You can see the graph of the active and compair it with other stock.

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
   <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width="50" height="50"/>
   <img src="https://raw.githubusercontent.com/github/explore/main/topics/json/json.png" width="50" height="50"/>
</div>


*   **Python:** The backend logic of FFinance is powered by Python, a versatile and widely-used programming language.
*   **Django:** The Django web framework provides a clean and efficient way to build web applications with Python.
*   **yfinance:** This popular library allows us to access real-time and historical stock market data from Yahoo Finance.
*   **HTML, CSS, JavaScript:** The user interface is built using the fundamental web technologies of HTML for structure, CSS for styling, and JavaScript for interactive elements and dynamic data updates.
* **Echart**: to create the graphs on the page.
*   **REST API:** To communicate in a fast way with the backend
* **Json**: To pass data between the backend and the frontend

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
