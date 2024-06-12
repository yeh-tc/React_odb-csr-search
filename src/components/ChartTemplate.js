import Chart from 'react-apexcharts';
import Box from "@mui/material/Box";

export default function ChartTemplate ({data,color}){
    const categories = data.map(dept=>dept[0])
    const counts = data.map(dept => dept[1]);
    const total = counts.reduce((acc, curr) => acc + curr, 0);
    console.log(data.length)
    const options = {
        chart: {
            fontFamily: '"Noto Sans TC", sans-serif',
            toolbar: {
              export:{
                csv:{
                  filename:'csr_total_count'
                },
                svg:{
                  filename:'csr_total_count'
                },
                png:{
                  filename:'csr_total_count'
                }
              },
            }
        },
        noData: {
          text: data.length > 0 ? '' : '目前無航次資料', // Message to display when there is no data
          align: 'center', // Horizontal alignment of the text
          verticalAlign: 'middle', // Vertical alignment of the text
          offsetX: 0,
          offsetY: 0,
          style: {
              color: color,
              fontSize: '1.2rem',
          }
        },
        xaxis: {
            categories:categories,
            labels: {
                style: {
                  fontSize: '0.85rem',
                },
                title:'單位'
              },
        },
        colors: [color],
        yaxis: {
            title: {
              text: '人數',
              style: {
                fontSize: '0.9rem',
                fontWeight: 300
              },
            },
          },
        tooltip: {
            y: {
              formatter: function (value) {
                const percentage = (value / total * 100).toFixed(1);
                return `${value} 人 (${percentage}%)`;
              }
            }
          },
        plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top'
              }
            }
          },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#3D3D3D'],
                fontWeight: 450
            },
            offsetY: -30,
            formatter: function (value) {
                return `${value} 人`;
              }
          },

    };
    const series =[
        {
            name: "總人次",
            data: counts
          }
    ];
    return(
        <Box sx={{py:2}}>
        <Chart 
        type="bar"
        width="100%"
        height={480}
        options={options}
        series={series.length > 0 ? series : []}/>
        </Box>
    );
}