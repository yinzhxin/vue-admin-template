<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div
            style="
              height: 50px;
              padding-left: 60px;
              background: #fff;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">存储</p>
                </div>
                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />
                <div
                  style="
                    height: 10px;

                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                    padding-top:-10px
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    116.99 / 1671.35T
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="16">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div
                  style="
                    padding-bottom: -100px;
                    height: 45px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>总数</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div
            style="
              height: 50px;
              padding-left: 60px;
              background: #fff;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">存储</p>
                </div>
                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />
                <div
                  style="
                    height: 10px;

                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                    padding-top:-10px
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    116.99 / 1671.35T
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="16">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div
                  style="
                    padding-bottom: -100px;
                    height: 45px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>总数</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div
            style="
              height: 50px;
              padding-left: 60px;
              background: #fff;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">存储</p>
                </div>
                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />
                <div
                  style="
                    height: 10px;

                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                    padding-top:-10px
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    116.99 / 1671.35T
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="16">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div
                  style="
                    padding-bottom: -100px;
                    height: 45px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>总数</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div
            style="
              height: 50px;
              padding-left: 60px;
              background: #fff;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">存储</p>
                </div>
                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />
                <div
                  style="
                    height: 10px;

                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                    padding-top:-10px
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    116.99 / 1671.35T
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="16">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div
                  style="
                    padding-bottom: -100px;
                    height: 45px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>总数</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="grid-content bg-purple"
                style="border: 2px solid #eee; border-radius: 5px"
              >
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div
                  style="
                    padding: 0 10px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <p style="font-size: 16px">物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :chart-data="chartData"
                  :width="'100%'"
                  :height="'150%'"
                />

                <div
                  style="
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">118</div>
                    <div>正常</div>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-bottom: 10px">0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import RadiusPieChart from "./components/RadiusPieChart";
import BarYChart from "./components/BarYChart";

export default {
  name: "Dashboard",
  components: { RadiusPieChart, BarYChart },
  computed: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },

      tableData: [
        { radio: "3/3", title: "数据结点数量" },
        { radio: "3/3", title: "主节点数" },
        { radio: "3/3", title: "总连接数" },
        { radio: "3/3", title: "总活跃链接数" },
        { radio: "3/3", title: "阻塞会话数" },
      ],

      tableData2: [
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
      ],

      columns: [
        { label: "节点", prop: "node" },
        { label: "状态", prop: "status" },
        { label: "QPS", prop: "qps" },
        { label: "CPU使用率", prop: "cpuUsage" },
        { label: "内存使用率", prop: "memoryUsage" },
        { label: "磁盘使用率", prop: "diskUsage" },
      ],

      chartData: [
        {
          label: "正常",
          value: 60,
          itemStyle: { color: "#94D2F4" },
        },
        {
          label: "异常",
          value: 1,
          itemStyle: { color: "#BD3026" },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
// }
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  // border-radius: 4px;
}
.bg-purple {
  overflow: hidden;
  background: #ffffff;
}
.grid-content {
  // border-radius: 4px;
  min-height: 100px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  width: 48%;
  border-bottom: 2px solid #e8e8e9;
  padding-left: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  margin-right: 15px; /* 添加右边距 */
}
li:before {
  content: none; /* 去掉原点 */
}
li:nth-child(2n) {
  margin-right: 0;
}

.el-table--border,
.el-table--group {
  border: 0px solid #ebeef5;
}
// .elTable {
//   border: 1px solid #e8e8e9;
//   border-top-width: 0px;
// }

.item {
  margin-top: 10px;
  margin-right: 40px;
}
.sss {
  width: 16px;
  height: 16px;
  color: #e02727;
  float: left;
  margin-left: -5px;
  margin-top: -5px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 999;
  position: absolute;
}
.icon {
  font-size: large;
  margin-left: -1px;
  margin-top: -1px;
}
</style>
