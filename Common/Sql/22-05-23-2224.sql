USE [E2F]
GO
/****** Object:  Index [IDX_Name]    Script Date: 5/23/2022 10:24:40 PM ******/
DROP INDEX [IDX_Name] ON [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/23/2022 10:24:40 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Workbook]') AND type in (N'U'))
DROP TABLE [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[t1_i2n381ziqf8lu1qc]    Script Date: 5/23/2022 10:24:40 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[t1_i2n381ziqf8lu1qc]') AND type in (N'U'))
DROP TABLE [dbo].[t1_i2n381ziqf8lu1qc]
GO
/****** Object:  Table [dbo].[t1_b7_nxmw0m0t88aek]    Script Date: 5/23/2022 10:24:40 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[t1_b7_nxmw0m0t88aek]') AND type in (N'U'))
DROP TABLE [dbo].[t1_b7_nxmw0m0t88aek]
GO
/****** Object:  Table [dbo].[t1_7raui44_r74qhe9i]    Script Date: 5/23/2022 10:24:40 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[t1_7raui44_r74qhe9i]') AND type in (N'U'))
DROP TABLE [dbo].[t1_7raui44_r74qhe9i]
GO
/****** Object:  Table [dbo].[t1_7raui44_r74qhe9i]    Script Date: 5/23/2022 10:24:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t1_7raui44_r74qhe9i](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[c00] [nvarchar](max) NULL,
	[c01] [nvarchar](max) NULL,
	[c02] [nvarchar](max) NULL,
	[c03] [nvarchar](max) NULL,
	[c04] [nvarchar](max) NULL,
	[c05] [nvarchar](max) NULL,
	[c06] [nvarchar](max) NULL,
	[c07] [nvarchar](max) NULL,
	[c08] [nvarchar](max) NULL,
	[c09] [nvarchar](max) NULL,
	[c10] [nvarchar](max) NULL,
	[c11] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t1_b7_nxmw0m0t88aek]    Script Date: 5/23/2022 10:24:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t1_b7_nxmw0m0t88aek](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[c00] [nvarchar](max) NULL,
	[c01] [nvarchar](max) NULL,
	[c02] [nvarchar](max) NULL,
	[c03] [nvarchar](max) NULL,
	[c04] [nvarchar](max) NULL,
	[c05] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t1_i2n381ziqf8lu1qc]    Script Date: 5/23/2022 10:24:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t1_i2n381ziqf8lu1qc](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[c00] [nvarchar](max) NULL,
	[c01] [nvarchar](max) NULL,
	[c02] [nvarchar](max) NULL,
	[c03] [nvarchar](max) NULL,
	[c04] [nvarchar](max) NULL,
	[c05] [nvarchar](max) NULL,
	[c06] [nvarchar](max) NULL,
	[c07] [nvarchar](max) NULL,
	[c08] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/23/2022 10:24:40 PM ******/
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
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[t1_7raui44_r74qhe9i] ON 

INSERT [dbo].[t1_7raui44_r74qhe9i] ([Id], [c00], [c01], [c02], [c03], [c04], [c05], [c06], [c07], [c08], [c09], [c10], [c11]) VALUES (1, N'1', N'2', N'3', N'4', N'5', N'6', N'7', N'8', N'9', N'10', N'11', N'12')
INSERT [dbo].[t1_7raui44_r74qhe9i] ([Id], [c00], [c01], [c02], [c03], [c04], [c05], [c06], [c07], [c08], [c09], [c10], [c11]) VALUES (2, N'0', N'1', N'2', N'3', N'4', N'5', N'6', N'7', N'8', N'9', N'8', N'7')
SET IDENTITY_INSERT [dbo].[t1_7raui44_r74qhe9i] OFF
GO
SET IDENTITY_INSERT [dbo].[t1_b7_nxmw0m0t88aek] ON 

INSERT [dbo].[t1_b7_nxmw0m0t88aek] ([Id], [c00], [c01], [c02], [c03], [c04], [c05]) VALUES (1, N'-1', N'-2', N'-3', N'-4', N'-5', N'-6')
SET IDENTITY_INSERT [dbo].[t1_b7_nxmw0m0t88aek] OFF
GO
SET IDENTITY_INSERT [dbo].[Workbook] ON 

INSERT [dbo].[Workbook] ([Id], [Name], [WorkbookId], [Description], [Extension]) VALUES (1, N'Template', N'c6799a74-d2fd-49e0-86a7-0cfee8a09b08', NULL, N'.xlsx')
SET IDENTITY_INSERT [dbo].[Workbook] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IDX_Name]    Script Date: 5/23/2022 10:24:40 PM ******/
CREATE NONCLUSTERED INDEX [IDX_Name] ON [dbo].[Workbook]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
