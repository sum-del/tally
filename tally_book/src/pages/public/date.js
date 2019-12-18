import { DatePicker, List } from 'antd-mobile';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr} ${timeStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
// const CustomChildren = ({ extra, onClick, children }) => (
//     <div
//         onClick={onClick}
//         style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
//     >
//         {children}
//         <span style={{ float: 'right', color: '#888' }}>{extra}</span>
//     </div>
// );

class Demo extends React.Component {
    state = {
        date: now,
        time: now,
    }
    render() {
        return (
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}>
                    <List.Item arrow="horizontal">Date</List.Item>
                </DatePicker>
            </List>
        );
    }
}