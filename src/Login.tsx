import React from 'react';
import './App.css';
import axios from 'axios';
import Chart from "react-apexcharts";

import { useEffect } from 'react';
import { useState } from 'react';


const LineGraph = () => {

  const [data, setData] = useState([])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      
      dataLabels: {
        enabled: false
      },
      
      markers: {
        size: 0,
      },
      title: {
        text: 'React Data Chart',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toString()
          },
        },
        title: {
          text: 'Data',
          
        }
      },
      xaxis: {
        type: 'datetime',
        min: new Date('2011-10-30T11:10:00').getTime(),
        max: new Date('2021-01-01T00:00:00').getTime(),
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toString()
          }
        },
        
      }
  })

  useEffect(() => {
      axios.post('https://domainservices.dhigroup.com/api/tokens', {
        id: 'demo',
        password: 'demo'
      })
      .then(function (response) {

        if (response && response.data){
          axios.get( 
            'https://domainservices.dhigroup.com/api/timeseries/mclite-timeseries/Telemetry%7CCatchment%20rainfall%7C6790_HUDINJA_SKOFJA_VAS_Rainfall.dfs0%20%5Bweighted%5D/values',
            {    
              headers: { Authorization: `Bearer ${response.data.accessToken.token}` }
            }
          ).then(function (response){
            setData(response.data)
          }).catch(function (error) {
            console.log(error);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
      // 1
    }, [])
  



  return (
    <div>
      <Chart
          options={options}
          series={[{
                data: data
            }]}
          type="line"
          width="95%"
          height={"500px"}
        />
    </div>
  )
}

export default LineGraph