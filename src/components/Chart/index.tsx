import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

interface ChartProps {
  data: {
    incomes: number;
    outcomes: number;
    balance: number;
  };
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const Charts = ({ data }: ChartProps): JSX.Element => {
  const chartConfig: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      height: '300px',
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 200,
        animateGradually: {
          enabled: true,
          delay: 50,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      fontFamily: 'Montserrat',
      foreColor: '#aaaaaa',
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    fill: {
      colors: ['#25995A', '#B73534'],
      opacity: 0.8,
    },
    stroke: {
      show: false,
    },
  };

  return (
    <Chart
      options={chartConfig}
      series={[data.incomes, data.outcomes]}
      type="donut"
    />
  );
};

export default Charts;
