# 07 CRM 项目完整知识地图

## 阅读优先级

- P0：一周内理解——通用查询、客户/商机 CRUD、前端正在调用的函数。
- P1：项目接管必须理解——权限、层级、报表、批量更新、外部同步。
- P2：专项维护时理解——一次性修复脚本和遗留测试函数。

## 客户、商机与基础查询

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `createCustomer` | 新建客户 | 校验、查重、枚举/关联/人员字段、环境对象切换 | P0；唯一约束、统一错误类型 |
| `updateCustomer` | 按 ID 修改客户 | patch 语义、字段白名单、部分更新 | P0；乐观锁、审计 |
| `getCustomer` | 客户详情 | findOne、结果归一化、环境隔离 | P0；明确 not-found |
| `listCustomersByOwner` | 负责人客户列表 | 人员筛选、列表 DTO | P0；分页和最大条数 |
| `searchCustomer` | 外部企信模糊搜索 | HTTP 集成、候选映射 | P1；限流、超时、缓存 |
| `checkCustomerName` | 重名/相似客户检查 | 精确与模糊匹配 | P1；并发下仍需唯一约束 |
| `createCustomerGeneralName` | 新建客户统称 | CRUD、环境对象 | P1；校验唯一性 |
| `getCustomerGeneralName` | 统称下拉数据 | 列表映射、客户等级联动 | P0；缓存与失效 |
| `updateCustomerGenericName` | 替换旧统称关联 | 迁移脚本、关联字段 | P2；断点和 dry-run |
| `createOpportunity` | 新建商机 | 大型输入 DTO、枚举、关联、多值字段 | P0；拆分校验/映射/仓储 |
| `updateOpportunity` | 修改商机 | 字段白名单、不可变名称、patch | P0；版本冲突检测 |
| `getOpportunity` | 商机详情 | 单条查询、DTO | P0；统一空值契约 |
| `listOpportunitiesByOwner` | 负责人商机列表 | 人员查询、环境隔离 | P0；分页、权限 |
| `getOpportunityRecords` | 按阶段和时间查商机 | 日期范围、筛选组合 | P1；时区与边界测试 |
| `listOpportunityProducts` | 查询可选产品 | 产品档案、下拉映射 | P1；缓存 |
| `queryProductCascade` | 产线→一级→二级产品 | 树构建、Set/Map、级联数据 | P0；稳定 key、重复处理 |
| `associateOpportunityWithFollowup` | 合并商机与跟进 | join、分组、函数返回 | P1；避免全量内存连接 |
| `createFollowupRecord` | 新建跟进记录 | 大型 DTO、关联和日期字段 | P0；schema 校验 |
| `followup_note_test` | 跟进记录测试写入 | 测试数据、创建 API | P2；隔离或移除生产可调能力 |

## 用户、权限和组织层级

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `getCRMUserByName` | 按姓名查 CRM 用户 | 输入兼容、用户 DTO、数据源适配 | P0；消除歧义姓名 |
| `getUserByEmail` | 邮箱/飞书 ID 查用户 | 标识转换、用户字段 | P0；规范身份主键 |
| `listCRMUsers` | 用户全集 | 流式查询、列表 DTO | P1；禁止无界返回 |
| `getOwnerRegion` | 推导负责人所属大区 | 多源回退、业务映射 | P0；规则配置化 |
| `checkUserPermission` | 区域运营权限 | 服务端授权 | P0；默认拒绝、审计 |
| `querUserPermissions` | 查询角色 | 角色模型 | P1；修正命名并兼容旧 API |
| `getLeadersFromEmail` | 查询完整上级链 | 递归、批量用户查询、去重 | P1；循环检测和最大深度 |
| `processSingleOwnerLeaders` | 单负责人上级 | 事件式处理、人员关系 | P1；幂等 |
| `processMultiOwnerLeaders` | 批量负责人上级 | 批次、Map/Set、递归 | P1；受控并发和断点 |
| `processSingleJointLeader` | 单条共同经营人上级 | 多值人员、合并去重 | P1；契约测试 |
| `processMultiJointLeader` | 批量共同经营人上级 | 流式查询、批量更新 | P1；目录名与 meta API 名不一致需记录 |

