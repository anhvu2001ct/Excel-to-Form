USE [E2F]
GO
ALTER TABLE [dbo].[Workbook] DROP CONSTRAINT [DF__Workbook__Create__73BA3083]
GO
/****** Object:  Index [IDX_Name]    Script Date: 5/26/2022 12:31:17 PM ******/
DROP INDEX [IDX_Name] ON [dbo].[Workbook]
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/26/2022 12:31:17 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Workbook]') AND type in (N'U'))
DROP TABLE [dbo].[Workbook]
GO
/****** Object:  UserDefinedFunction [dbo].[rmvAccent]    Script Date: 5/26/2022 12:31:17 PM ******/
DROP FUNCTION [dbo].[rmvAccent]
GO
/****** Object:  UserDefinedFunction [dbo].[rmvAccent]    Script Date: 5/26/2022 12:31:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[rmvAccent] (@text nvarchar(max))
RETURNS nvarchar(max)
AS
BEGIN
	SET @text = LOWER(@text)
	DECLARE @textLen int = LEN(@text)
	IF @textLen > 0
	BEGIN
		DECLARE @index int = 1
		DECLARE @lPos int
		DECLARE @SIGN_CHARS nvarchar(100) = N'ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵýđð'
		DECLARE @UNSIGN_CHARS varchar(100) = 'aadeoouaaaaaaaaaaaaaaaeeeeeeeeeeiiiiiooooooooooooooouuuuuuuuuuyyyyydd'

		WHILE @index <= @textLen
		BEGIN
			SET @lPos = CHARINDEX(SUBSTRING(@text,@index,1),@SIGN_CHARS)
			IF @lPos > 0
			BEGIN
				SET @text = STUFF(@text,@index,1,SUBSTRING(@UNSIGN_CHARS,@lPos,1))
			END
			SET @index = @index + 1
		END
	END
	RETURN @text
END
GO
/****** Object:  Table [dbo].[Workbook]    Script Date: 5/26/2022 12:31:17 PM ******/
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
/****** Object:  Index [IDX_Name]    Script Date: 5/26/2022 12:31:18 PM ******/
CREATE NONCLUSTERED INDEX [IDX_Name] ON [dbo].[Workbook]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Workbook] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
