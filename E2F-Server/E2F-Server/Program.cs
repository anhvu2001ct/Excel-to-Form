using Microsoft.Data.SqlClient;

class Program
{
    public static SqlConnection Sql { get; private set; } = default!;
    public static IConfiguration Config { get; private set; } = default!;
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();

        var app = builder.Build();

        Config = app.Configuration;
        Sql = new SqlConnection(Config["SQL"]);
        Sql.Open();
        Console.WriteLine(Sql.State);

        // Configure the HTTP request pipeline.

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}