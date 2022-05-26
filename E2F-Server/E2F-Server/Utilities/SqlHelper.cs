namespace E2F_Server.Utilities
{
    public static class SqlHelper {
        public static string GetInsertQuery(string table, params string[] props)
        {
            string keys = string.Join(", ", props);
            string values = string.Join(", ", props.Select(p => $"@{p}"));
            return $"insert into {table}({keys}) values({values})";
        }

        public static string GetInsertIdQuery(string table, string tableId, params string[] props)
        {
            string keys = string.Join(", ", props);
            string values = string.Join(", ", props.Select(p => $"@{p}"));
            return $"insert into {table}({keys}) output [inserted].{tableId} values({values})";
        }

        public static string GetCreateQuery(string table, params string[] props)
        {
            string fields = string.Join(", ", props.Select(p => $"{p} nvarchar(max)"));
            return $@"create table {table}( Id int identity(1, 1) primary key, {fields} )";
        }

        public static string[] RandomColumnsName(int num)
        {
            string[] res = new string[num];
            for (int i = 0; i < num; ++i) res[i] = $"c{i:D2}";
            return res;
        }

        public static async Task<string> RandomTableName(int prefixId)
        {
            return $"t{prefixId}_{await Nanoid.Nanoid.GenerateAsync(Constraint.NANOID_ALLOWED_STR, Constraint.NANOID_LENGTH)}";
        }


    }
}
