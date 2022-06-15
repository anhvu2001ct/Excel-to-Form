namespace E2F_Server2.Utilities
{
    public static class SqlHelper {
        public static string GetInsertQuery(string table, params string[] props)
        {
            string keys = string.Join(", ", props);
            string values = string.Join(", ", props.Select(p => $"@{p}"));
            return $"insert into {table}({keys}) values({values})";
        }

        public static string GetUpdateQuery(string table, string tableId, params string[] props)
        {
            var new_data = string.Join(", ", props.Select(p => $"{p}=@{p}"));
            return $"update {table} set {new_data} where {tableId}=@{tableId}";
        }

        public static string GetInsertIdQuery(string table, string tableId, params string[] props)
        {
            string keys = string.Join(", ", props);
            string values = string.Join(", ", props.Select(p => $"@{p}"));
            return $"insert into {table}({keys}) output [inserted].{tableId} values({values})";
        }
    }
}
