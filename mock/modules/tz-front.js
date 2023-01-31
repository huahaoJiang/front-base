export default [
  {
    url: '/mock/toolkit/marketEmp/marketEmpCount',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            regionName: '中国',
            numSum: 23,
            numUp: 78,
            year: 2016
          },
          {
            regionName: '中国',
            numSum: 33,
            numUp: 68,
            year: 2017
          },
          {
            regionName: '中国',
            numSum: 43,
            numUp: 58,
            year: 2018
          },
          {
            regionName: '中国',
            numSum: 53,
            numUp: 48,
            year: 2019
          },
          {
            regionName: '中国',
            numSum: 63,
            numUp: 38,
            year: 2020
          },
          {
            regionName: '中国',
            numSum: 73,
            numUp: 28,
            year: 2021
          },

          {
            regionName: '美国',
            numSum: 20,
            numUp: 70,
            year: 2016
          },
          {
            regionName: '美国',
            numSum: 30,
            numUp: 60,
            year: 2017
          },
          {
            regionName: '美国',
            numSum: 40,
            numUp: 50,
            year: 2018
          },
          {
            regionName: '美国',
            numSum: 50,
            numUp: 40,
            year: 2019
          },
          {
            regionName: '美国',
            numSum: 60,
            numUp: 30,
            year: 2020
          },
          {
            regionName: '美国',
            numSum: 70,
            numUp: 20,
            year: 2021
          },

          {
            regionName: '欧洲',
            numSum: 15,
            numUp: 65,
            year: 2016
          },
          {
            regionName: '欧洲',
            numSum: 25,
            numUp: 55,
            year: 2017
          },
          {
            regionName: '欧洲',
            numSum: 35,
            numUp: 45,
            year: 2018
          },
          {
            regionName: '欧洲',
            numSum: 45,
            numUp: 35,
            year: 2019
          },
          {
            regionName: '欧洲',
            numSum: 55,
            numUp: 25,
            year: 2020
          },
          {
            regionName: '欧洲',
            numSum: 65,
            numUp: 15,
            year: 2021
          },

          {
            regionName: '其他',
            numSum: 5,
            numUp: 55,
            year: 2016
          },
          {
            regionName: '其他',
            numSum: 15,
            numUp: 45,
            year: 2017
          },
          {
            regionName: '其他',
            numSum: 25,
            numUp: 35,
            year: 2018
          },
          {
            regionName: '其他',
            numSum: 35,
            numUp: 25,
            year: 2019
          },
          {
            regionName: '其他',
            numSum: 45,
            numUp: 15,
            year: 2020
          },
          {
            regionName: '其他',
            numSum: 55,
            numUp: 5,
            year: 2021
          }
        ]
      }
    }
  },
  {
    url: '/mock/tz-front/marketEmp/marketValue',
    method: 'get',
    response: req => {
      const dateType = req.query.dateType

      if (dateType === '3') {
        return {
          code: 200,
          data: [
            {
              regionName: '中国',
              totalMv: 23,
              totalMvAvg: 78,
              mydate: '2016',
              quarter: 'Q1'
            },
            {
              regionName: '中国',
              totalMv: 33,
              totalMvAvg: 68,
              mydate: '2016',
              quarter: 'Q2'
            },
            {
              regionName: '中国',
              totalMv: 43,
              totalMvAvg: 58,
              mydate: '2016',
              quarter: 'Q3'
            },
            {
              regionName: '中国',
              totalMv: 53,
              totalMvAvg: 48,
              mydate: '2016',
              quarter: 'Q4'
            },
            {
              regionName: '中国',
              totalMv: 63,
              totalMvAvg: 38,
              mydate: '2017',
              quarter: 'Q1'
            },
            {
              regionName: '中国',
              totalMv: 73,
              totalMvAvg: 28,
              mydate: '2017',
              quarter: 'Q2'
            },

            {
              regionName: '美国',
              totalMv: 20,
              totalMvAvg: 70,
              mydate: '2016',
              quarter: 'Q1'
            },
            {
              regionName: '美国',
              totalMv: 30,
              totalMvAvg: 60,
              mydate: '2016',
              quarter: 'Q2'
            },
            {
              regionName: '美国',
              totalMv: 40,
              totalMvAvg: 50,
              mydate: '2016',
              quarter: 'Q3'
            },
            {
              regionName: '美国',
              totalMv: 50,
              totalMvAvg: 40,
              mydate: '2016',
              quarter: 'Q4'
            },
            {
              regionName: '美国',
              totalMv: 60,
              totalMvAvg: 30,
              mydate: '2017',
              quarter: 'Q1'
            },
            {
              regionName: '美国',
              totalMv: 70,
              totalMvAvg: 20,
              mydate: '2017',
              quarter: 'Q2'
            },

            {
              regionName: '欧洲',
              totalMv: 15,
              totalMvAvg: 65,
              mydate: '2016',
              quarter: 'Q1'
            },
            {
              regionName: '欧洲',
              totalMv: 25,
              totalMvAvg: 55,
              mydate: '2016',
              quarter: 'Q2'
            },
            {
              regionName: '欧洲',
              totalMv: 35,
              totalMvAvg: 45,
              mydate: '2016',
              quarter: 'Q3'
            },
            {
              regionName: '欧洲',
              totalMv: 45,
              totalMvAvg: 35,
              mydate: '2016',
              quarter: 'Q4'
            },
            {
              regionName: '欧洲',
              totalMv: 55,
              totalMvAvg: 25,
              mydate: '2017',
              quarter: 'Q1'
            },
            {
              regionName: '欧洲',
              totalMv: 65,
              totalMvAvg: 15,
              mydate: '2017',
              quarter: 'Q2'
            },

            {
              regionName: '其他',
              totalMv: 5,
              totalMvAvg: 55,
              mydate: '2016',
              quarter: 'Q1'
            },
            {
              regionName: '其他',
              totalMv: 15,
              totalMvAvg: 45,
              mydate: '2016',
              quarter: 'Q2'
            },
            {
              regionName: '其他',
              totalMv: 25,
              totalMvAvg: 35,
              mydate: '2016',
              quarter: 'Q3'
            },
            {
              regionName: '其他',
              totalMv: 35,
              totalMvAvg: 25,
              mydate: '2016',
              quarter: 'Q4'
            },
            {
              regionName: '其他',
              totalMv: 45,
              totalMvAvg: 15,
              mydate: '2017',
              quarter: 'Q1'
            },
            {
              regionName: '其他',
              totalMv: 55,
              totalMvAvg: 5,
              mydate: '2017',
              quarter: 'Q2'
            }
          ]
        }
      }

      if (dateType === '2') {
        return {
          code: 200,
          data: [
            {
              regionName: '中国',
              totalMv: 23,
              totalMvAvg: 78,
              mydate: '2016-01'
            },
            {
              regionName: '中国',
              totalMv: 33,
              totalMvAvg: 68,
              mydate: '2016-02'
            },
            {
              regionName: '中国',
              totalMv: 43,
              totalMvAvg: 58,
              mydate: '2016-03'
            },
            {
              regionName: '中国',
              totalMv: 53,
              totalMvAvg: 48,
              mydate: '2016-04'
            },
            {
              regionName: '中国',
              totalMv: 63,
              totalMvAvg: 38,
              mydate: '2016-05'
            },
            {
              regionName: '中国',
              totalMv: 73,
              totalMvAvg: 28,
              mydate: '2016-06'
            },

            {
              regionName: '美国',
              totalMv: 20,
              totalMvAvg: 70,
              mydate: '2016-01'
            },
            {
              regionName: '美国',
              totalMv: 30,
              totalMvAvg: 60,
              mydate: '2016-02'
            },
            {
              regionName: '美国',
              totalMv: 40,
              totalMvAvg: 50,
              mydate: '2016-03'
            },
            {
              regionName: '美国',
              totalMv: 50,
              totalMvAvg: 40,
              mydate: '2016-04'
            },
            {
              regionName: '美国',
              totalMv: 60,
              totalMvAvg: 30,
              mydate: '2016-05'
            },
            {
              regionName: '美国',
              totalMv: 70,
              totalMvAvg: 20,
              mydate: '2016-06'
            },

            {
              regionName: '欧洲',
              totalMv: 15,
              totalMvAvg: 65,
              mydate: '2016-01'
            },
            {
              regionName: '欧洲',
              totalMv: 25,
              totalMvAvg: 55,
              mydate: '2016-02'
            },
            {
              regionName: '欧洲',
              totalMv: 35,
              totalMvAvg: 45,
              mydate: '2016-03'
            },
            {
              regionName: '欧洲',
              totalMv: 45,
              totalMvAvg: 35,
              mydate: '2016-04'
            },
            {
              regionName: '欧洲',
              totalMv: 55,
              totalMvAvg: 25,
              mydate: '2016-05'
            },
            {
              regionName: '欧洲',
              totalMv: 65,
              totalMvAvg: 15,
              mydate: '2016-06'
            },

            {
              regionName: '其他',
              totalMv: 5,
              totalMvAvg: 55,
              mydate: '2016-01'
            },
            {
              regionName: '其他',
              totalMv: 15,
              totalMvAvg: 45,
              mydate: '2016-02'
            },
            {
              regionName: '其他',
              totalMv: 25,
              totalMvAvg: 35,
              mydate: '2016-03'
            },
            {
              regionName: '其他',
              totalMv: 35,
              totalMvAvg: 25,
              mydate: '2016-04'
            },
            {
              regionName: '其他',
              totalMv: 45,
              totalMvAvg: 15,
              mydate: '2016-05'
            },
            {
              regionName: '其他',
              totalMv: 55,
              totalMvAvg: 5,
              mydate: '2016-06'
            }
          ]
        }
      }

      return {
        code: 200,
        data: [
          {
            regionName: '中国',
            totalMv: 23,
            totalMvAvg: 78,
            mydate: 2016
          },
          {
            regionName: '中国',
            totalMv: 33,
            totalMvAvg: 68,
            mydate: 2017
          },
          {
            regionName: '中国',
            totalMv: 43,
            totalMvAvg: 58,
            mydate: 2018
          },
          {
            regionName: '中国',
            totalMv: 53,
            totalMvAvg: 48,
            mydate: 2019
          },
          {
            regionName: '中国',
            totalMv: 63,
            totalMvAvg: 38,
            mydate: 2020
          },
          {
            regionName: '中国',
            totalMv: 73,
            totalMvAvg: 28,
            mydate: 2021
          },

          {
            regionName: '美国',
            totalMv: 20,
            totalMvAvg: 70,
            mydate: 2016
          },
          {
            regionName: '美国',
            totalMv: 30,
            totalMvAvg: 60,
            mydate: 2017
          },
          {
            regionName: '美国',
            totalMv: 40,
            totalMvAvg: 50,
            mydate: 2018
          },
          {
            regionName: '美国',
            totalMv: 50,
            totalMvAvg: 40,
            mydate: 2019
          },
          {
            regionName: '美国',
            totalMv: 60,
            totalMvAvg: 30,
            mydate: 2020
          },
          {
            regionName: '美国',
            totalMv: 70,
            totalMvAvg: 20,
            mydate: 2021
          },

          {
            regionName: '欧洲',
            totalMv: 15,
            totalMvAvg: 65,
            mydate: 2016
          },
          {
            regionName: '欧洲',
            totalMv: 25,
            totalMvAvg: 55,
            mydate: 2017
          },
          {
            regionName: '欧洲',
            totalMv: 35,
            totalMvAvg: 45,
            mydate: 2018
          },
          {
            regionName: '欧洲',
            totalMv: 45,
            totalMvAvg: 35,
            mydate: 2019
          },
          {
            regionName: '欧洲',
            totalMv: 55,
            totalMvAvg: 25,
            mydate: 2020
          },
          {
            regionName: '欧洲',
            totalMv: 65,
            totalMvAvg: 15,
            mydate: 2021
          },

          {
            regionName: '其他',
            totalMv: 5,
            totalMvAvg: 55,
            mydate: 2016
          },
          {
            regionName: '其他',
            totalMv: 15,
            totalMvAvg: 45,
            mydate: 2017
          },
          {
            regionName: '其他',
            totalMv: 25,
            totalMvAvg: 35,
            mydate: 2018
          },
          {
            regionName: '其他',
            totalMv: 35,
            totalMvAvg: 25,
            mydate: 2019
          },
          {
            regionName: '其他',
            totalMv: 45,
            totalMvAvg: 15,
            mydate: 2020
          },
          {
            regionName: '其他',
            totalMv: 55,
            totalMvAvg: 5,
            mydate: 2021
          }
        ]
      }
    }
  },
  {
    url: '/mock/tz-front/marketEmp/marketShareIndex',
    method: 'get',
    response: req => {
      const dateType = req.query.dateType

      if (dateType === '2') {
        return {
          code: 200,
          data: [
            {
              mydate: '201601',
              pe: 1,
              ps: 2,
              totalMv: 3,
              quarter: ''
            },
            {
              mydate: '201602',
              pe: 2,
              ps: 3,
              totalMv: 4,
              quarter: ''
            },
            {
              mydate: '201603',
              pe: 3,
              ps: 4,
              totalMv: 5,
              quarter: ''
            },
            {
              mydate: '201604',
              pe: 4,
              ps: 5,
              totalMv: 6,
              quarter: ''
            },
            {
              mydate: '201605',
              pe: 5,
              ps: 6,
              totalMv: 7,
              quarter: ''
            },
            {
              mydate: '201606',
              pe: 6,
              ps: 7,
              totalMv: 8,
              quarter: ''
            }
          ]
        }
      }

      // 年
      if (dateType === '1') {
        return {
          code: 200,
          data: [
            {
              mydate: '2016',
              pe: 10,
              ps: 20,
              totalMv: 30,
              quarter: ''
            },
            {
              mydate: '2017',
              pe: 20,
              ps: 30,
              totalMv: 40,
              quarter: ''
            },
            {
              mydate: '2018',
              pe: 30,
              ps: 40,
              totalMv: 50,
              quarter: ''
            },
            {
              mydate: '2019',
              pe: 40,
              ps: 50,
              totalMv: 60,
              quarter: ''
            },
            {
              mydate: '2020',
              pe: 50,
              ps: 60,
              totalMv: 70,
              quarter: ''
            },
            {
              mydate: '2021',
              pe: 60,
              ps: 70,
              totalMv: 80,
              quarter: ''
            }
          ]
        }
      }

      return {
        code: 200,
        data: [
          {
            mydate: '2016',
            pe: 15,
            ps: 25,
            totalMv: 35,
            quarter: '2016Q1'
          },
          {
            mydate: '2016',
            pe: 25,
            ps: 35,
            totalMv: 45,
            quarter: '2016Q2'
          },
          {
            mydate: '2016',
            pe: 35,
            ps: 45,
            totalMv: 55,
            quarter: '2016Q3'
          },
          {
            mydate: '2016',
            pe: 45,
            ps: 55,
            totalMv: 65,
            quarter: '2016Q4'
          },
          {
            mydate: '2017',
            pe: 55,
            ps: 65,
            totalMv: 75,
            quarter: '2017Q1'
          },
          {
            mydate: '2017',
            pe: 65,
            ps: 75,
            totalMv: 85,
            quarter: '2017Q2'
          }
        ]
      }
    }
  },
  {
    url: '/mock/tz-front/homePage/monthData',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            trackCode: '1450',
            trackName: '数字医疗',
            empNum: 283,
            ipoEmpNum: 4,
            eventNum: 12345,
            eventNumRadio: '0.9899',
            eventNumLine:
              '[{"date":"202212","num":"1"},{"date":"202211","num":"2"},{"date":"202210","num":"3"},{"date":"202209","num":"4"},{"date":"202208","num":"5"},{"date":"202207","num":"6"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"20000.0000000000"},{"date":"202209","num":"0"},{"date":"202208","num":"117132.9435000000"},{"date":"202207","num":"56118.5700000000"}]',
            totalMv: '',
            totalMvRadio: '-',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            month: '202212'
          },
          {
            trackCode: '1443',
            trackName: '医疗服务',
            empNum: 3185,
            ipoEmpNum: 115,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"2"},{"date":"202207","num":"10"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"10547.1705000000"},{"date":"202207","num":"210059.4568000000"}]',
            totalMv: '5321849900.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"5321849856"},{"date":"202210","num":"3691510016"},{"date":"202209","num":"4071579904"},{"date":"202208","num":"3547849984"},{"date":"202207","num":"3556290048"}]',
            month: '202212'
          },
          {
            trackCode: '1414',
            trackName: '其他',
            empNum: 69,
            ipoEmpNum: 6,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            totalMv: '4953170170.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"4953169920"},{"date":"202210","num":"4190130176"},{"date":"202209","num":"3835239936"},{"date":"202208","num":"4735559680"},{"date":"202207","num":"5073319936"}]',
            month: '202212'
          },
          {
            trackCode: '1448',
            trackName: '动物保健',
            empNum: 68,
            ipoEmpNum: 1,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            totalMv: '3860770050.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"3860770048"},{"date":"202210","num":"3719610112"},{"date":"202209","num":"4380499968"},{"date":"202208","num":"4109819904"},{"date":"202207","num":"3397449984"}]',
            month: '202212'
          },
          {
            trackCode: '1446',
            trackName: '研发生产服务外包（CXO)',
            empNum: 311,
            ipoEmpNum: 9,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"2"},{"date":"202207","num":"1"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"20000.0000000000"},{"date":"202207","num":"10000.0000000000"}]',
            totalMv: '32708820010.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"32708820992"},{"date":"202210","num":"30549399552"},{"date":"202209","num":"28546668544"},{"date":"202208","num":"35789959168"},{"date":"202207","num":"36772831232"}]',
            month: '202212'
          },
          {
            trackCode: '1445',
            trackName: '数字医疗（数字健康）',
            empNum: 3662,
            ipoEmpNum: 137,
            eventNum: 1,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"1"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"1"},{"date":"202208","num":"9"},{"date":"202207","num":"33"}]',
            moneyAmount: '375.863500',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"375.8635000000"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0.0000000000"},{"date":"202208","num":"115101.2060000000"},{"date":"202207","num":"586765.5703000000"}]',
            totalMv: '93400190270.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"93400186880"},{"date":"202210","num":"89125912576"},{"date":"202209","num":"67528290304"},{"date":"202208","num":"73671229440"},{"date":"202207","num":"70664110080"}]',
            month: '202212'
          },
          {
            trackCode: '1444',
            trackName: '药品',
            empNum: 4690,
            ipoEmpNum: 169,
            eventNum: 0,
            eventNumRadio: '-1',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"1"},{"date":"202210","num":"0"},{"date":"202209","num":"1"},{"date":"202208","num":"9"},{"date":"202207","num":"11"}]',
            moneyAmount: '',
            moneyAmountRadio: '-1.0000000000',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"128746.0000000000"},{"date":"202210","num":"0"},{"date":"202209","num":"2000.0000000000"},{"date":"202208","num":"274475.9800000000"},{"date":"202207","num":"446441.6163000000"}]',
            totalMv: '137499729970.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"137499738112"},{"date":"202210","num":"129548820480"},{"date":"202209","num":"104658337792"},{"date":"202208","num":"111595970560"},{"date":"202207","num":"110750744576"}]',
            month: '202212'
          },
          {
            trackCode: '1447',
            trackName: '生物制品',
            empNum: 1641,
            ipoEmpNum: 58,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"1"},{"date":"202208","num":"4"},{"date":"202207","num":"4"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"2000.0000000000"},{"date":"202208","num":"289154.0600000000"},{"date":"202207","num":"96407.3000000000"}]',
            totalMv: '127378958910.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"127378955776"},{"date":"202210","num":"118903036672"},{"date":"202209","num":"123761706624"},{"date":"202208","num":"133187235840"},{"date":"202207","num":"143232163072"}]',
            month: '202212'
          },
          {
            trackCode: '1451',
            trackName: '医疗器械',
            empNum: 0,
            ipoEmpNum: 0,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            totalMv: '',
            totalMvRadio: '-',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"0"},{"date":"202207","num":"0"}]',
            month: '202212'
          },
          {
            trackCode: '1449',
            trackName: '健康险',
            empNum: 113,
            ipoEmpNum: 5,
            eventNum: 0,
            eventNumRadio: '-1',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"5"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"1"},{"date":"202207","num":"1"}]',
            moneyAmount: '',
            moneyAmountRadio: '-1.0000000000',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"234599.9660000000"},{"date":"202210","num":"0"},{"date":"202209","num":"0"},{"date":"202208","num":"21243.0900000000"},{"date":"202207","num":"2703.6660000000"}]',
            totalMv: '180160004000.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"180160004096"},{"date":"202210","num":"157246996480"},{"date":"202209","num":"207376007168"},{"date":"202208","num":"193419001856"},{"date":"202207","num":"200073003008"}]',
            month: '202212'
          },
          {
            trackCode: '1442',
            trackName: 'IVD',
            empNum: 3752,
            ipoEmpNum: 55,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"1"},{"date":"202209","num":"2"},{"date":"202208","num":"2"},{"date":"202207","num":"12"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"6437.3000000000"},{"date":"202209","num":"53905.0508000000"},{"date":"202208","num":"215619.0000000000"},{"date":"202207","num":"157093.2500000000"}]',
            totalMv: '132751231290.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"132751227648"},{"date":"202210","num":"113270258944"},{"date":"202209","num":"90340420992"},{"date":"202208","num":"95956722688"},{"date":"202207","num":"102869955584"}]',
            month: '202212'
          },
          {
            trackCode: '0000',
            trackName: '全部',
            empNum: 49438,
            ipoEmpNum: 1356,
            eventNum: 1,
            eventNumRadio: '0',
            eventNumLine:
              '[{"date":"202212","num":"1"},{"date":"202211","num":"6"},{"date":"202210","num":"534"},{"date":"202209","num":"771"},{"date":"202208","num":"825"},{"date":"202207","num":"6"}]',
            moneyAmount: '375.863500',
            moneyAmountRadio: '-0.9989666182',
            moneyAmountLine:
              '[{"date":"202212","num":"375.8635000000"},{"date":"202211","num":"363345.9660000000"},{"date":"202210","num":"33726512.0005000000"},{"date":"202209","num":"306139.3708000000"},{"date":"202208","num":"3426213.2510300000"},{"date":"202207","num":"2551.4280000000"}]',
            totalMv: '1165927540800.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"1224897160970.000000"},{"date":"202210","num":"1119685424660.000000"},{"date":"202209","num":"1143599275900.000000"},{"date":"202208","num":"1204195370680.000000"},{"date":"202207","num":"0"}]',
            month: '202212'
          },
          {
            trackCode: '1441',
            trackName: '器械',
            empNum: 8648,
            ipoEmpNum: 113,
            eventNum: 0,
            eventNumRadio: '-',
            eventNumLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"10"},{"date":"202209","num":"1"},{"date":"202208","num":"2"},{"date":"202207","num":"15"}]',
            moneyAmount: '',
            moneyAmountRadio: '-',
            moneyAmountLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"0"},{"date":"202210","num":"24886420.3086000000"},{"date":"202209","num":"9000.0000000000"},{"date":"202208","num":"32000.0000000000"},{"date":"202207","num":"221414.0049000000"}]',
            totalMv: '97114331060.000000',
            totalMvRadio: '0.000000',
            totalMvLine:
              '[{"date":"202212","num":"0"},{"date":"202211","num":"97114333184"},{"date":"202210","num":"96106364928"},{"date":"202209","num":"86121144320"},{"date":"202208","num":"84641218560"},{"date":"202207","num":"88562769920"}]',
            month: '202212'
          }
        ]
      }
    }
  }
]
