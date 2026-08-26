# 67 个云函数索引

完整的逐函数职责、知识点、优先级和改进建议位于[CRM 代码知识地图](./project-map.md)。这里给出学习分组：

- 客户/商机 CRUD：`createCustomer`、`updateCustomer`、`getCustomer`、`createOpportunity`、`updateOpportunity`、`getOpportunity` 等。
- 用户与权限：`getCRMUserByName`、`getUserByEmail`、`checkUserPermission`、四个 leader 处理函数等。
- 通用数据：`streamQueryData`、`streamQueryDataLong`、`batchStreamUpdate`、`queryTableStructure` 等。
- 报表和文件：`eopDashboardData`、`salesFollowUpDailyReport`、`exportOpportunityToExcel` 等。
- AI 与飞书：`createAgentConversation`、`queryAgentContent`、`sendCrmConfirmCard`、`batchGetLarkUserOpenId`。
- 致远同步：六个客户/商机双向同步与查询函数。
- 数据维护：区域运营、概率、签约/赢单时间和产品中心批量修复函数。

学习时不要按字母顺序阅读。第 16–20 周会按“入口→CRUD→规模→平台能力→跨系统”的依赖顺序引导。
