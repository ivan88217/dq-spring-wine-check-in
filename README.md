## 敦謙 2024 春酒系統
### 1. 功能簡介
1. 報到
2. 工作人員用-報到
3. 投票
4. 投票結果
5. 抽獎結果

### 2. 環境變數
請設定好以下環境變數
可寫在 .env 檔案中
若部屬在雲端環境，記得直接設定在機器上
1. `DATABASE_URL` - 資料庫連接字串
    - 格式: `mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}`
    - 範例: `mysql://root:password@localhost:3306/database`

### 3. 安裝方式
以 Bun 做舉例
請記得因 Next.js 仍舊使用 Node.js，所以請先安裝 Node.js >= 18

1. 安裝依賴
```bash
bun install
```

2. 同步DB 結構 

```bash
bunx prisma generate
```

> 若DB不是既有DB，請執行以下指令

```bash
bunx prisma migrate dev
```

3. 啟動專案
```bash
bun dev
```

