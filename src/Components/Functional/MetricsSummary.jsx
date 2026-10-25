import CardWrapper from "./CardWrapper";

export default function MetricsSummary({ metrics }) {
  return (
    <div className="metrics">
      <CardWrapper title="Total Tasks">
        <h3>{metrics.total}</h3>
      </CardWrapper>

      <CardWrapper title="Pending Tasks">
        <h3>{metrics.pending}</h3>
      </CardWrapper>

      <CardWrapper title="Completed Tasks">
        <h3>{metrics.completed}</h3>
      </CardWrapper>

      <CardWrapper title="Completion Rate">
        <h3>{metrics.percentage}%</h3>
      </CardWrapper>
    </div>
  );
}
