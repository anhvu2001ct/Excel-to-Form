using Dapper;
using System.Text;

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

        public static async Task<bool> RecordExists<T>(string table, T id, string tableId="Id")
        {
            var query = $"select count(distinct 1) from {table} where {tableId}=@id";
            return await Program.Sql.ExecuteScalarAsync<bool>(query, new { id });
        }

        public static string GetCasesFromPatterns(List<KeyValuePair<string, string>> patterns)
        {
            var res = new StringBuilder("");
            foreach (var pattern in patterns)
            {
                var cid = pattern.Key;
                var cval = pattern.Value;
                res.Append(@$"
                            when ColumnId=@{cid} then
                                case
                                    when ColumnType != 'text' and Value=@{cval} then 1
					                when ColumnType = 'text' and dbo.rmvAccent(Value) like concat('%',dbo.rmvAccent(@{cval}),'%') then 1
					                else 0
                                end");
            }
            return @$"case
                        {res}
                        else 1
                    end as Matched";
        }
    }
}
