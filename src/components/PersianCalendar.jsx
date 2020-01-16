import React from "react";
import dateFns from "date-fns";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";

moment.updateLocale(fa, 'fa');
moment.loadPersian({dialect: 'persian-modern',usePersianDigits: true});

class PersianCalendar extends React.Component {
    state = {
        currentMonth: moment(),
        selectedDate: moment()
    };

    renderHeader() {
        const dateFormat = "jMMMM jYYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_right
                    </div>
                </div>
                <div className="col col-center">
                    <span>{moment(this.state.currentMonth).format(dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_left</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = moment(this.state.currentMonth).startOf('week');//moment(this.state.currentMonth).days();

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {/*{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}*/}
                    {moment(startDate).add(i, 'day').format(dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const {currentMonth, selectedDate} = this.state;
        const monthStart = moment(currentMonth).startOf('jMonth');//dateFns.startOfMonth(currentMonth);
        const monthEnd = moment(monthStart).endOf('jMonth'); //dateFns.endOfMonth(monthStart);
        const startDate = moment(monthStart).startOf('week'); //dateFns.startOfWeek(monthStart);
        const endDate = moment(monthEnd).endOf('week'); //dateFns.endOfWeek(monthEnd);

        const dateFormat = "jD";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format(dateFormat);
                const m = moment(currentMonth).format('jMMMM');
                const d = moment(selectedDate).format('jD');
                const cloneDay = day;

                days.push(
                    <div
                        className={`col cell ${
                            moment(day).format('jMMMM') !== m
                                ? "disabled"
                                : moment(selectedDate).isSame(day, 'day') ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => {
                            this.onDateClick(moment(cloneDay))}
                        }
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <div className="calendar rtl">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default PersianCalendar;
