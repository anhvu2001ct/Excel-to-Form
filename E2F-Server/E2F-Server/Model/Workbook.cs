﻿namespace E2F_Server.Model
{
    public class Workbook
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string SheetId { get; set; } = null!;
        public string? Description { get; set; }
        public string? Extension { get; set; }
    }
}