## 通用查询、批处理、报表与文件

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `streamQueryData` | 通用流式查询并返回全部数据 | 动态对象/字段/操作符 | P0；前端可调时防越权和内存膨胀 |
| `streamQueryDataLong` | 大数据长任务查询 | 长任务、findStream | P1；不应再次聚合全量结果 |
| `batchStreamUpdate` | 通用批量更新 | 动态筛选、批处理 | P1；字段白名单、dry-run、审计 |
| `queryDataInfo` | 指定日期数据 | metadata、日期条件 | P1；明确时区 |
| `queryTableStructure` | 查询字段结构 | metadata API、动态模型 | P1；权限与缓存 |
| `queryOpportunitiesByDateRange` | 车企商机月报 | 自定义周期、分组统计 | P1；目录与 meta API 名不一致 |
| `salesFollowUpDailyReport` | 销售跟进日报 | 多函数编排、聚合、卡片数据 | P1；拆分超大函数、并发上限 |
| `getUserWeekReport` | 个人周报数据 | 报表 DTO、卡片契约 | P1；模板 ID 配置化 |
| `getAreaUseWeekReport` | 大区周报数据 | 组织聚合 | P1；补充元数据/测试 |
| `exportOpportunityToExcel` | 商机导出 Excel | xlsx、Buffer、临时文件、上传 | P1；文件清理、容量上限、公式注入 |
| `batchCloseOpportunities` | 读取工作表批量关单 | Excel 解析、逐行校验、部分失败 | P1；dry-run、失败报告 |
| `eopDashboardData` | EOP 看板 v3 数据代理 | Axios、契约版本、多数据集、服务端密钥 | P0；超时重试、缓存、指标 |

## AI、消息与开放平台

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `createAgentConversation` | 创建智能体会话 | Axios、异步会话 ID | P0；鉴权、超时、输入限制 |
| `queryAgentContent` | 查询智能体结果 | 轮询状态、增量内容 | P0；终态全集、取消、退避 |
| `batchGetLarkUserOpenId` | 批量解析 open_id | 飞书 API、身份映射 | P1；Token 缓存、QPS |
| `sendCrmConfirmCard` | 发送新建客户确认卡片 | 卡片模板、会话身份、通讯录 | P1；模板配置、幂等发送 |
| `qxb_advSearch` | 企信宝客户模糊查询 | HTTP connector、外部 API | P1；meta API 名异常、缓存与脱敏 |

## 致远与跨系统同步

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `syncAccountToSeeyon` | CRM 客户推送致远 | metadata 标签转换、HTTP | P1；Outbox、重试、幂等 |
| `syncCustomerFromSeeyon` | 致远客户导入 CRM | MySQL、长任务、upsert | P1；游标、对账 |
| `syncCustomerFromSeeyonOnlyGeneralName` | 仅同步客户统称 | 定向迁移 | P2；dry-run、回滚表 |
| `syncOpportunityToSeeyon` | CRM 商机推送致远 | 条件字段映射、批量推送 | P1；契约版本和补偿 |
| `syncOpportunityFromSeeyon` | 致远商机导入 CRM | MySQL、枚举反向映射、批量创建/更新 | P1；幂等键、分页水位 |
| `syncOpportunityCodeToSeeyon` | 同步商机编码 | 单条查询与外部写入 | P1；重试防重复 |
| `queryOpportunityProjectTime` | 查致远立项时间 | MySQL 参数化查询、结果字典 | P1；限制批量参数 |

## 数据修复与维护脚本

| 函数目录 | 职责 | 关键知识 | 优先级 / 改进点 |
|---|---|---|---|
| `refreshOpportunityWinTime` | 以创建时间补赢单时间 | 条件更新、批次 | P2；先预览再写入 |
| `updateWonOpportunitiesWinTime` | 以最后更新时间补赢单时间 | 数据修复 | P2；meta API 名不一致 |
| `updateSignContractTime` | 从状态记录回填签约时间 | 分组取最新、批量更新 | P1；排序与并列规则 |
| `updateOpportunityProbability` | 按阶段修正概率 | 枚举条件、批量更新 | P2；规则配置化 |
| `updateOpportunityProductCenter` | 产品映射业务中心 | 跨对象 join、长任务 | P1；缓存映射、失败清单 |
| `updateOpportunityRegionalOperation` | 增加商机区域运营 | 多值字段合并 | P2；去重、幂等 |
| `updateAccountRegionalOperation` | 增加客户区域运营 | 多值字段合并 | P2；去重、幂等 |
| `removeOpportunityRegionalOperator` | 删除指定区域运营 | 多值字段过滤 | P2；权限、dry-run |
| `updateRegionalOperation` | 更新客户/商机大区 | 长任务、批量迁移 | P2；可恢复检查点 |
| `tmp_update_regional_operation` | 临时更新区域运营 | 迁移脚本 | P2；明确下线日期 |
| `tmpUpdateRegionalOperationLongTask` | 上述逻辑长任务版 | 长任务、批次 | P2；合并重复实现 |
| `syncRegionalOperationToOpportunityLongTask` | 补齐商机区域运营 | 关联查询、长任务 | P2；断点续跑 |
| `syncFollowupRecordRegionalOperation` | 补齐跟进记录区域运营 | 多跳身份/区域查询 | P2；避免 N+1 |

