# Data Sources

这些数据源可用于后续论文背景、实验刺激材料或方法演示。优先级按“可用性 + 与排队选择相关性 + 合规风险”综合判断。

## 首选：适合生成实验刺激

| 数据源 | 字段 / 粒度 | 可用方式 | 风险与限制 | 来源 |
|---|---|---|---|---|
| Queue-Times API | 公园、设施、开放状态、等待分钟数、更新时间；约 5 分钟实时更新 | 免费 API；适合采集 2-4 周形成小面板 | 第三方非官方；需展示 Powered by Queue-Times.com；历史完整性待核 | https://queue-times.com/pages/api |
| ThemeParks.wiki API | destination/entity/live/schedule；等待时间、开放状态、日程 | 免费 API；可自行留存历史 | 第三方非官方；部分数据来源不透明；需遵守限流 | https://themeparks.wiki/api |
| TouringPlans historical wait times | Disney/Universal 历史等待时间 | 可查说明和可能的数据包 | 第三方；下载授权、账号、许可需核实 | https://touringplans.zendesk.com/hc/en-us/articles/360007808734-Where-do-you-get-your-historical-data |

## 官方开放数据：适合方法演示和背景

| 数据源 | 字段 / 粒度 | 可用方式 | 风险与限制 | 来源 |
|---|---|---|---|---|
| ServiceOntario in-person wait times | 服务中心月度等待指标，如等待少于 20 分钟比例 | 官方 XLSX / 开放数据 | 粒度较粗；不是个体选择数据 | https://data.ontario.ca/en/dataset/serviceontario-wait-times-in-person |
| ServiceOntario contact centres | 月度 call volume、average wait time | 官方 XLSX / 开放数据 | 电话等待，不是实体队列 | https://data.ontario.ca/en/dataset/serviceontario-wait-times-and-call-volumes-contact-centres |
| Tempe 311 caller wait time | 311 呼叫等待绩效，季度发布 | Data.gov | 汇总级别；适合作为公共服务等待案例 | https://catalog.data.gov/dataset/2-16-311-caller-wait-time-summary-932fa |
| CMS Timely & Effective Care | 医院层面 ED 等待/停留指标 | 官方开放数据 | 医疗情境高敏；不能引导急症患者按等待短选择 | https://data.cms.gov/provider-data/topics/hospitals/timely-effective-care |
| NHS England A&E statistics | provider/trust 月度 A&E waiting time 和 4-hour performance | 官方统计 | 英国制度语境；不是实时个体选择 | https://www.england.nhs.uk/statistics/statistical-work-areas/acute-provider-table/ |

## 机场等待数据：适合案例，批量数据较难

| 数据源 | 字段 / 粒度 | 可用方式 | 风险与限制 | 来源 |
|---|---|---|---|---|
| DHS / MyTSA | 等待时间、机场延误、用户提交信息 | 官方 App / 网页说明 | 无公开批量 API；用户提交和历史估计混合 | https://www.dhs.gov/how-do-i/check-wait-times |
| LAX / ATL / DFW airport wait pages | terminal、boarding type、wait time、更新时间 | 官方网页 | 网页结构会变；自动采集需核条款 | https://www.flylax.com/wait-times |
| SITA Wait Time API | airportCode、queueId、projectedWaitTime、min/max、timestamp | 商业/合作 API | 需要注册、key、OAuth；权限和费用待核 | https://www.developer.aero/index.php/api-catalog/waittime-overview |
| TSAWaitTimes / AirportWaitTimes | 第三方聚合等待时间 | 第三方网页/API | 非官方，算法黑箱；不能当真值 | https://www.tsawaittimes.com/ |

## 餐厅、POI 与人流数据：只作备选

| 数据源 | 字段 / 粒度 | 可用方式 | 风险与限制 | 来源 |
|---|---|---|---|---|
| Google Popular Times | 热门时段、实时繁忙、停留时长 | 官方展示 | 没有稳定公开批量 API；不建议爬取 | https://support.google.com/business/answer/6263531 |
| BestTime.app | 小时级相对繁忙度、live busyness、forecast | 商业 API | 需申请/付费；基于位置数据，需关注隐私 | https://documentation.besttime.app/ |
| Foursquare Places API | POI、类别、评分、tips、hours、popularity | 商业 API | popularity 不等于排队等待；计费/授权待核 | https://docs.foursquare.com/developer/docs/places-api-overview |
| Placer.ai / Advan / SafeGraph Patterns | POI 访问量、停留、时间趋势 | 商业/学术申请 | 位置数据高敏；需要伦理审查和聚合处理 | https://www.deweydata.io/data-partners/advan |

## 校园自采数据方案

| 渠道 | 字段 | 隐私处理 | 用途 |
|---|---|---|---|
| 活动报名/签到 | 活动 ID、预约时段、签到时间、no-show | 学号哈希或不采身份；只报告聚合 | 估计到达峰值和预约违约 |
| 二维码取号 | 取号时间、叫号时间、放弃等待、服务窗口 | 随机 session_id；不采姓名；限定保存周期 | 直接测真实等待与放弃 |
| 门禁/刷卡计数 | 区域、时间、进入人数 | 只取 5/15 分钟计数，不取身份 | 人流强度替代指标 |
| Wi-Fi AP 聚合人数 | 区域、在线设备数、时间 | 不落 MAC；小样本阈值不发布 | 估计拥挤度 |
| 志愿者人工抽样 | 到达、开始服务、感知等待、满意度 | 知情同意，不采敏感身份 | 连接客观等待和主观体验 |

