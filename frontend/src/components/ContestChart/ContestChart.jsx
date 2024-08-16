import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ContestChart = ({ voteData }) => {
  const processVoteData = (voteData) => {
    const labels = [];
    const datasets = [];

    for (let hour = 0; hour < 24; hour++) {
      labels.push(`${hour}:00`);
    }

    voteData.forEach((participant) => {
      const votesPerHour = new Array(24).fill(0);

      participant.votes.forEach((vote) => {
        const voteDate = new Date(vote.created_at);
        const voteHour = voteDate.getHours();
        votesPerHour[voteHour]++;
      });

      datasets.push({
        label: participant.name,
        data: votesPerHour,
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1,
      });
    });

    return {
      labels,
      datasets,
    };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = processVoteData(voteData);

  return <Line data={chartData} options={{ responsive: true }} />;
};

ContestChart.propTypes = {
  voteData: PropTypes.array.isRequired,
};

export default ContestChart;
