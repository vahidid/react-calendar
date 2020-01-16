import React from "react";

import Calendar from "./components/Calendar";
import PersianCalendar from "./components/PersianCalendar";

import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header>
                    <div id="logo">
                        <span className="icon">date_range</span>
                        <span>
              react<b>calendar</b>
            </span>
                    </div>
                </header>
                <main>
                    <Calendar/>

                    <br/>
                    <br/>
                    <header>
                        <div id="logo">
                            <span className="icon">date_range</span>
                            <span>
              react<b>Persian</b>calendar
            </span>
                        </div>
                    </header>
                    <PersianCalendar/>
                </main>
            </div>
        );
    }
}

export default App;
//
