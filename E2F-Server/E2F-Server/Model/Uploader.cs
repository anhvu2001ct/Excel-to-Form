namespace E2F_Server.Model
{
    public class Uploader<T>
    {
        public string Url { get; set; } = null!;
        public T Data { get; set; } = default!;
    }
}
