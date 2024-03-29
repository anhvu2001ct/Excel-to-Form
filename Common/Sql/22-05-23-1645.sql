USE [E2F]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/23/2022 4:46:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Workbook]') AND type in (N'U'))
DROP TABLE [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/23/2022 4:46:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workbook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[SheetId] [varchar](60) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Extension] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
