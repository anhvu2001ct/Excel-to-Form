USE [E2F]
GO
ALTER TABLE [dbo].[Workbook] DROP CONSTRAINT [DF__Workbook__Create__73BA3083]
GO
/****** Object:  Index [IDX_Name]    Script Date: 5/25/2022 10:20:10 AM ******/
DROP INDEX [IDX_Name] ON [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/25/2022 10:20:10 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Workbook]') AND type in (N'U'))
DROP TABLE [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/25/2022 10:20:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workbook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[WorkbookId] [varchar](60) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Extension] [varchar](20) NULL,
	[Url] [varchar](500) NULL,
	[CreatedAt] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IDX_Name]    Script Date: 5/25/2022 10:20:10 AM ******/
CREATE NONCLUSTERED INDEX [IDX_Name] ON [dbo].[Workbook]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Workbook] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