## 组件索引

| 组件 | 职责 | 核心知识 | 主要风险 |
|---|---|---|---|
| `agent_input` | 发起并轮询智能体会话、渲染 Markdown | Hooks、定时器、云函数、Showdown | HTML 注入、固定用户 ID、轮询退避 |
| `dashboardBusinessOverview` | 经营驾驶舱 | 类型化契约、Hooks、AntD、ECharts、数据映射 | 大组件拆分、图表清理、竞态、契约版本 |
| `pcMultiCustomCascaderSelect` | PC 多选级联 | ViewModel、装饰器、受控组件、校验 | effect 依赖、DOM 样式注入 |
| `mobileMultiCustomCascaderSelect` | 移动多选级联 | antd-mobile、observer、响应式模型 | PC/移动行为一致性 |

## 推荐源码阅读顺序

1. `createCustomer` → `getCustomer` → `updateCustomer`：完整 CRUD。
2. `streamQueryData` → `batchStreamUpdate` → 长任务：数据规模升级。
3. `getLeadersFromEmail` → single/multi leader：关系递归和批处理。
4. `syncOpportunityFromSeeyon` 与 `syncOpportunityToSeeyon`：双向集成。
5. `eopDashboardData` → `dashboardApi.ts` → `dashboardMapper.ts` → UI：全栈契约。
6. `agent_input` 与两个 Agent 云函数：异步任务和安全渲染。

## 自研源码覆盖清单

下面的路径矩阵用于防止只看入口、遗漏辅助层。云函数表中的每个目录同时覆盖其 `index.js`、`index.meta.json` 和 `debug.param.json`；调试参数可能含业务样例，学习时不要直接复制到生产。

| 路径 | 覆盖文件 | 对应知识 |
|---|---|---|
| `functions/nodejs_20/*/index.js` | 67 个函数入口 | CJS、异步、aPaaS SDK、业务逻辑 |
| `functions/nodejs_20/*/index.meta.json` | 函数元数据 | 输入输出契约、可见性、长任务 |
| `functions/nodejs_20/config/tools.js` | 公共工具 | 环境判断、用户查询条件、模块复用 |
| `functions/nodejs_20/queryDataInfo/copy.js` | 历史副本 | 重复代码识别；不要误当入口 |
| `components/agent_input/{index.tsx,meta.ts,Conversation.css}` | Agent 组件全部源码 | React、云函数轮询、Markdown、CSS |
| `components/{pcMultiCustomCascaderSelect,mobileMultiCustomCascaderSelect}/{index.tsx,model.ts,meta.ts}` | PC/移动级联全部源码 | ViewModel、装饰器、响应式、受控表单 |
| `components/dashboardBusinessOverview/{index,Overview,GapAnalysis,ForecastAnalysis,Advice,OperatingStructure,AgentWorkspace,charts}.{ts,tsx}` | 看板页面与图表 | 组件拆分、Hooks、ECharts、AntD |
| `components/dashboardBusinessOverview/{data,styles,types}.ts` | 看板模型与静态数据 | 类型、样式对象、演示数据边界 |
| `components/dashboardBusinessOverview/{services,hooks,utils,types,data,components}/**/*.{ts,tsx}` | 看板辅助层 | API、mapper、日期、row key、数据源状态 |
| `local-dev/{vite.config.ts,function-runner.cjs,apaas-openapi.cjs}` | 本地网关 | Vite 插件、CJS/ESM、HTTP、Token |
| `local-dev/src/*.{ts,tsx}` | 调试台源码 | SDK adapter、Context、Props 编辑、Console 捕获、Portal |
| `local-dev/src/styles.css` | 调试台样式 | CSS 布局、浮窗、响应式 |

依赖的知识映射见第 05 章。`functions/nodejs` 当前仅保留 Node 14 依赖和配置，没有业务函数入口；它仍属于版本迁移与供应链检查范围。`.ae`、`.kldx`、`node_modules` 属于平台/依赖生成内容，阅读类型声明有价值，但不计入自研源码逐文件索引。
