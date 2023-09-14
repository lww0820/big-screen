<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getParkInfoApi } from '@/api/park'
import type { parkInfoType } from '@/types/park'

// 引入echart
import * as echarts from 'echarts'

const route = useRoute()
const router = useRouter()

// 初始化园区数据
const parkInfo = ref<parkInfoType>()
const getParkInfo = async () => {
  let res = await getParkInfoApi()
  // console.log(res)
  parkInfo.value = res.data
}
// 获取图表展示的区域dom元素
const pieChart = ref(null)
console.log(pieChart.value)

// 初始化图表
// const myChart = echarts.init(pieChart.value)

const initEchart = () => {
  const myChart = echarts.init(pieChart.value)
  const option = {
    // 鼠标滑过柱形图显示阴影和数据
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        // 鼠标滑过显示阴影
        type: 'shadow'
      }
    },
    // 修改x轴显示不全问题
    grid: {
      // 离容器上边的距离。
      top: '10px',
      // 离容器左侧的距离。
      left: '0px',
      // 离容器右侧的距离。
      right: '0px',
      // 离容器下边的距离。
      bottom: '0px',
      // 显示xy轴数据
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: parkInfo.value?.parkIncome.xMonth,
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      // 去除背景横线
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: parkInfo.value?.parkIncome.yIncome.map((item, index) => {
          const color =
            index % 2 === 0
              ? {
                  // 颜色类型
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#74c0f8' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(116,192,248,0)' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              : {
                  // 颜色类型
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ff7152' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(255,113,82,0)' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }

          return { value: item, itemStyle: { color } }
        }),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        // 设置柱形宽度
        barWidth: '10px'
      }
    ]
  }
  // 渲染图表
  option && myChart.setOption(option)
  // 6. 设置图表自适应
  // window.addEventListener('resize', () => {
  //   myPieChart.resize()
  // })
}
// 调用获取园区数据的方法
getParkInfo()
onMounted(async () => {
  // 调用获取园区数据的方法
  await getParkInfo()
  initEchart()
})
</script>
<template>
  <div class="all-charts">
    <div class="section-one">
      <img
        class="img-header"
        src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
        alt="logo"
      />
      <div class="icons-container">
        <div class="item">
          <div class="icons-item building-icon">
            <span class="number"> {{ parkInfo?.base.buildingTotal }} </span>
          </div>
          <span class="title">楼宇总数</span>
          <span class="unity">（栋）</span>
        </div>
        <div class="item">
          <div class="icons-item enterprise-icon">
            <span class="number"> {{ parkInfo?.base.enterpriseTotal }} </span>
          </div>
          <span class="title">入驻企业总数</span>
          <span class="unity">（家）</span>
        </div>
        <div class="item">
          <div class="icons-item car-icon">
            <span class="number"> {{ parkInfo?.base.parkingTotal }} </span>
          </div>
          <span class="title">车位总数</span>
          <span class="unity">（个）</span>
        </div>
        <div class="item">
          <div class="icons-item rod-icon">
            <span class="number"> {{ parkInfo?.base.chargePoleTotal }} </span>
          </div>
          <span class="title">一体杆总数</span>
          <span class="unity">（个）</span>
        </div>
      </div>
    </div>
    <div class="section-two">
      <img
        class="img-header"
        src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
        alt="logo"
      />
      <div class="bar-chart-title">
        <span>单位:元</span>
        <div class="right">
          <span class="bar-icon blue-bar-icon"></span>
          <span class="bar-icon red-bar-icon"></span>
          收入情况
        </div>
      </div>
      <div class="bar-chart" ref="pieChart"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all-charts {
  position: absolute;
  left: 0;
  top: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );

  .img-header {
    height: 30px;
  }

  .section-one {
    flex-basis: 25%;
    .icons-container {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;

      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: center;

        .icons-item {
          height: 80px;
          position: relative;

          .number {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            color: #fff;
          }
        }

        .building-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
        }
        .enterprise-icon {
          background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
        }
        .rod-icon {
          background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
        }
        .car-icon {
          background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
        }

        .title {
          margin-top: 8px;
        }

        .title,
        .unity {
          font-size: 14px;
          color: #cdd7e1;
        }
      }
    }
  }
  .section-two {
    flex-basis: 35%;
    margin-top: 50px;
    .bar-chart-title {
      display: flex;
      justify-content: space-between;
      color: #c6d1db;
      font-size: 14px;
      margin-top: 20px;
      .right {
        display: flex;
        align-items: center;
      }
      .bar-icon {
        width: 12px;
        height: 4px;
        display: inline-block;
      }
      .blue-bar-icon {
        background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
      }
      .red-bar-icon {
        background: linear-gradient(90deg, #ff7152, rgba(255, 113, 82, 0));
      }
    }
    .bar-chart {
      width: 100%;
      // background-color: pink;
      height: 200px;
    }
  }
}
</style>
