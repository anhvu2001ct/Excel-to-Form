using Imagekit;
using Microsoft.Data.SqlClient;

class Program
{
    public static SqlConnection Sql { get; private set; } = null!;

    public static IConfiguration Config { get; private set; } = null!;

    public static string RootPath { get; private set; } = null!;

    public static ServerImagekit Imagekit
    {
        get => new(Program.Config["Imagekit:PublicKey"], Program.Config["Imagekit:PrivateKey"], Program.Config["Imagekit:Url"]);
    }

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddCors(option =>
        {
            option.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
        });

        var app = builder.Build();

        Config = app.Configuration;
        Sql = new SqlConnection(Config["SQL"]);
        Sql.Open();
        Console.WriteLine(Sql.State);

        RootPath = app.Environment.ContentRootPath;
        Console.WriteLine(RootPath);

        // Configure the HTTP request pipeline.

        app.UseAuthorization();
        app.UseCors();

        app.MapControllers();

        app.Run();
    }
}