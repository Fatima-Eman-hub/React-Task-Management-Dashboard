import { Component } from "react";
import CardWrapper from "../Functional/CardWrapper";

export default class ActivityLogger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      notification: "",
      isLoaded: false
    };

    this.timer = null;
  }
  componentDidMount() {
    let savedLogs = [];

    try {
      const storedLogs = localStorage.getItem("activityLogs");
      savedLogs = storedLogs ? JSON.parse(storedLogs) : [];
    } catch {
      savedLogs = [];
    }

    this.setState({
      logs: savedLogs,
      isLoaded: true
    });
  }
  componentDidUpdate(previousProps, previousState) {
    if (
      this.state.isLoaded &&
      this.state.logs !== previousState.logs
    ) {
      localStorage.setItem(
        "activityLogs",
        JSON.stringify(this.state.logs)
      );
    }

    if (
      this.props.latestActivity &&
      this.props.latestActivity !== previousProps.latestActivity
    ) {
      const activity = this.props.latestActivity;
      this.setState((previousState) => ({
        logs: [activity, ...previousState.logs].slice(0, 10),
        notification: activity.message
      }));
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.setState({ notification: "" });
      }, 2500);
    }
  }

  clearLogs() {
  this.setState({ logs: [], notification: "" });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    const { logs, notification } = this.state;
    
    return (
    
        
      <CardWrapper title="Recent Activity">
        <button onClick={() => this.clearLogs()}>Clear Logs</button>
        {notification && (
          <p className="activity-notification" role="status">
            {notification}
          </p>
        )}
        {logs.length === 0 ? (
          <p className="activity-empty">
            Your task activities will appear here.
          </p>
        ) : (
          <ul className="activity-list">
            {logs.map((log) => (
              <li className="activity-item" key={log.id}>
                <p className="activity-message">{log.message}</p>
                <small className="activity-time">{log.time}</small>
              </li>
            ))}
          </ul>
        )}
      </CardWrapper>
    );
  }
}
